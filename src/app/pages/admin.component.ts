import { Component, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthService } from "../services/auth.service";

// Data models
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}
interface OrderRec {
  id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "out_for_delivery"
    | "completed";
  paymentMethod: string;
  shippingAddress: any;
  orderDate: string;
  trackingNumber?: string;
  paymentStatus?: string;
}

interface ProductImage {
  url: string;
  alt: string;
}
interface ProductVersion {
  date: string;
  changes: string;
  data: Partial<Product>;
}
interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  categories: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  images: ProductImage[];
  featuredImageIndex: number;
  price: number;
  salePrice?: number;
  sku: string;
  stockQty: number;
  lowStockThreshold: number;
  status: "active" | "inactive" | "out_of_stock";
  attributes: {
    size?: string;
    color?: string;
    expiryDate?: string;
    batchNumber?: string;
  };
  shipping: {
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    class?: string;
    requiresPrescription: boolean;
    ageRestriction?: string;
  };
  createdAt: string;
  updatedAt: string;
  versions: ProductVersion[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: "active" | "inactive";
}

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div
      class="min-h-screen bg-gray-50"
      *ngIf="authService.isAdmin(); else notAdmin"
    >
      <!-- Header -->
      <header class="bg-white shadow-lg border-b-2 border-medical-blue">
        <div
          class="container mx-auto px-4 py-4 flex items-center justify-between"
        >
          <div class="flex items-center space-x-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2Fd86bb14e3b9f4d549dd2a7cfd71e4717?format=webp&width=100"
              alt="Arizona"
              class="w-10 h-10"
            />
            <div>
              <h1 class="text-xl font-bold text-medical-navy font-medical">
                Admin Dashboard
              </h1>
              <p class="text-xs text-medical-blue">
                Arizona Health Care Products
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button
              (click)="exportOrdersCSV()"
              class="border px-3 py-2 rounded text-sm hover:bg-gray-50"
            >
              Export Orders CSV
            </button>
          </div>
        </div>
      </header>

      <div class="container mx-auto px-4 py-8">
        <!-- Top Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-sm text-gray-600">Total Orders</div>
            <div class="text-2xl font-bold text-medical-navy">
              {{ totalOrders() }}
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-sm text-gray-600">Revenue</div>
            <div class="text-2xl font-bold text-medical-navy">
              PKR {{ totalRevenue().toLocaleString() }}
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-sm text-gray-600">Products</div>
            <div class="text-2xl font-bold text-medical-navy">
              {{ products().length }}
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-sm text-gray-600">Low Stock</div>
            <div class="text-2xl font-bold text-red-600">
              {{ lowStockCount() }}
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-xl shadow-lg">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-6 px-6 overflow-x-auto">
              <button
                *ngFor="let t of tabs"
                (click)="activeTab.set(t.id)"
                class="py-4 px-2 border-b-2 font-medium text-sm"
                [ngClass]="
                  activeTab() === t.id
                    ? 'border-medical-blue text-medical-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                "
              >
                {{ t.label }}
              </button>
            </nav>
          </div>

          <div class="p-6">
            <!-- Orders -->
            <ng-container *ngIf="activeTab() === 'orders'">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-medical-navy">Orders</h2>
                <div class="flex items-center space-x-2">
                  <input
                    type="text"
                    [(ngModel)]="orderSearch"
                    (input)="filterOrders()"
                    placeholder="Search orders..."
                    class="px-3 py-2 border rounded"
                  />
                  <select
                    [(ngModel)]="orderStatus"
                    (change)="filterOrders()"
                    class="px-3 py-2 border rounded"
                  >
                    <option value="">All</option>
                    <option *ngFor="let s of orderStatuses" [value]="s">
                      {{ s | titlecase }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Order ID
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Customer
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Date
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Total
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let order of filteredOrders()">
                      <td class="px-4 py-2 font-medium text-medical-navy">
                        {{ order.id }}
                      </td>
                      <td class="px-4 py-2 text-sm">
                        <div class="font-medium text-gray-900">
                          {{
                            order.customerName ||
                              order.shippingAddress?.firstName +
                                " " +
                                order.shippingAddress?.lastName
                          }}
                        </div>
                        <div class="text-gray-500">
                          {{
                            order.customerEmail || order.shippingAddress?.email
                          }}
                        </div>
                      </td>
                      <td class="px-4 py-2 text-sm text-gray-700">
                        {{ order.orderDate | date: "short" }}
                      </td>
                      <td class="px-4 py-2 text-sm text-gray-900">
                        PKR {{ order.total }}
                      </td>
                      <td class="px-4 py-2">
                        <select
                          [(ngModel)]="order.status"
                          (change)="persistOrders()"
                          class="px-3 py-1 text-sm rounded border"
                        >
                          <option *ngFor="let s of orderStatuses" [value]="s">
                            {{ s | titlecase }}
                          </option>
                        </select>
                      </td>
                      <td class="px-4 py-2 text-sm">
                        <button
                          (click)="viewOrder(order)"
                          class="text-medical-blue hover:text-medical-navy mr-3"
                        >
                          View
                        </button>
                        <button
                          (click)="printOrder(order)"
                          class="text-gray-600 hover:text-gray-900"
                        >
                          Print
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ng-container>

            <!-- Products -->
            <ng-container *ngIf="activeTab() === 'products'">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-medical-navy">Products</h2>
                <div class="flex items-center space-x-2">
                  <input
                    [(ngModel)]="productSearch"
                    (input)="applyProductFilters()"
                    placeholder="Search products..."
                    class="px-3 py-2 border rounded"
                  />
                  <button
                    (click)="startAddProduct()"
                    class="bg-medical-blue text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Add Product
                  </button>
                </div>
              </div>

              <!-- Product Form -->
              <div *ngIf="editingProduct()" class="border rounded-lg p-4 mb-6">
                <h3 class="font-bold text-medical-navy mb-3">
                  {{
                    editingProduct()?.id ? "Edit Product" : "Add New Product"
                  }}
                </h3>
                <form (ngSubmit)="saveProduct()" class="space-y-4">
                  <!-- Basic Info -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Product Name</label
                      >
                      <input
                        [(ngModel)]="formProduct.name"
                        name="pname"
                        required
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">SKU</label>
                      <div class="flex gap-2">
                        <input
                          [(ngModel)]="formProduct.sku"
                          name="psku"
                          required
                          class="w-full px-3 py-2 border rounded"
                        />
                        <button
                          type="button"
                          (click)="generateSKU()"
                          class="border px-3 rounded"
                        >
                          Auto
                        </button>
                      </div>
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium mb-1"
                        >Short Description</label
                      >
                      <input
                        [(ngModel)]="formProduct.shortDescription"
                        name="pshort"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium mb-1"
                        >Full Description</label
                      >
                      <textarea
                        [(ngModel)]="formProduct.description"
                        name="pdesc"
                        rows="3"
                        class="w-full px-3 py-2 border rounded"
                      ></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >SEO Title</label
                      >
                      <input
                        [(ngModel)]="formProduct.seoTitle"
                        name="pseot"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >SEO Description</label
                      >
                      <input
                        [(ngModel)]="formProduct.seoDescription"
                        name="pseod"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <!-- Images -->
                  <div>
                    <label class="block text-sm font-medium mb-1"
                      >Images (enter URLs, drag to reorder)</label
                    >
                    <div class="flex gap-3 flex-wrap">
                      <div
                        *ngFor="let img of formProduct.images; let i = index"
                        class="w-24"
                      >
                        <div
                          class="border rounded p-1 relative"
                          draggable="true"
                          (dragstart)="onDragStart(i)"
                          (dragover)="$event.preventDefault()"
                          (drop)="onDrop(i)"
                        >
                          <img
                            [src]="img.url"
                            [alt]="img.alt"
                            class="w-full h-16 object-contain bg-gray-50 rounded"
                          />
                          <input
                            [(ngModel)]="img.alt"
                            name="alt{{ i }}"
                            placeholder="alt"
                            class="mt-1 w-full px-2 py-1 border rounded text-xs"
                          />
                          <button
                            type="button"
                            (click)="removeImage(i)"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      <div class="w-48">
                        <input
                          [(ngModel)]="newImageUrl"
                          name="newimg"
                          placeholder="Image URL"
                          class="w-full px-3 py-2 border rounded"
                        />
                        <button
                          type="button"
                          (click)="addImage()"
                          class="mt-1 w-full border rounded px-3 py-1"
                        >
                          Add Image
                        </button>
                      </div>
                    </div>
                    <div class="mt-2">
                      <label class="text-sm mr-2">Featured Image Index</label>
                      <input
                        type="number"
                        min="0"
                        [max]="formProduct.images.length - 1"
                        [(ngModel)]="formProduct.featuredImageIndex"
                        name="pfeat"
                        class="w-24 px-2 py-1 border rounded"
                      />
                    </div>
                  </div>

                  <!-- Pricing & Inventory -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Price (PKR)</label
                      >
                      <input
                        type="number"
                        min="0"
                        [(ngModel)]="formProduct.price"
                        name="pprice"
                        required
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Sale Price (optional)</label
                      >
                      <input
                        type="number"
                        min="0"
                        [(ngModel)]="formProduct.salePrice"
                        name="psale"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Stock Quantity</label
                      >
                      <input
                        type="number"
                        min="0"
                        [(ngModel)]="formProduct.stockQty"
                        name="pqty"
                        required
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Low Stock Threshold</label
                      >
                      <input
                        type="number"
                        min="0"
                        [(ngModel)]="formProduct.lowStockThreshold"
                        name="plow"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Status</label
                      >
                      <select
                        [(ngModel)]="formProduct.status"
                        name="pstatus"
                        class="w-full px-3 py-2 border rounded"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <!-- Attributes -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Size</label>
                      <input
                        [(ngModel)]="formProduct.attributes.size"
                        name="psize"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Color</label
                      >
                      <input
                        [(ngModel)]="formProduct.attributes.color"
                        name="pcolor"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Expiry Date</label
                      >
                      <input
                        type="date"
                        [(ngModel)]="formProduct.attributes.expiryDate"
                        name="pexp"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Batch Number</label
                      >
                      <input
                        [(ngModel)]="formProduct.attributes.batchNumber"
                        name="pbatch"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <!-- Shipping -->
                  <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Weight (kg)</label
                      ><input
                        type="number"
                        step="0.01"
                        [(ngModel)]="formProduct.shipping.weight"
                        name="pweight"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >L (cm)</label
                      ><input
                        type="number"
                        step="0.1"
                        [(ngModel)]="formProduct.shipping.length"
                        name="pl"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >W (cm)</label
                      ><input
                        type="number"
                        step="0.1"
                        [(ngModel)]="formProduct.shipping.width"
                        name="pw"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >H (cm)</label
                      ><input
                        type="number"
                        step="0.1"
                        [(ngModel)]="formProduct.shipping.height"
                        name="ph"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Class</label
                      ><input
                        [(ngModel)]="formProduct.shipping.class"
                        name="pclass"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div class="md:col-span-2 flex items-center">
                      <label class="flex items-center"
                        ><input
                          type="checkbox"
                          [(ngModel)]="
                            formProduct.shipping.requiresPrescription
                          "
                          name="prx"
                          class="mr-2"
                        />Requires prescription</label
                      >
                    </div>
                    <div class="md:col-span-3">
                      <label class="block text-sm font-medium mb-1"
                        >Age Restriction</label
                      ><input
                        [(ngModel)]="formProduct.shipping.ageRestriction"
                        name="page"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <!-- Categories & Tags -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Categories</label
                      >
                      <div class="flex flex-wrap gap-2">
                        <label
                          *ngFor="let c of categories()"
                          class="text-sm border rounded px-2 py-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            class="mr-1"
                            [checked]="formProduct.categories.includes(c.id)"
                            (change)="toggleCategory(c.id, $event)"
                          />
                          {{ c.name }}
                        </label>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1"
                        >Tags (comma separated)</label
                      >
                      <input
                        [(ngModel)]="tagsInput"
                        name="ptags"
                        class="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button
                      class="bg-medical-blue text-white px-4 py-2 rounded"
                    >
                      Save Product
                    </button>
                    <button
                      type="button"
                      (click)="cancelProductEdit()"
                      class="border px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <!-- Product List -->
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Image
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Name / SKU
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Price
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Stock
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let p of filteredProducts()">
                      <td class="px-3 py-2">
                        <img
                          [src]="
                            p.images[p.featuredImageIndex]?.url ||
                            p.images[0]?.url
                          "
                          alt=""
                          class="w-12 h-12 object-contain bg-gray-50 rounded"
                        />
                      </td>
                      <td class="px-3 py-2 text-sm">
                        <div class="font-medium text-gray-900">
                          {{ p.name }}
                        </div>
                        <div class="text-xs text-gray-500">
                          SKU: {{ p.sku }}
                        </div>
                      </td>
                      <td class="px-3 py-2 text-sm">
                        <input
                          type="number"
                          class="w-28 px-2 py-1 border rounded"
                          [(ngModel)]="p.price"
                          (change)="quickSave(p, 'price')"
                        />
                        <div *ngIf="p.salePrice" class="text-xs text-gray-500">
                          Sale: {{ p.salePrice }}
                        </div>
                      </td>
                      <td class="px-3 py-2 text-sm">
                        <input
                          type="number"
                          class="w-24 px-2 py-1 border rounded"
                          [(ngModel)]="p.stockQty"
                          (change)="quickSave(p, 'stockQty')"
                        />
                        <div
                          class="text-xs"
                          [ngClass]="
                            p.stockQty <= p.lowStockThreshold
                              ? 'text-red-600'
                              : 'text-gray-500'
                          "
                        >
                          Low at {{ p.lowStockThreshold }}
                        </div>
                      </td>
                      <td class="px-3 py-2">
                        <select
                          class="px-2 py-1 text-sm border rounded"
                          [(ngModel)]="p.status"
                          (change)="quickSave(p, 'status')"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="out_of_stock">Out of Stock</option>
                        </select>
                      </td>
                      <td class="px-3 py-2 text-sm">
                        <button
                          class="text-medical-blue mr-2"
                          (click)="editProduct(p)"
                        >
                          Edit
                        </button>
                        <button
                          class="text-gray-600 mr-2"
                          (click)="duplicateProduct(p)"
                        >
                          Duplicate
                        </button>
                        <button
                          class="text-red-600"
                          (click)="deleteProduct(p.id)"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ng-container>

            <!-- Categories -->
            <ng-container *ngIf="activeTab() === 'categories'">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-medical-navy">Categories</h2>
                <div class="flex items-center gap-2">
                  <input
                    [(ngModel)]="catForm.name"
                    placeholder="Category name"
                    class="px-3 py-2 border rounded"
                  />
                  <input
                    [(ngModel)]="catForm.slug"
                    placeholder="Slug"
                    class="px-3 py-2 border rounded"
                  />
                  <select
                    [(ngModel)]="catForm.parentId"
                    class="px-3 py-2 border rounded"
                  >
                    <option value="">No parent</option>
                    <option *ngFor="let c of categories()" [value]="c.id">
                      {{ c.name }}
                    </option>
                  </select>
                  <button
                    (click)="saveCategory()"
                    class="bg-medical-blue text-white px-3 py-2 rounded"
                  >
                    {{ catEditingId ? "Update" : "Add" }}
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Slug
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Parent
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let c of categories()">
                      <td class="px-3 py-2">{{ c.name }}</td>
                      <td class="px-3 py-2 text-sm text-gray-600">
                        {{ c.slug }}
                      </td>
                      <td class="px-3 py-2 text-sm text-gray-600">
                        {{ parentName(c.parentId) }}
                      </td>
                      <td class="px-3 py-2 text-sm">
                        <button
                          class="text-medical-blue mr-2"
                          (click)="editCategory(c)"
                        >
                          Edit</button
                        ><button
                          class="text-red-600"
                          (click)="deleteCategory(c.id)"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ng-container>

            <!-- Customers -->
            <ng-container *ngIf="activeTab() === 'customers'">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-medical-navy">Customers</h2>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Email
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Phone
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Joined
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Orders
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Spent
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let cu of customers()">
                      <td class="px-3 py-2">{{ cu.name }}</td>
                      <td class="px-3 py-2">{{ cu.email }}</td>
                      <td class="px-3 py-2">{{ cu.phone }}</td>
                      <td class="px-3 py-2 text-sm text-gray-600">
                        {{ cu.dateJoined | date: "mediumDate" }}
                      </td>
                      <td class="px-3 py-2">{{ cu.totalOrders }}</td>
                      <td class="px-3 py-2">PKR {{ cu.totalSpent }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ng-container>

            <!-- Inventory -->
            <ng-container *ngIf="activeTab() === 'inventory'">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-medical-navy">Inventory</h2>
                <div class="flex gap-2">
                  <button
                    (click)="exportInventoryCSV()"
                    class="border px-3 py-2 rounded"
                  >
                    Export CSV
                  </button>
                  <label class="border px-3 py-2 rounded cursor-pointer"
                    >Import CSV<input
                      type="file"
                      class="hidden"
                      (change)="importInventoryCSV($event)"
                      accept=".csv"
                  /></label>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Product
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        SKU
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Qty
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Low
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Adjust
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let p of products()">
                      <td class="px-3 py-2">{{ p.name }}</td>
                      <td class="px-3 py-2">{{ p.sku }}</td>
                      <td class="px-3 py-2">{{ p.stockQty }}</td>
                      <td class="px-3 py-2">{{ p.lowStockThreshold }}</td>
                      <td class="px-3 py-2">
                        <span
                          [ngClass]="
                            p.stockQty <= p.lowStockThreshold
                              ? 'text-red-600'
                              : 'text-gray-700'
                          "
                          >{{ p.status }}</span
                        >
                      </td>
                      <td class="px-3 py-2">
                        <div class="flex gap-2">
                          <input
                            type="number"
                            class="w-24 px-2 py-1 border rounded"
                            [(ngModel)]="adjustQty"
                            placeholder="Qty"
                          />
                          <button
                            class="border px-3 py-1 rounded"
                            (click)="applyStockAdjustment(p)"
                          >
                            Apply
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
    <ng-template #notAdmin
      ><div class="min-h-screen flex items-center justify-center text-gray-600">
        Access denied
      </div></ng-template
    >
  `,
})
export class AdminComponent {
  constructor(public authService: AuthService) {
    this.loadOrders();
    this.loadProducts();
    this.loadCategories();
    this.buildCustomers();
  }

  // Tabs
  tabs = [
    { id: "orders", label: "Orders" },
    { id: "products", label: "Products" },
    { id: "categories", label: "Categories" },
    { id: "customers", label: "Customers" },
    { id: "inventory", label: "Inventory" },
  ];
  activeTab = signal<
    "orders" | "products" | "categories" | "customers" | "inventory"
  >("orders");

  // Orders
  orderStatuses: OrderRec["status"][] = [
    "pending",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "completed",
  ];
  orders: OrderRec[] = [];
  orderSearch = "";
  orderStatus = "";

  private normalizeOrder(rec: any): OrderRec {
    return {
      id: rec.id,
      items: rec.items || [],
      total: rec.total,
      status: rec.status || "processing",
      paymentMethod: rec.paymentMethod,
      shippingAddress: rec.shippingAddress || {},
      orderDate: rec.date || rec.orderDate || new Date().toISOString(),
      trackingNumber: rec.trackingNumber || undefined,
      paymentStatus: rec.paymentStatus || "Pending",
      customerName: rec.customerName || undefined,
      customerEmail: rec.customerEmail || undefined,
      customerPhone: rec.customerPhone || undefined,
    };
  }
  loadOrders(): void {
    try {
      const raw = localStorage.getItem("orders");
      const list = raw ? JSON.parse(raw) : [];
      this.orders = list.map((r: any) => this.normalizeOrder(r));
    } catch {
      this.orders = [];
    }
  }
  persistOrders(): void {
    try {
      const list = this.orders.map((o) => ({
        id: o.id,
        items: o.items,
        shippingAddress: o.shippingAddress,
        paymentMethod: o.paymentMethod,
        subtotal: o.items.reduce((s, i) => s + i.price * i.quantity, 0),
        shipping: 0,
        codFee: 0,
        total: o.total,
        date: o.orderDate,
        paymentStatus: o.paymentStatus,
        expectedDelivery: "",
        status: o.status,
      }));
      localStorage.setItem("orders", JSON.stringify(list));
    } catch {}
  }
  filteredOrders = computed(() => {
    const t = this.orderSearch.toLowerCase();
    return this.orders.filter((o) => {
      const ms =
        !t ||
        o.id.toLowerCase().includes(t) ||
        (o.customerName || "").toLowerCase().includes(t) ||
        (o.customerEmail || "").toLowerCase().includes(t);
      const st = !this.orderStatus || o.status === (this.orderStatus as any);
      return ms && st;
    });
  });

  totalOrders = computed(() => this.orders.length);
  totalRevenue = computed(() => this.orders.reduce((s, o) => s + o.total, 0));

  // Products
  products = signal<Product[]>([]);
  productSearch = "";
  filteredProducts = computed(() => {
    const t = this.productSearch.toLowerCase();
    return this.products().filter(
      (p) =>
        !t ||
        p.name.toLowerCase().includes(t) ||
        p.sku.toLowerCase().includes(t),
    );
  });
  editingProduct = signal<Product | null>(null);
  formProduct!: Product;
  newImageUrl = "";
  tagsInput = "";
  dragIndex: number | null = null;

  loadProducts(): void {
    try {
      this.products.set(JSON.parse(localStorage.getItem("products") || "[]"));
    } catch {
      this.products.set([]);
    }
  }
  persistProducts(): void {
    localStorage.setItem("products", JSON.stringify(this.products()));
  }

  startAddProduct(): void {
    const now = new Date().toISOString();
    this.formProduct = {
      id: "pr_" + Date.now(),
      name: "",
      shortDescription: "",
      description: "",
      categories: [],
      tags: [],
      seoTitle: "",
      seoDescription: "",
      images: [],
      featuredImageIndex: 0,
      price: 0,
      salePrice: undefined,
      sku: "",
      stockQty: 0,
      lowStockThreshold: 5,
      status: "inactive",
      attributes: {},
      shipping: { requiresPrescription: false },
      createdAt: now,
      updatedAt: now,
      versions: [],
    };
    this.tagsInput = "";
    this.newImageUrl = "";
    this.editingProduct.set(this.formProduct);
  }
  editProduct(p: Product): void {
    this.formProduct = JSON.parse(JSON.stringify(p));
    this.tagsInput = p.tags.join(", ");
    this.newImageUrl = "";
    this.editingProduct.set(this.formProduct);
  }
  cancelProductEdit(): void {
    this.editingProduct.set(null);
  }
  generateSKU(): void {
    this.formProduct.sku =
      "SKU-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  }

  addImage(): void {
    if (!this.newImageUrl) return;
    this.formProduct.images.push({ url: this.newImageUrl, alt: "" });
    this.newImageUrl = "";
  }
  removeImage(i: number): void {
    this.formProduct.images.splice(i, 1);
    if (this.formProduct.featuredImageIndex >= this.formProduct.images.length)
      this.formProduct.featuredImageIndex = 0;
  }
  onDragStart(i: number): void {
    this.dragIndex = i;
  }
  onDrop(i: number): void {
    if (this.dragIndex === null || this.dragIndex === i) return;
    const [m] = this.formProduct.images.splice(this.dragIndex, 1);
    this.formProduct.images.splice(i, 0, m);
    this.dragIndex = null;
  }

  toggleCategory(id: string, ev: Event): void {
    const ch = (ev.target as HTMLInputElement).checked;
    const set = new Set(this.formProduct.categories);
    if (ch) set.add(id);
    else set.delete(id);
    this.formProduct.categories = Array.from(set);
  }

  saveProduct(): void {
    this.formProduct.tags = this.tagsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    this.formProduct.updatedAt = new Date().toISOString();

    const list = [...this.products()];
    const idx = list.findIndex((x) => x.id === this.formProduct.id);
    const changeSummary = `Updated ${this.formProduct.name}`;
    const version: ProductVersion = {
      date: new Date().toISOString(),
      changes: changeSummary,
      data: this.formProduct,
    };
    if (idx > -1) {
      list[idx] = this.formProduct;
      list[idx].versions = [...(list[idx].versions || []), version];
    } else {
      this.formProduct.versions = [version];
      list.unshift(this.formProduct);
    }

    this.products.set(list);
    this.persistProducts();
    this.editingProduct.set(null);
  }

  quickSave(p: Product, field: keyof Product): void {
    p.updatedAt = new Date().toISOString();
    const list = this.products().map((x) => (x.id === p.id ? p : x));
    this.products.set(list);
    this.persistProducts();
  }
  duplicateProduct(p: Product): void {
    const copy = JSON.parse(JSON.stringify(p)) as Product;
    copy.id = "pr_" + Date.now();
    copy.sku = p.sku + "-COPY";
    copy.name = p.name + " (Copy)";
    copy.createdAt = new Date().toISOString();
    copy.updatedAt = copy.createdAt;
    this.products.set([copy, ...this.products()]);
    this.persistProducts();
  }
  deleteProduct(id: string): void {
    this.products.set(this.products().filter((p) => p.id !== id));
    this.persistProducts();
  }

  lowStockCount = computed(
    () =>
      this.products().filter((p) => p.stockQty <= p.lowStockThreshold).length,
  );

  // Categories
  categories = signal<Category[]>([]);
  catForm: Partial<Category> = { name: "", slug: "" };
  catEditingId: string | null = null;
  loadCategories(): void {
    try {
      this.categories.set(
        JSON.parse(localStorage.getItem("categories") || "[]"),
      );
    } catch {
      this.categories.set([]);
    }
  }
  persistCategories(): void {
    localStorage.setItem("categories", JSON.stringify(this.categories()));
  }
  parentName(pid?: string) {
    return this.categories().find((c) => c.id === pid)?.name || "-";
  }
  editCategory(c: Category): void {
    this.catEditingId = c.id;
    this.catForm = { ...c };
  }
  saveCategory(): void {
    if (!this.catForm.name || !this.catForm.slug) return;
    const list = [...this.categories()];
    if (this.catEditingId) {
      const idx = list.findIndex((c) => c.id === this.catEditingId);
      if (idx > -1) list[idx] = { ...list[idx], ...(this.catForm as Category) };
      this.catEditingId = null;
    } else {
      list.push({
        id: "cat_" + Date.now(),
        name: this.catForm.name!,
        slug: this.catForm.slug!,
        parentId: this.catForm.parentId || undefined,
      });
    }
    this.categories.set(list);
    this.persistCategories();
    this.catForm = { name: "", slug: "" };
  }
  deleteCategory(id: string): void {
    this.categories.set(this.categories().filter((c) => c.id !== id));
    this.persistCategories();
  }

  // Customers (built from users + orders)
  customers = signal<CustomerRow[]>([]);
  buildCustomers(): void {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const orders: OrderRec[] = JSON.parse(
        localStorage.getItem("orders") || "[]",
      );
      const map: Record<string, CustomerRow> = {} as any;
      for (const u of users) {
        const name =
          `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email;
        map[u.email] = {
          id: u.id,
          name,
          email: u.email,
          phone: u.phone || "",
          dateJoined: u.dateJoined || new Date().toISOString(),
          totalOrders: 0,
          totalSpent: 0,
          lastOrderDate: undefined,
          status: "active",
        };
      }
      for (const o of orders) {
        const email = (o as any).customerEmail || o.shippingAddress?.email;
        if (!email || !map[email]) continue;
        map[email].totalOrders += 1;
        map[email].totalSpent += o.total;
        map[email].lastOrderDate = o.orderDate;
      }
      this.customers.set(
        Object.values(map).sort((a, b) => b.totalSpent - a.totalSpent),
      );
    } catch {
      this.customers.set([]);
    }
  }

  // Inventory
  adjustQty: number | null = null;
  applyStockAdjustment(p: Product): void {
    if (this.adjustQty === null) return;
    p.stockQty = Math.max(0, p.stockQty + this.adjustQty);
    this.quickSave(p, "stockQty");
    this.adjustQty = null;
  }
  exportInventoryCSV(): void {
    const header = ["Name", "SKU", "Qty", "LowThreshold", "Status"];
    const rows = this.products().map((p) => [
      p.name,
      p.sku,
      p.stockQty,
      p.lowStockThreshold,
      p.status,
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  importInventoryCSV(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result || "");
        const lines = text.split(/\r?\n/).filter(Boolean);
        lines.shift();
        const list = [...this.products()];
        for (const ln of lines) {
          const [name, sku, qtyStr, lowStr, status] = ln
            .split(",")
            .map((s) => s.replace(/^\"|\"$/g, ""));
          const idx = list.findIndex((p) => p.sku === sku);
          if (idx > -1) {
            list[idx].name = name;
            list[idx].stockQty = Number(qtyStr) || 0;
            list[idx].lowStockThreshold = Number(lowStr) || 0;
            list[idx].status = (status as any) || list[idx].status;
            list[idx].updatedAt = new Date().toISOString();
          }
        }
        this.products.set(list);
        this.persistProducts();
      } catch {}
    };
    reader.readAsText(file);
  }

  // Exports
  exportOrdersCSV(): void {
    const header = [
      "Order ID",
      "Date",
      "Status",
      "Total",
      "Payment",
      "Customer",
      "Email",
      "Phone",
    ];
    const rows = (this.orders || []).map((o) => [
      o.id,
      o.orderDate,
      o.status,
      o.total,
      o.paymentMethod,
      o.customerName || "",
      o.customerEmail || "",
      o.customerPhone || "",
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
}
