import { Component, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

interface OrderItem { name: string; quantity: number; price: number; }
interface OrderRec {
  id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "out_for_delivery" | "completed";
  paymentMethod: string;
  shippingAddress: any;
  orderDate: string;
  trackingNumber?: string;
  paymentStatus?: string;
}

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50" *ngIf="authService.isAdmin(); else notAdmin">
      <header class="bg-white shadow-lg border-b-2 border-medical-blue">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2Fd86bb14e3b9f4d549dd2a7cfd71e4717?format=webp&width=100" alt="Arizona" class="w-10 h-10" />
            <div>
              <h1 class="text-xl font-bold text-medical-navy font-medical">Admin Dashboard</h1>
              <p class="text-xs text-medical-blue">Arizona Health Care Products</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button (click)="exportCSV()" class="border px-3 py-2 rounded text-sm hover:bg-gray-50">Export CSV</button>
            <a href="/" class="text-gray-600 hover:text-medical-blue">Home</a>
          </div>
        </div>
      </header>

      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-sm text-gray-600">Total Orders</div>
            <div class="text-2xl font-bold text-medical-navy">{{ totalOrders() }}</div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-sm text-gray-600">Pending</div>
            <div class="text-2xl font-bold text-medical-navy">{{ pendingCount() }}</div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-sm text-gray-600">Revenue</div>
            <div class="text-2xl font-bold text-medical-navy">PKR {{ totalRevenue().toLocaleString() }}</div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-sm text-gray-600">Today</div>
            <div class="text-2xl font-bold text-medical-navy">{{ todayOrders() }}</div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg">
          <div class="border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-xl font-bold text-medical-navy">Orders</h2>
            <div class="flex items-center space-x-2">
              <input type="text" [(ngModel)]="searchTerm" (input)="filterOrders()" placeholder="Search orders..." class="px-3 py-2 border rounded" />
              <select [(ngModel)]="statusFilter" (change)="filterOrders()" class="px-3 py-2 border rounded">
                <option value="">All</option>
                <option *ngFor="let s of statuses" [value]="s">{{ s | titlecase }}</option>
              </select>
            </div>
          </div>

          <div class="p-4 overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let order of filtered">
                  <td class="px-4 py-2 font-medium text-medical-navy">{{ order.id }}</td>
                  <td class="px-4 py-2 text-sm">
                    <div class="font-medium text-gray-900">{{ order.customerName || (order.shippingAddress?.firstName + ' ' + order.shippingAddress?.lastName) }}</div>
                    <div class="text-gray-500">{{ order.customerEmail || order.shippingAddress?.email }}</div>
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-700">{{ order.orderDate | date:'short' }}</td>
                  <td class="px-4 py-2 text-sm text-gray-900">PKR {{ order.total }}</td>
                  <td class="px-4 py-2">
                    <select [(ngModel)]="order.status" (change)="persistOrders()" class="px-3 py-1 text-sm rounded border">
                      <option *ngFor="let s of statuses" [value]="s">{{ s | titlecase }}</option>
                    </select>
                  </td>
                  <td class="px-4 py-2 text-sm">
                    <button (click)="view(order)" class="text-medical-blue hover:text-medical-navy mr-3">View</button>
                    <button (click)="print(order)" class="text-gray-600 hover:text-gray-900">Print</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <ng-template #notAdmin>
      <div class="min-h-screen flex items-center justify-center text-gray-600">Access denied</div>
    </ng-template>
  `,
})
export class AdminComponent {
  statuses: OrderRec['status'][] = ['pending','processing','shipped','out_for_delivery','delivered','cancelled','completed'];

  orders: OrderRec[] = [];
  filtered: OrderRec[] = [];
  searchTerm = '';
  statusFilter = '';

  constructor(public authService: AuthService, private router: Router) {
    this.loadOrders();
  }

  private normalize(rec: any): OrderRec {
    return {
      id: rec.id,
      items: rec.items || [],
      total: rec.total,
      status: rec.status || 'processing',
      paymentMethod: rec.paymentMethod,
      shippingAddress: rec.shippingAddress || {},
      orderDate: rec.date || rec.orderDate || new Date().toISOString(),
      trackingNumber: rec.trackingNumber || undefined,
      paymentStatus: rec.paymentStatus || 'Pending',
      customerName: rec.customerName || undefined,
      customerEmail: rec.customerEmail || undefined,
      customerPhone: rec.customerPhone || undefined,
    };
  }

  loadOrders(): void {
    try {
      const raw = localStorage.getItem('orders');
      const list = raw ? JSON.parse(raw) : [];
      this.orders = list.map((r: any) => this.normalize(r));
      this.filterOrders();
    } catch { this.orders = []; this.filtered = []; }
  }

  persistOrders(): void {
    try {
      const list = this.orders.map(o => ({
        id: o.id,
        items: o.items,
        shippingAddress: o.shippingAddress,
        paymentMethod: o.paymentMethod,
        subtotal: o.items.reduce((s,i)=>s+i.price*i.quantity,0),
        shipping: 0,
        codFee: 0,
        total: o.total,
        date: o.orderDate,
        paymentStatus: o.paymentStatus,
        expectedDelivery: '',
        status: o.status,
      }));
      localStorage.setItem('orders', JSON.stringify(list));
      this.filterOrders();
    } catch {}
  }

  filterOrders(): void {
    const term = this.searchTerm.toLowerCase();
    this.filtered = this.orders.filter(o => {
      const matchesSearch = !term || o.id.toLowerCase().includes(term) || (o.customerName||'').toLowerCase().includes(term) || (o.customerEmail||'').toLowerCase().includes(term);
      const matchesStatus = !this.statusFilter || o.status === this.statusFilter as any;
      return matchesSearch && matchesStatus;
    });
  }

  totalOrders = computed(() => this.orders.length);
  pendingCount = computed(() => this.orders.filter(o => o.status==='pending').length);
  totalRevenue = computed(() => this.orders.reduce((s,o)=>s+o.total,0));
  todayOrders = computed(() => {
    const today = new Date();
    const d0 = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    return this.orders.filter(o => new Date(o.orderDate).getTime() >= d0).length;
  });

  view(order: OrderRec): void { alert(`Viewing ${order.id}`); }
  print(order: OrderRec): void { window.print(); }

  exportCSV(): void {
    const header = ['Order ID','Date','Status','Total','Payment','Customer','Email','Phone'];
    const rows = this.orders.map(o => [o.id, o.orderDate, o.status, o.total, o.paymentMethod, o.customerName||'', o.customerEmail||'', o.customerPhone||'']);
    const csv = [header, ...rows].map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'orders.csv'; a.click();
    URL.revokeObjectURL(url);
  }
}
