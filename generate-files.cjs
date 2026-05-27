const fs = require('fs');
const path = require('path');

// Szablony plików
const templates = {
  component: (name) => `import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-${name}',
  templateUrl: './${name}.component.html',
  styleUrls: ['./${name}.component.scss']
})
export class ${toPascalCase(name)}Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  data: any[] = [];
  loading = false;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    setTimeout(() => {
      this.data = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: 'Item ' + i,
        description: 'Description for item ' + i
      }));
      this.loading = false;
    }, 1000);
  }

  onItemClick(item: any): void {
    console.log('Clicked:', item);
  }

  refresh(): void {
    this.loadData();
  }
}
`,

  html: (name) => `<div class="container">
  <h2>${toPascalCase(name)} Component</h2>
  
  <div *ngIf="loading" class="loading">
    <span class="spinner"></span>
    Loading...
  </div>
  
  <div *ngIf="error" class="error">
    {{ error }}
  </div>
  
  <div *ngIf="!loading && !error" class="content">
    <button (click)="refresh()" class="btn btn-primary">
      Refresh
    </button>
    
    <ul class="item-list">
      <li *ngFor="let item of data; trackBy: item.id" 
          (click)="onItemClick(item)"
          class="item">
        <strong>{{ item.name }}</strong>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </div>
</div>
`,

  scss: (name) => `.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
    border-bottom: 2px solid #4a9eff;
    padding-bottom: 10px;
  }

  .loading {
    text-align: center;
    padding: 40px;
    color: #666;
    
    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(0,0,0,.1);
      border-radius: 50%;
      border-top-color: #4a9eff;
      animation: spin 1s ease-in-out infinite;
    }
  }

  .error {
    background: #fee;
    color: #c00;
    padding: 15px;
    border-radius: 4px;
    margin: 20px 0;
    border-left: 4px solid #c00;
  }

  .content {
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 20px;
      transition: all 0.3s ease;

      &.btn-primary {
        background: #4a9eff;
        color: white;

        &:hover {
          background: #3080df;
          transform: translateY(-2px);
        }
      }
    }

    .item-list {
      list-style: none;
      padding: 0;

      .item {
        padding: 15px;
        margin: 10px 0;
        background: #f5f5f5;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-left: 3px solid transparent;

        &:hover {
          background: #e0e0e0;
          transform: translateX(5px);
          border-left-color: #4a9eff;
        }

        strong {
          display: block;
          margin-bottom: 5px;
          color: #333;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
`,

  service: (name) => `import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';

export interface ${toPascalCase(name)}Data {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ${toPascalCase(name)}Service {
  private cache = new Map<number, ${toPascalCase(name)}Data>();
  private dataSubject = new BehaviorSubject<${toPascalCase(name)}Data[]>([]);
  public data$ = this.dataSubject.asObservable();

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const mockData = this.generateMockData();
    mockData.forEach(item => this.cache.set(item.id, item));
    this.dataSubject.next(mockData);
  }

  getAll(): Observable<${toPascalCase(name)}Data[]> {
    return this.data$.pipe(
      delay(300),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<${toPascalCase(name)}Data | undefined> {
    if (this.cache.has(id)) {
      return of(this.cache.get(id)).pipe(delay(100));
    }
    
    return this.getAll().pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  create(data: Partial<${toPascalCase(name)}Data>): Observable<${toPascalCase(name)}Data> {
    const newItem: ${toPascalCase(name)}Data = {
      id: Date.now(),
      name: data.name || '',
      description: data.description || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.cache.set(newItem.id, newItem);
    const updatedData = Array.from(this.cache.values());
    this.dataSubject.next(updatedData);
    
    return of(newItem).pipe(delay(300));
  }

  update(id: number, data: Partial<${toPascalCase(name)}Data>): Observable<${toPascalCase(name)}Data> {
    const existing = this.cache.get(id);
    if (!existing) {
      return throwError(() => new Error('Item not found'));
    }
    
    const updated = { 
      ...existing, 
      ...data,
      updatedAt: new Date()
    };
    
    this.cache.set(id, updated);
    const updatedData = Array.from(this.cache.values());
    this.dataSubject.next(updatedData);
    
    return of(updated).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.cache.delete(id);
    const updatedData = Array.from(this.cache.values());
    this.dataSubject.next(updatedData);
    
    return of(void 0).pipe(delay(200));
  }

  search(query: string): Observable<${toPascalCase(name)}Data[]> {
    return this.getAll().pipe(
      map(items => items.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  private generateMockData(): ${toPascalCase(name)}Data[] {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: '${toPascalCase(name)} Item ' + (i + 1),
      description: 'This is a detailed description for ${name} item number ' + (i + 1),
      createdAt: new Date(Date.now() - Math.random() * 10000000000),
      updatedAt: new Date()
    }));
  }

  private handleError(error: any): Observable<never> {
    console.error('${toPascalCase(name)}Service error:', error);
    return throwError(() => new Error('An error occurred while processing your request'));
  }
}
`,

  guard: (name) => `import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router,
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ${toPascalCase(name)}Guard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAllowed = this.checkPermission(route, state);
    
    if (!isAllowed) {
      console.warn('${toPascalCase(name)}Guard: Access denied');
      return this.router.createUrlTree(['/unauthorized'], {
        queryParams: { returnUrl: state.url }
      });
    }
    
    return true;
  }

  private checkPermission(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Implement your permission logic here
    // This is a mock implementation
    const randomCheck = Math.random() > 0.2;
    
    if (randomCheck) {
      console.log('${toPascalCase(name)}Guard: Access granted for', state.url);
    }
    
    return randomCheck;
  }
}
`
};

