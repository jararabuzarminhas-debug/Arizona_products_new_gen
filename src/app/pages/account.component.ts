import { Component, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";

interface StoredOrderItem { id: string; name: string; price: number; image: string; quantity: number; }
interface StoredOrder {
  id: string;
  items: StoredOrderItem[];
  shippingAddress: any;
  deliveryMethod: string;
  deliverySlot: string;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  codFee: number;
  total: number;
  date: string;
  paymentStatus: string;
  transactionId?: string;
  expectedDelivery: string;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "out_for_delivery" | "completed";
}

interface AddressBookEntry {
  firstName: string; lastName: string; phone: string; email: string;
  address: string; city: string; district: string; postalCode: string; deliveryInstructions: string;
}

@Component({
  selector: "app-account",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-medical-navy font-medical">My Account</h1>
                <p class="text-gray-600 mt-1">Manage profile, orders, and addresses</p>
              </div>
              <button (click)="logout()" class="text-gray-500 hover:text-red-600 transition-colors flex items-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1">
              <div class="bg-white rounded-xl p-6 shadow-lg">
                <nav class="space-y-2">
                  <button *ngFor="let tab of tabs" (click)="activeTab.set(tab.id)" class="w-full text-left px-4 py-3 rounded-lg font-medium transition-colors hover:bg-gray-50" [ngClass]="activeTab() === tab.id ? 'bg-medical-blue text-white' : 'text-gray-700'">
                    {{ tab.label }}
                  </button>
                </nav>
              </div>
            </div>

            <div class="lg:col-span-2">
              <!-- Profile -->
              <div *ngIf="activeTab() === 'profile'" class="bg-white rounded-xl p-6 shadow-lg">
                <h2 class="text-2xl font-bold text-medical-navy mb-6">Profile Information</h2>
                <form (ngSubmit)="updateProfile()" #profileForm="ngForm" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input type="text" [(ngModel)]="profileData.firstName" name="firstName" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input type="text" [(ngModel)]="profileData.lastName" name="lastName" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" [(ngModel)]="profileData.email" name="email" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input type="tel" [(ngModel)]="profileData.phone" name="phone" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue" />
                    </div>
                  </div>
                  <button type="submit" class="bg-medical-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-medical-navy transition-colors">Update Profile</button>
                </form>
              </div>

              <!-- Orders -->
              <div *ngIf="activeTab() === 'orders'" class="bg-white rounded-xl p-6 shadow-lg">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-2xl font-bold text-medical-navy">Order History</h2>
                  <button (click)="reloadOrders()" class="text-sm text-gray-600 hover:text-medical-blue">Refresh</button>
                </div>
                <div *ngIf="orders().length === 0" class="text-center py-12">
                  <h3 class="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p class="text-gray-500 mb-6">Start shopping to see your orders here</p>
                  <a routerLink="/shop" class="bg-medical-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-medical-navy transition-colors">Start Shopping</a>
                </div>
                <div *ngIf="orders().length > 0" class="space-y-4">
                  <div *ngFor="let order of orders()" class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="font-bold text-medical-navy">Order {{ order.id }}</h3>
                        <p class="text-xs text-gray-500">{{ order.date | date:'medium' }}</p>
                        <p class="text-xs text-gray-600">Status: <span class="font-medium">{{ (order.status || 'processing') | titlecase }}</span> • Payment: {{ order.paymentStatus }}</p>
                        <p class="text-xs text-gray-600">Expected: {{ order.expectedDelivery }}</p>
                      </div>
                      <div class="text-right">
                        <div class="text-lg font-bold text-medical-navy">PKR {{ order.total }}</div>
                        <div class="mt-2 flex items-center space-x-2">
                          <button (click)="downloadInvoice(order)" class="text-sm border px-3 py-1 rounded hover:bg-gray-50">Invoice</button>
                          <button (click)="reorder(order)" class="text-sm bg-medical-blue text-white px-3 py-1 rounded hover:bg-medical-navy">Reorder</button>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div *ngFor="let it of order.items" class="flex items-center space-x-3">
                        <img [src]="it.image" [alt]="it.name" class="w-12 h-12 object-contain rounded bg-gray-50" />
                        <div class="flex-1 text-sm text-gray-700">{{ it.name }} × {{ it.quantity }} — PKR {{ it.price * it.quantity }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Addresses -->
              <div *ngIf="activeTab() === 'addresses'" class="bg-white rounded-xl p-6 shadow-lg">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-2xl font-bold text-medical-navy">Saved Addresses</h2>
                  <button (click)="startAdd()" class="bg-medical-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-medical-navy">Add Address</button>
                </div>
                <div *ngIf="addressBook().length === 0" class="text-center py-10 text-gray-500">No saved addresses</div>
                <div *ngIf="addressBook().length > 0" class="space-y-3">
                  <div *ngFor="let a of addressBook(); let i = index" class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium text-gray-900">{{ a.firstName }} {{ a.lastName }} — {{ a.city }}, {{ a.district | titlecase }}</div>
                        <div class="text-sm text-gray-600">{{ a.address }}, {{ a.postalCode }}</div>
                        <div class="text-sm text-gray-600">{{ a.phone }} • {{ a.email }}</div>
                      </div>
                      <div class="space-x-2">
                        <button (click)="editAddress(i)" class="text-sm border px-3 py-1 rounded hover:bg-gray-50">Edit</button>
                        <button (click)="deleteAddress(i)" class="text-sm border px-3 py-1 rounded hover:bg-red-50 text-red-600">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Address Form -->
                <div *ngIf="editingIndex() > -1 || adding()" class="mt-6 border-t pt-6">
                  <h3 class="font-bold text-medical-navy mb-3">{{ adding() ? 'Add New Address' : 'Edit Address' }}</h3>
                  <form (ngSubmit)="saveAddressForm()" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input class="px-3 py-2 border rounded" placeholder="First Name" [(ngModel)]="form.firstName" name="fn" required />
                    <input class="px-3 py-2 border rounded" placeholder="Last Name" [(ngModel)]="form.lastName" name="ln" required />
                    <input class="px-3 py-2 border rounded" placeholder="Phone" [(ngModel)]="form.phone" name="ph" required />
                    <input class="px-3 py-2 border rounded" placeholder="Email" [(ngModel)]="form.email" name="em" required />
                    <input class="px-3 py-2 border rounded md:col-span-2" placeholder="Address" [(ngModel)]="form.address" name="ad" required />
                    <input class="px-3 py-2 border rounded" placeholder="City" [(ngModel)]="form.city" name="ct" required />
                    <input class="px-3 py-2 border rounded" placeholder="District" [(ngModel)]="form.district" name="ds" required />
                    <input class="px-3 py-2 border rounded" placeholder="Postal Code" [(ngModel)]="form.postalCode" name="pc" />
                    <input class="px-3 py-2 border rounded md:col-span-2" placeholder="Delivery Instructions" [(ngModel)]="form.deliveryInstructions" name="di" />
                    <div class="md:col-span-2 flex items-center space-x-2">
                      <button type="submit" class="bg-medical-blue text-white px-4 py-2 rounded-lg">Save</button>
                      <button type="button" (click)="cancelEdit()" class="border px-4 py-2 rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Settings -->
              <div *ngIf="activeTab() === 'settings'" class="bg-white rounded-xl p-6 shadow-lg">
                <h2 class="text-2xl font-bold text-medical-navy mb-6">Notification Preferences</h2>
                <div class="space-y-3">
                  <label class="flex items-center"><input type="checkbox" [(ngModel)]="notificationSettings.email" class="h-4 w-4 text-medical-blue rounded" /><span class="ml-3 text-gray-700">Email notifications</span></label>
                  <label class="flex items-center"><input type="checkbox" [(ngModel)]="notificationSettings.sms" class="h-4 w-4 text-medical-blue rounded" /><span class="ml-3 text-gray-700">SMS notifications</span></label>
                  <label class="flex items-center"><input type="checkbox" [(ngModel)]="notificationSettings.newsletter" class="h-4 w-4 text-medical-blue rounded" /><span class="ml-3 text-gray-700">Newsletter subscription</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccountComponent {
  activeTab = signal<'profile' | 'orders' | 'addresses' | 'settings'>('orders');

  tabs: { id: 'orders' | 'profile' | 'addresses' | 'settings'; label: string }[] = [
    { id: 'orders', label: 'Orders' },
    { id: 'profile', label: 'Profile' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'settings', label: 'Settings' },
  ];

  orders = signal<StoredOrder[]>([]);
  addressBook = signal<AddressBookEntry[]>([]);

  adding = signal(false);
  editingIndex = signal<number>(-1);
  form: AddressBookEntry = { firstName: '', lastName: '', phone: '', email: '', address: '', city: '', district: '', postalCode: '', deliveryInstructions: '' };

  profileData = { firstName: '', lastName: '', email: '', phone: '' };
  notificationSettings = { email: true, sms: true, newsletter: false };

  constructor(public authService: AuthService, private router: Router, private cart: CartService) {
    this.loadProfile();
    this.reloadOrders();
    this.loadAddressBook();
  }

  loadProfile(): void {
    const u = this.authService.user();
    if (u) {
      this.profileData = { firstName: u.firstName, lastName: u.lastName, email: u.email, phone: u.phone };
    }
  }

  reloadOrders(): void {
    try {
      const raw = localStorage.getItem('orders');
      const list: StoredOrder[] = raw ? JSON.parse(raw) : [];
      // newest first
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.orders.set(list);
    } catch { this.orders.set([]); }
  }

  downloadInvoice(order: StoredOrder): void {
    const win = window.open('', '_blank');
    if (!win) return;
    const rows = order.items.map(i => `<tr><td>${i.name}</td><td style='text-align:center'>${i.quantity}</td><td style='text-align:right'>PKR ${i.price}</td><td style='text-align:right'>PKR ${i.price * i.quantity}</td></tr>`).join('');
    win.document.write(`
      <html><head><title>Invoice ${order.id}</title>
      <style>body{font-family:Inter,Arial,sans-serif;padding:24px} table{width:100%;border-collapse:collapse} th,td{border:1px solid #e5e7eb;padding:8px} th{background:#f8fafc;text-align:left}</style>
      </head><body>
        <h2>Arizona Health Care Products</h2>
        <p><strong>Invoice:</strong> ${order.id}<br/>
        <strong>Date:</strong> ${new Date(order.date).toLocaleString()}<br/>
        <strong>Payment:</strong> ${order.paymentStatus}</p>
        <h3>Bill To</h3>
        <p>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br/>
        ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.district} ${order.shippingAddress.postalCode}<br/>
        ${order.shippingAddress.phone} • ${order.shippingAddress.email}</p>
        <table><thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table>
        <p style='text-align:right;margin-top:12px'>Subtotal: <strong>PKR ${order.subtotal}</strong><br/>Shipping: <strong>PKR ${order.shipping}</strong>${order.codFee ? `<br/>COD Fee: <strong>PKR ${order.codFee}</strong>` : ''}<br/>Grand Total: <strong>PKR ${order.total}</strong></p>
        <script>window.print();</script>
      </body></html>`);
    win.document.close();
  }

  reorder(order: StoredOrder): void {
    for (const it of order.items) {
      this.cart.addToCart({ id: it.id, name: it.name, price: it.price, image: it.image, inStock: true }, it.quantity);
    }
    this.router.navigate(['/checkout']);
  }

  loadAddressBook(): void {
    try { this.addressBook.set(JSON.parse(localStorage.getItem('addressBook') || '[]')); } catch { this.addressBook.set([]); }
  }

  saveAddressBook(): void {
    localStorage.setItem('addressBook', JSON.stringify(this.addressBook()));
  }

  startAdd(): void { this.adding.set(true); this.editingIndex.set(-1); this.form = { firstName: '', lastName: '', phone: '', email: '', address: '', city: '', district: '', postalCode: '', deliveryInstructions: '' }; }
  editAddress(i: number): void { this.editingIndex.set(i); this.adding.set(false); this.form = { ...this.addressBook()[i] }; }
  cancelEdit(): void { this.adding.set(false); this.editingIndex.set(-1); }

  saveAddressForm(): void {
    const list = [...this.addressBook()];
    const idx = this.editingIndex();
    if (idx > -1) list[idx] = { ...this.form }; else list.push({ ...this.form });
    this.addressBook.set(list);
    this.saveAddressBook();
    this.cancelEdit();
  }

  deleteAddress(i: number): void {
    const list = this.addressBook().filter((_, idx) => idx !== i);
    this.addressBook.set(list); this.saveAddressBook();
  }

  async updateProfile(): Promise<void> {
    const res = await this.authService.updateProfile(this.profileData);
    alert(res.message);
  }

  logout(): void { this.authService.logout(); this.router.navigate(['/']); }
}
