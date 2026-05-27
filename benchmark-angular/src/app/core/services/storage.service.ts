import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';

export interface StorageData {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cache = new Map<number, StorageData>();
  private dataSubject = new BehaviorSubject<StorageData[]>([]);
  public data$ = this.dataSubject.asObservable();

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const mockData = this.generateMockData();
    mockData.forEach((item) => this.cache.set(item.id, item));
    this.dataSubject.next(mockData);
  }

  getAll(): Observable<StorageData[]> {
    return this.data$.pipe(delay(300), catchError(this.handleError));
  }

  getById(id: number): Observable<StorageData | undefined> {
    if (this.cache.has(id)) {
      return of(this.cache.get(id)).pipe(delay(100));
    }

    return this.getAll().pipe(map((items) => items.find((item) => item.id === id)));
  }

  create(data: Partial<StorageData>): Observable<StorageData> {
    const newItem: StorageData = {
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

  update(id: number, data: Partial<StorageData>): Observable<StorageData> {
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

  search(query: string): Observable<StorageData[]> {
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

  private generateMockData(): StorageData[] {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: 'Storage Item ' + (i + 1),
      description: 'This is a detailed description for storage item number ' + (i + 1),
      createdAt: new Date(Date.now() - Math.random() * 10000000000),
      updatedAt: new Date(),
    }));
  }

  private handleError(error: any): Observable<never> {
    console.error('StorageService error:', error);
    return throwError(() => new Error('An error occurred while processing your request'));
  }
}
