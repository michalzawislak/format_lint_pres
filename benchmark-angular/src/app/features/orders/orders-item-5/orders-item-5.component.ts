import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orders-item-5',
  templateUrl: './orders-item-5.component.html',
  styleUrls: ['./orders-item-5.component.scss'],
})
export class OrdersItem5Component implements OnInit, OnDestroy {
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
        description: 'Description for item ' + i,
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
