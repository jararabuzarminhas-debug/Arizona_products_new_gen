import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: any[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: any;
  orderDate: Date;
  trackingNumber?: string;
}

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  todayOrders: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Admin Header -->
      <header class="bg-white shadow-lg border-b-2 border-medical-blue">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2Fd86bb14e3b9f4d549dd2a7cfd71e4717?format=webp&width=100" alt="Arizona Health Care Products" class="w-10 h-10">
              <div>
                <h1 class="text-xl font-bold text-medical-navy font-medical">Admin Dashboard</h1>
                <p class="text-xs text-medical-blue">Arizona Health Care Products</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/" class="text-gray-600 hover:text-medical-blue transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
              </a>
              <button (click)="authService.logout()" class="text-gray-600 hover:text-red-600 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="container mx-auto px-4 py-8">
        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center">
              <div class="p-3 bg-medical-blue rounded-full">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Orders</p>
                <p class="text-2xl font-bold text-medical-navy">{{dashboardStats.totalOrders}}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-500 rounded-full">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pending Orders</p>
                <p class="text-2xl font-bold text-medical-navy">{{dashboardStats.pendingOrders}}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center">
              <div class="p-3 bg-healthcare-green rounded-full">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Revenue</p>
                <p class="text-2xl font-bold text-medical-navy">PKR {{dashboardStats.totalRevenue.toLocaleString()}}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center">
              <div class="p-3 bg-cooling-600 rounded-full">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Today's Orders</p>
                <p class="text-2xl font-bold text-medical-navy">{{dashboardStats.todayOrders}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Tabs -->
        <div class="bg-white rounded-xl shadow-lg">
          <!-- Tab Headers -->
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6">
              <button *ngFor="let tab of adminTabs" (click)="activeTab.set(tab.id)"
                      [class.active]="activeTab() === tab.id"
                      class="py-4 px-2 border-b-2 font-medium text-sm transition-colors"
                      [ngClass]="activeTab() === tab.id ? 'border-medical-blue text-medical-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'">
                {{tab.label}}
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Orders Management -->
            <div *ngIf="activeTab() === 'orders'">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-medical-navy">Order Management</h2>
                <div class="flex items-center space-x-4">
                  <!-- Search -->
                  <input type="text" [(ngModel)]="searchTerm" (input)="filterOrders()"
                         placeholder="Search orders..."
                         class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent">
                  <!-- Status Filter -->
                  <select [(ngModel)]="statusFilter" (change)="filterOrders()"
                          class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent">
                    <option value="">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <!-- Orders Table -->
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let order of filteredOrders">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-medical-navy">{{order.id}}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{order.customerName}}</div>
                        <div class="text-sm text-gray-500">{{order.customerEmail}}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{order.orderDate | date:'short'}}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PKR {{order.total}}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <select [(ngModel)]="order.status" (change)="updateOrderStatus(order)"
                                class="px-3 py-1 text-sm rounded-full border-0 focus:ring-2 focus:ring-medical-blue"
                                [ngClass]="getStatusClass(order.status)">
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button (click)="viewOrderDetails(order)" class="text-medical-blue hover:text-medical-navy mr-3">View</button>
                        <button (click)="printOrder(order)" class="text-gray-600 hover:text-gray-900">Print</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Products Management -->
            <div *ngIf="activeTab() === 'products'">
              <h2 class="text-2xl font-bold text-medical-navy mb-6">Product Management</h2>
              <div class="text-center py-12">
                <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd"></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Product Management</h3>
                <p class="text-gray-500">Manage inventory, pricing, and product information</p>
              </div>
            </div>

            <!-- Customers Management -->
            <div *ngIf="activeTab() === 'customers'">
              <h2 class="text-2xl font-bold text-medical-navy mb-6">Customer Management</h2>
              <div class="text-center py-12">
                <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Customer Management</h3>
                <p class="text-gray-500">View customer profiles, order history, and communication</p>
              </div>
            </div>

            <!-- Analytics -->
            <div *ngIf="activeTab() === 'analytics'">
              <h2 class="text-2xl font-bold text-medical-navy mb-6">Analytics & Reports</h2>
              <div class="text-center py-12">
                <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Analytics & Reports</h3>
                <p class="text-gray-500">Sales reports, performance metrics, and business insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent {
  activeTab = signal('orders');
  searchTerm = '';
  statusFilter = '';

  dashboardStats: DashboardStats = {
    totalOrders: 156,
    pendingOrders: 23,
    totalRevenue: 45600,
    todayOrders: 8
  };

  adminTabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
    { id: 'customers', label: 'Customers' },
    { id: 'analytics', label: 'Analytics' }
  ];

  orders: Order[] = [
    {
      id: 'AHC-001',
      customerName: 'Sarah Ahmed',
      customerEmail: 'sarah@example.com',
      customerPhone: '+92-XXX-XXXXXXX',
      items: [{ name: 'Bye Bye Fever', quantity: 2, price: 299 }],
      total: 598,
      status: 'processing',
      paymentMethod: 'COD',
      shippingAddress: {},
      orderDate: new Date('2024-01-20')
    },
    {
      id: 'AHC-002',
      customerName: 'Muhammad Hassan',
      customerEmail: 'hassan@example.com',
      customerPhone: '+92-XXX-XXXXXXX',
      items: [{ name: 'Bye Bye Fever', quantity: 1, price: 299 }],
      total: 349,
      status: 'shipped',
      paymentMethod: 'JazzCash',
      shippingAddress: {},
      orderDate: new Date('2024-01-19'),
      trackingNumber: 'TRK123456'
    },
    {
      id: 'AHC-003',
      customerName: 'Fatima Khan',
      customerEmail: 'fatima@example.com',
      customerPhone: '+92-XXX-XXXXXXX',
      items: [{ name: 'Bye Bye Fever', quantity: 3, price: 299 }],
      total: 897,
      status: 'delivered',
      paymentMethod: 'EasyPaisa',
      shippingAddress: {},
      orderDate: new Date('2024-01-18')
    }
  ];

  filteredOrders: Order[] = [...this.orders];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    // Check if user is admin
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
    }
  }

  filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesSearch = !this.searchTerm || 
        order.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || order.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  updateOrderStatus(order: Order): void {
    console.log('Updating order status:', order.id, order.status);
    // In real app, this would update the backend
    alert(`Order ${order.id} status updated to ${order.status}`);
  }

  viewOrderDetails(order: Order): void {
    console.log('Viewing order details:', order);
    alert(`Viewing details for order ${order.id}`);
  }

  printOrder(order: Order): void {
    console.log('Printing order:', order);
    alert(`Printing order ${order.id}`);
  }
}