function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function createComponent(name, basePath) {
  const dir = path.join(basePath, name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dir, `${name}.component.ts`), templates.component(name));
  fs.writeFileSync(path.join(dir, `${name}.component.html`), templates.html(name));
  fs.writeFileSync(path.join(dir, `${name}.component.scss`), templates.scss(name));
}

function createService(name, basePath) {
  fs.writeFileSync(path.join(basePath, `${name}.service.ts`), templates.service(name));
}

function createGuard(name, basePath) {
  fs.writeFileSync(path.join(basePath, `${name}.guard.ts`), templates.guard(name));
}

// Główna logika generowania
console.log('🚀 Generowanie projektu benchmark-angular...\n');

const baseDir = 'benchmark-angular/src/app';

// Features - komponenty
console.log('📦 Generuję komponenty features...');
['users', 'products', 'orders'].forEach(feature => {
  for (let i = 1; i <= 10; i++) {
    createComponent(`${feature}-item-${i}`, path.join(baseDir, 'features', feature));
  }
  console.log(`   ✅ ${feature}: 10 komponentów`);
});

// Shared components
console.log('\n🎨 Generuję shared components...');
['button', 'card', 'modal', 'table', 'form-input'].forEach(comp => {
  createComponent(comp, path.join(baseDir, 'shared/components'));
});
console.log('   ✅ 5 shared komponentów');

// Services
console.log('\n🔧 Generuję serwisy...');
['user', 'product', 'order', 'api', 'auth', 'storage', 'notification'].forEach(service => {
  createService(service, path.join(baseDir, 'core/services'));
});
console.log('   ✅ 7 serwisów');

// Guards
console.log('\n🛡️  Generuję guardy...');
['auth', 'admin', 'user', 'can-deactivate'].forEach(guard => {
  createGuard(guard, path.join(baseDir, 'core/guards'));
});
console.log('   ✅ 4 guardy');

// Policz pliki
const countFiles = (dir, ext) => {
  let count = 0;
  const walk = (d) => {
    const files = fs.readdirSync(d);
    files.forEach(f => {
      const fullPath = path.join(d, f);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (fullPath.endsWith(ext)) {
        count++;
      }
    });
  };
  walk(dir);
  return count;
};

const tsCount = countFiles(baseDir, '.ts');
const htmlCount = countFiles(baseDir, '.html');
const scssCount = countFiles(baseDir, '.scss');

console.log('\n📊 Podsumowanie:');
console.log(`   TypeScript: ${tsCount} plików`);
console.log(`   HTML:       ${htmlCount} plików`);
console.log(`   SCSS:       ${scssCount} plików`);
console.log(`   TOTAL:      ${tsCount + htmlCount + scssCount} plików`);
console.log('\n✨ Projekt gotowy!');
