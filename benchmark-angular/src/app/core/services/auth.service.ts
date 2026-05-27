import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';

export interface AuthData {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cache = new Map<number, AuthData>();
  private dataSubject = new BehaviorSubject<AuthData[]>([]);
  public data$ = this.dataSubject.asObservable();

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const mockData = this.generateMockData();
    mockData.forEach((item) => this.cache.set(item.id, item));
    this.dataSubject.next(mockData);
  }

  getAll(): Observable<AuthData[]> {
    return this.data$.pipe(delay(300), catchError(this.handleError));
  }

  getById(id: number): Observable<AuthData | undefined> {
    if (this.cache.has(id)) {
      return of(this.cache.get(id)).pipe(delay(100));
    }

    return this.getAll().pipe(map((items) => items.find((item) => item.id === id)));
  }

  create(data: Partial<AuthData>): Observable<AuthData> {
    const newItem: AuthData = {
      id: Date.now(),
      name: data.name || '',
      description: data.description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.cache.set(newItem.id, newItem);
    const updatedData = Array.from(this.cache.values());
    this.dataSubject.next(updatedData);

    return of(newItem).pipe(delay(300));
  }

  update(id: number, data: Partial<AuthData>): Observable<AuthData> {
    const existing = this.cache.get(id);
    if (!existing) {
      return throwError(() => new Error('Item not found'));
    }

    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date(),
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

  search(query: string): Observable<AuthData[]> {
    return this.getAll().pipe(
      map((items) =>
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  private generateMockData(): AuthData[] {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: 'Auth Item ' + (i + 1),
      description: 'This is a detailed description for auth item number ' + (i + 1),
      createdAt: new Date(Date.now() - Math.random() * 10000000000),
      updatedAt: new Date(),
    }));
  }

  private handleError(error: any): Observable<never> {
    console.error('AuthService error:', error);
    return throwError(() => new Error('An error occurred while processing your request'));
  }
}
