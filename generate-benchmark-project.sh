#!/bin/bash

# Generator projektu testowego do benchmarków
# Tworzy realistyczne pliki Angular do testowania narzędzi

echo "🚀 Tworzenie projektu testowego benchmark-angular..."
echo ""

# Stwórz strukturę katalogów
mkdir -p benchmark-angular/src/app/{core,features,shared}
mkdir -p benchmark-angular/src/app/core/{services,guards,interceptors}
mkdir -p benchmark-angular/src/app/features/{users,products,orders}
mkdir -p benchmark-angular/src/app/shared/{components,pipes,directives}

cd benchmark-angular

# package.json dla projektu testowego
cat > package.json << 'EOF'
{
  "name": "benchmark-angular",
  "version": "1.0.0",
  "scripts": {
    "format:prettier": "prettier --write \"src/**/*.{ts,html,scss}\"",
    "format:biome": "biome format --write .",
    "lint:eslint": "eslint \"src/**/*.ts\"",
    "lint:biome": "biome lint .",
    "benchmark:format": "../benchmark-format.sh",
    "benchmark:lint": "../benchmark-lint.sh"
  },
  "devDependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0",
    "rxjs": "^7.8.0",
    "typescript": "^5.3.0"
  }
}
EOF

echo "✅ Utworzono package.json"

# Funkcja generująca komponent
generate_component() {
  local name=$1
  local path=$2
  
  cat > "$path/${name}.component.ts" << EOF
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-${name}',
  templateUrl: './${name}.component.html',
  styleUrls: ['./${name}.component.scss']
})
export class ${name^}Component implements OnInit, OnDestroy {
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
    // Simulate data loading
    setTimeout(() => {
      this.data = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: 'Item ' + i
      }));
      this.loading = false;
    }, 1000);
  }

  onItemClick(item: any): void {
    console.log('Clicked:', item);
  }
}
EOF

  cat > "$path/${name}.component.html" << EOF
<div class="container">
  <h2>{{name^}} Component</h2>
  
  <div *ngIf="loading" class="loading">
    Loading...
  </div>
  
  <div *ngIf="error" class="error">
    {{ error }}
  </div>
  
  <div *ngIf="!loading && !error" class="content">
    <ul class="item-list">
      <li *ngFor="let item of data" 
          (click)="onItemClick(item)"
          class="item">
        {{ item.name }}
      </li>
    </ul>
  </div>
</div>
EOF

  cat > "$path/${name}.component.scss" << EOF
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    color: #333;
    margin-bottom: 20px;
  }

  .loading {
    text-align: center;
    padding: 40px;
    color: #666;
  }

  .error {
    background: #fee;
    color: #c00;
    padding: 15px;
    border-radius: 4px;
    margin: 20px 0;
  }

  .content {
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

        &:hover {
          background: #e0e0e0;
          transform: translateX(5px);
        }
      }
    }
  }
}
EOF
}

# Funkcja generująca serwis
generate_service() {
  local name=$1
  local path=$2
  
  cat > "$path/${name}.service.ts" << EOF
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

export interface ${name^}Data {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ${name^}Service {
  private cache = new Map<number, ${name^}Data>();

  constructor() {}

  getAll(): Observable<${name^}Data[]> {
    return of(this.generateMockData()).pipe(
      delay(500),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<${name^}Data | undefined> {
    if (this.cache.has(id)) {
      return of(this.cache.get(id)).pipe(delay(100));
    }
    
    return this.getAll().pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  create(data: Partial<${name^}Data>): Observable<${name^}Data> {
    const newItem: ${name^}Data = {
      id: Date.now(),
      name: data.name || '',
      description: data.description || '',
      createdAt: new Date()
    };
    
    this.cache.set(newItem.id, newItem);
    return of(newItem).pipe(delay(300));
  }

  update(id: number, data: Partial<${name^}Data>): Observable<${name^}Data> {
    const existing = this.cache.get(id);
    if (!existing) {
      return throwError(() => new Error('Item not found'));
    }
    
    const updated = { ...existing, ...data };
    this.cache.set(id, updated);
    return of(updated).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.cache.delete(id);
    return of(void 0).pipe(delay(200));
  }

  private generateMockData(): ${name^}Data[] {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: '${name^} ' + (i + 1),
      description: 'Description for ${name} ' + (i + 1),
      createdAt: new Date()
    }));
  }

  private handleError(error: any): Observable<never> {
    console.error('Service error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
EOF
}

# Funkcja generująca guard
generate_guard() {
  local name=$1
  local path=$2
  
  cat > "$path/${name}.guard.ts" << EOF
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ${name^}Guard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Implement your guard logic here
    const isAuthenticated = this.checkAuthentication();
    
    if (!isAuthenticated) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    
    return true;
  }

  private checkAuthentication(): boolean {
    // Mock authentication check
    return Math.random() > 0.5;
  }
}
EOF
}

echo "📦 Generuję komponenty..."

# Generuj komponenty dla features
for feature in users products orders; do
  for i in {1..10}; do
    generate_component "${feature}-item-${i}" "src/app/features/${feature}"
  done
done

echo "✅ Wygenerowano 30 komponentów (30 .ts + 30 .html + 30 .scss = 90 plików)"

echo "🔧 Generuję serwisy..."

# Generuj serwisy
for service in user product order api auth storage notification; do
  generate_service "$service" "src/app/core/services"
done

echo "✅ Wygenerowano 7 serwisów"

echo "🛡️ Generuję guardy..."

# Generuj guardy
for guard in auth admin user can-deactivate; do
  generate_guard "$guard" "src/app/core/guards"
done

echo "✅ Wygenerowano 4 guardy"

echo "🎨 Generuję shared components..."

# Generuj shared components
for comp in button card modal table form-input; do
  generate_component "$comp" "src/app/shared/components"
done

echo "✅ Wygenerowano 5 shared komponentów"

# Policz pliki
cd ..
total_ts=$(find benchmark-angular -name "*.ts" | wc -l | tr -d ' ')
total_html=$(find benchmark-angular -name "*.html" | wc -l | tr -d ' ')
total_scss=$(find benchmark-angular -name "*.scss" | wc -l | tr -d ' ')

echo ""
echo "📊 Podsumowanie:"
echo "   TypeScript files: $total_ts"
echo "   HTML templates:   $total_html"
echo "   SCSS styles:      $total_scss"
echo "   TOTAL:            $((total_ts + total_html + total_scss)) plików"
echo ""
echo "✨ Projekt testowy gotowy w folderze: benchmark-angular/"
echo ""
echo "🚀 Następne kroki:"
echo "   cd benchmark-angular"
echo "   npm install -D prettier @biomejs/biome eslint"
echo "   npm run benchmark:format"
echo "   npm run benchmark:lint"
