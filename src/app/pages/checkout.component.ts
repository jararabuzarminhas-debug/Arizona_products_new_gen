import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { CartService } from "../services/cart.service";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  deliveryInstructions: string;
}

type DeliveryMethod = "home" | "express" | "pickup";

type PaymentType = "cod" | "jazzcash" | "easypaisa" | "bank_transfer" | "card";

interface PaymentMethod {
  type: PaymentType;
}

interface PlacedOrder {
  id: string;
  items: any[];
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  deliverySlot: string;
  paymentMethod: PaymentType;
  subtotal: number;
  shipping: number;
  codFee: number;
  total: number;
  date: string;
  paymentStatus: "Pending" | "Paid";
  transactionId?: string;
  expectedDelivery: string;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "out_for_delivery"
    | "completed";
}

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-medical-navy font-medical mb-4">
              Checkout
            </h1>
            <div class="flex items-center justify-center space-x-4">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  [ngClass]="
                    step() >= 1
                      ? 'bg-medical-blue text-white'
                      : 'bg-gray-300 text-gray-600'
                  "
                >
                  1
                </div>
                <span
                  class="ml-2 text-sm font-medium"
                  [ngClass]="
                    step() >= 1 ? 'text-medical-blue' : 'text-gray-600'
                  "
                  >Shipping</span
                >
              </div>
              <div
                class="w-8 h-0.5"
                [ngClass]="step() > 1 ? 'bg-medical-blue' : 'bg-gray-300'"
              ></div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  [ngClass]="
                    step() >= 2
                      ? 'bg-medical-blue text-white'
                      : 'bg-gray-300 text-gray-600'
                  "
                >
                  2
                </div>
                <span
                  class="ml-2 text-sm font-medium"
                  [ngClass]="
                    step() >= 2 ? 'text-medical-blue' : 'text-gray-600'
                  "
                  >Payment</span
                >
              </div>
              <div
                class="w-8 h-0.5"
                [ngClass]="step() > 2 ? 'bg-medical-blue' : 'bg-gray-300'"
              ></div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  [ngClass]="
                    step() >= 3
                      ? 'bg-medical-blue text-white'
                      : 'bg-gray-300 text-gray-600'
                  "
                >
                  3
                </div>
                <span
                  class="ml-2 text-sm font-medium"
                  [ngClass]="
                    step() >= 3 ? 'text-medical-blue' : 'text-gray-600'
                  "
                  >Review</span
                >
              </div>
            </div>
          </div>

          <div
            class="grid grid-cols-1 lg:grid-cols-3 gap-8"
            *ngIf="!orderPlaced()"
          >
            <div class="lg:col-span-2">
              <div *ngIf="step() === 1" class="space-y-6">
                <div class="bg-white rounded-xl p-6 shadow-lg">
                  <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-medical-navy">
                      Shipping Information
                    </h2>
                    <div class="flex items-center space-x-3">
                      <select
                        [(ngModel)]="selectedBookIndex"
                        (change)="applyAddressFromBook()"
                        class="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        [disabled]="addressBook.length === 0"
                      >
                        <option value="-1">Address Book</option>
                        <option
                          *ngFor="let a of addressBook; let i = index"
                          [ngValue]="i"
                        >
                          {{ a.firstName }} {{ a.lastName }} — {{ a.city }}
                        </option>
                      </select>
                      <label class="flex items-center text-sm text-gray-600">
                        <input
                          type="checkbox"
                          [(ngModel)]="saveAddress"
                          class="mr-2 h-4 w-4 text-medical-blue rounded"
                        />
                        Save to Address Book
                      </label>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >First Name *</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="shippingAddress.firstName"
                        name="firstName"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Last Name *</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="shippingAddress.lastName"
                        name="lastName"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Phone Number *</label
                      >
                      <input
                        type="tel"
                        [(ngModel)]="shippingAddress.phone"
                        name="phone"
                        required
                        placeholder="+92-XXX-XXXXXXX"
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Email Address *</label
                      >
                      <input
                        type="email"
                        [(ngModel)]="shippingAddress.email"
                        name="email"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Street Address *</label
                    >
                    <input
                      type="text"
                      [(ngModel)]="shippingAddress.address"
                      name="address"
                      required
                      placeholder="House/Flat number, Street name"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >City *</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="shippingAddress.city"
                        name="city"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >District *</label
                      >
                      <select
                        [(ngModel)]="shippingAddress.district"
                        name="district"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      >
                        <option value="">Select District</option>
                        <option value="lahore">Lahore</option>
                        <option value="faisalabad">Faisalabad</option>
                        <option value="multan">Multan</option>
                        <option value="rawalpindi">Rawalpindi</option>
                        <option value="gujranwala">Gujranwala</option>
                        <option value="sialkot">Sialkot</option>
                        <option value="sargodha">Sargodha</option>
                        <option value="bahawalpur">Bahawalpur</option>
                        <option value="sheikhupura">Sheikhupura</option>
                        <option value="kasur">Kasur</option>
                      </select>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Postal Code</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="shippingAddress.postalCode"
                        name="postalCode"
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Delivery Instructions (Optional)</label
                    >
                    <textarea
                      [(ngModel)]="shippingAddress.deliveryInstructions"
                      name="deliveryInstructions"
                      rows="3"
                      placeholder="Special delivery instructions (e.g., gate code, landmarks)"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    ></textarea>
                  </div>
                </div>

                <div class="bg-white rounded-xl p-6 shadow-lg">
                  <h2 class="text-xl font-bold text-medical-navy mb-4">
                    Delivery Options
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label
                      class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-medical-blue transition-colors"
                      [class.border-medical-blue]="deliveryMethod === 'home'"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input
                            type="radio"
                            [(ngModel)]="deliveryMethod"
                            name="deliveryMethod"
                            value="home"
                            class="w-4 h-4 text-medical-blue"
                          />
                          <span class="ml-3 font-medium text-gray-900"
                            >Home delivery</span
                          >
                        </div>
                        <span class="text-sm text-gray-500">1–2 days</span>
                      </div>
                      <div class="mt-2 text-sm text-gray-600">
                        PKR {{ homeDeliveryCost() }}
                      </div>
                    </label>

                    <label
                      class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-medical-blue transition-colors"
                      [class.opacity-50]="!isMajorCity()"
                      [class.cursor-not-allowed]="!isMajorCity()"
                      [class.border-medical-blue]="deliveryMethod === 'express'"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input
                            type="radio"
                            [(ngModel)]="deliveryMethod"
                            name="deliveryMethod"
                            value="express"
                            class="w-4 h-4 text-medical-blue"
                            [disabled]="!isMajorCity()"
                          />
                          <span class="ml-3 font-medium text-gray-900"
                            >Express delivery</span
                          >
                        </div>
                        <span class="text-sm text-gray-500">Same day</span>
                      </div>
                      <div class="mt-2 text-sm text-gray-600">PKR 500</div>
                      <div class="mt-1 text-xs text-gray-500">
                        Available in major cities
                      </div>
                    </label>

                    <label
                      class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-medical-blue transition-colors"
                      [class.border-medical-blue]="deliveryMethod === 'pickup'"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input
                            type="radio"
                            [(ngModel)]="deliveryMethod"
                            name="deliveryMethod"
                            value="pickup"
                            class="w-4 h-4 text-medical-blue"
                          />
                          <span class="ml-3 font-medium text-gray-900"
                            >Pickup from distributor</span
                          >
                        </div>
                        <span class="text-sm text-healthcare-green">FREE</span>
                      </div>
                    </label>
                  </div>

                  <div class="mt-6">
                    <h3 class="font-medium text-gray-900 mb-2">
                      Preferred delivery time
                    </h3>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <label
                        class="border border-gray-200 rounded-lg p-2 text-center cursor-pointer"
                        [class.border-medical-blue]="
                          deliverySlot === '9AM-12PM'
                        "
                      >
                        <input
                          type="radio"
                          [(ngModel)]="deliverySlot"
                          name="deliverySlot"
                          value="9AM-12PM"
                          class="hidden"
                        />
                        9AM-12PM
                      </label>
                      <label
                        class="border border-gray-200 rounded-lg p-2 text-center cursor-pointer"
                        [class.border-medical-blue]="
                          deliverySlot === '12PM-3PM'
                        "
                      >
                        <input
                          type="radio"
                          [(ngModel)]="deliverySlot"
                          name="deliverySlot"
                          value="12PM-3PM"
                          class="hidden"
                        />
                        12PM-3PM
                      </label>
                      <label
                        class="border border-gray-200 rounded-lg p-2 text-center cursor-pointer"
                        [class.border-medical-blue]="deliverySlot === '3PM-6PM'"
                      >
                        <input
                          type="radio"
                          [(ngModel)]="deliverySlot"
                          name="deliverySlot"
                          value="3PM-6PM"
                          class="hidden"
                        />
                        3PM-6PM
                      </label>
                      <label
                        class="border border-gray-200 rounded-lg p-2 text-center cursor-pointer"
                        [class.border-medical-blue]="deliverySlot === '7PM-9PM'"
                      >
                        <input
                          type="radio"
                          [(ngModel)]="deliverySlot"
                          name="deliverySlot"
                          value="7PM-9PM"
                          class="hidden"
                        />
                        7PM-9PM
                      </label>
                    </div>
                  </div>

                  <div class="mt-6 flex justify-end">
                    <button
                      (click)="goToStep(2)"
                      [disabled]="!isShippingValid()"
                      class="bg-medical-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-medical-navy transition-colors disabled:opacity-50"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>

              <div *ngIf="step() === 2" class="space-y-6">
                <div class="bg-white rounded-xl p-6 shadow-lg">
                  <h2 class="text-xl font-bold text-medical-navy mb-6">
                    Payment Method
                  </h2>
                  <div class="space-y-4">
                    <label
                      class="border border-gray-200 rounded-lg p-4 flex items-start cursor-pointer"
                      [class.border-medical-blue]="paymentMethod.type === 'cod'"
                    >
                      <input
                        type="radio"
                        [(ngModel)]="paymentMethod.type"
                        name="paymentType"
                        value="cod"
                        class="mt-1 w-4 h-4 text-medical-blue"
                      />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <span class="font-medium text-gray-900"
                            >Cash on Delivery (COD)</span
                          >
                          <span class="text-sm text-gray-500"
                            >+ PKR 50 fee</span
                          >
                        </div>
                        <p class="text-sm text-gray-500 mt-1">
                          Phone confirmation required prior to dispatch
                        </p>
                      </div>
                    </label>

                    <label
                      class="border border-gray-200 rounded-lg p-4 flex items-start cursor-pointer"
                      [class.border-medical-blue]="
                        paymentMethod.type === 'jazzcash'
                      "
                    >
                      <input
                        type="radio"
                        [(ngModel)]="paymentMethod.type"
                        name="paymentType"
                        value="jazzcash"
                        class="mt-1 w-4 h-4 text-medical-blue"
                      />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <span class="font-medium text-gray-900"
                            >JazzCash</span
                          >
                          <span class="text-sm text-healthcare-green"
                            >Instant</span
                          >
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                          <input
                            type="tel"
                            [(ngModel)]="paymentDetails.jazzcash.mobile"
                            placeholder="JazzCash Mobile Number"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                          <input
                            type="text"
                            [(ngModel)]="paymentDetails.jazzcash.cnic"
                            placeholder="CNIC (optional)"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                          <input
                            type="text"
                            [(ngModel)]="paymentDetails.jazzcash.transactionId"
                            placeholder="Transaction ID (auto if empty)"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                        </div>
                      </div>
                    </label>

                    <label
                      class="border border-gray-200 rounded-lg p-4 flex items-start cursor-pointer"
                      [class.border-medical-blue]="
                        paymentMethod.type === 'easypaisa'
                      "
                    >
                      <input
                        type="radio"
                        [(ngModel)]="paymentMethod.type"
                        name="paymentType"
                        value="easypaisa"
                        class="mt-1 w-4 h-4 text-medical-blue"
                      />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <span class="font-medium text-gray-900"
                            >EasyPaisa</span
                          >
                          <span class="text-sm text-healthcare-green"
                            >Instant</span
                          >
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                          <input
                            type="tel"
                            [(ngModel)]="paymentDetails.easypaisa.mobile"
                            placeholder="EasyPaisa Mobile Number"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                          <input
                            type="text"
                            [(ngModel)]="paymentDetails.easypaisa.cnic"
                            placeholder="CNIC (optional)"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                          <input
                            type="text"
                            [(ngModel)]="paymentDetails.easypaisa.transactionId"
                            placeholder="Transaction ID (auto if empty)"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                        </div>
                      </div>
                    </label>

                    <label
                      class="border border-gray-200 rounded-lg p-4 flex items-start cursor-pointer"
                      [class.border-medical-blue]="
                        paymentMethod.type === 'bank_transfer'
                      "
                    >
                      <input
                        type="radio"
                        [(ngModel)]="paymentMethod.type"
                        name="paymentType"
                        value="bank_transfer"
                        class="mt-1 w-4 h-4 text-medical-blue"
                      />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <span class="font-medium text-gray-900"
                            >Bank Transfer</span
                          >
                          <span class="text-sm text-gray-500"
                            >24h verification</span
                          >
                        </div>
                        <div
                          class="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3 text-sm"
                        >
                          <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-gray-500">Bank</div>
                            <div class="font-medium">
                              Habib Bank Limited (HBL)
                            </div>
                          </div>
                          <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-gray-500">Account Name</div>
                            <div class="font-medium">
                              Arizona Health Care Products
                            </div>
                          </div>
                          <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-gray-500">Account No./IBAN</div>
                            <div class="font-medium break-all">
                              PK00HABB0000000000000000
                            </div>
                          </div>
                          <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-gray-500">Branch Code</div>
                            <div class="font-medium">0001</div>
                          </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          <input
                            type="text"
                            [(ngModel)]="paymentDetails.bank.reference"
                            placeholder="Payment Reference/Remarks"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                          <input
                            type="text"
                            [(ngModel)]="paymentDetails.bank.transactionId"
                            placeholder="Transaction ID (after transfer)"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                        </div>
                      </div>
                    </label>

                    <label
                      class="border border-gray-200 rounded-lg p-4 flex items-start cursor-pointer"
                      [class.border-medical-blue]="
                        paymentMethod.type === 'card'
                      "
                    >
                      <input
                        type="radio"
                        [(ngModel)]="paymentMethod.type"
                        name="paymentType"
                        value="card"
                        class="mt-1 w-4 h-4 text-medical-blue"
                      />
                      <div class="ml-3 flex-1 w-full">
                        <div class="flex items-center justify-between">
                          <span class="font-medium text-gray-900"
                            >Credit / Debit Card</span
                          >
                          <span class="text-sm text-gray-500">3D Secure</span>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                          <input
                            type="text"
                            [(ngModel)]="paymentDetails.card.cardNumber"
                            placeholder="Card Number"
                            maxlength="19"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                          <input
                            type="text"
                            [(ngModel)]="paymentDetails.card.expiry"
                            placeholder="MM/YY"
                            maxlength="5"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                          <input
                            type="password"
                            [(ngModel)]="paymentDetails.card.cvc"
                            placeholder="CVC"
                            maxlength="4"
                            class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                          />
                        </div>
                      </div>
                    </label>
                  </div>

                  <div class="mt-6 flex justify-between">
                    <button
                      (click)="goToStep(1)"
                      class="border-2 border-medical-blue text-medical-blue px-6 py-3 rounded-lg font-medium hover:bg-medical-blue hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      (click)="goToStep(3)"
                      [disabled]="!isPaymentValid()"
                      class="bg-medical-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-medical-navy transition-colors disabled:opacity-50"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              </div>

              <div *ngIf="step() === 3" class="space-y-6">
                <div class="bg-white rounded-xl p-6 shadow-lg">
                  <h2 class="text-xl font-bold text-medical-navy mb-4">
                    Order Review
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 class="font-medium text-gray-900 mb-2">
                        Delivery Information
                      </h3>
                      <p class="text-sm text-gray-700">
                        {{ shippingAddress.firstName }}
                        {{ shippingAddress.lastName }}
                      </p>
                      <p class="text-sm text-gray-700">
                        {{ shippingAddress.phone }} •
                        {{ shippingAddress.email }}
                      </p>
                      <p class="text-sm text-gray-700">
                        {{ shippingAddress.address }},
                        {{ shippingAddress.city }},
                        {{ shippingAddress.district | titlecase }}
                        {{ shippingAddress.postalCode }}
                      </p>
                      <p
                        class="text-sm text-gray-700"
                        *ngIf="shippingAddress.deliveryInstructions"
                      >
                        Note: {{ shippingAddress.deliveryInstructions }}
                      </p>
                      <p class="text-sm text-gray-700 mt-2">
                        Delivery: {{ deliveryLabel() }} • Slot:
                        {{ deliverySlot }}
                      </p>
                      <p class="text-sm text-gray-700">
                        Expected delivery: {{ expectedDelivery() }}
                      </p>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900 mb-2">
                        Payment Method
                      </h3>
                      <p class="text-sm text-gray-700">{{ paymentLabel() }}</p>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center">
                    <label class="flex items-center text-sm text-gray-700">
                      <input
                        type="checkbox"
                        [(ngModel)]="acceptTerms"
                        class="h-4 w-4 text-medical-blue rounded mr-2"
                      />
                      I agree to the terms and medical disclaimers
                    </label>
                  </div>

                  <div class="mt-6 flex justify-between">
                    <button
                      (click)="goToStep(2)"
                      class="border-2 border-medical-blue text-medical-blue px-6 py-3 rounded-lg font-medium hover:bg-medical-blue hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      (click)="placeOrder()"
                      [disabled]="!acceptTerms || placing()"
                      class="bg-healthcare-orange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
                    >
                      {{ placing() ? "Placing..." : "Place Order" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-1">
              <div class="bg-white rounded-xl p-6 shadow-lg sticky top-8">
                <h2 class="text-xl font-bold text-medical-navy mb-6">
                  Order Summary
                </h2>
                <div class="space-y-4 mb-6">
                  <div
                    *ngFor="let item of cartService.items()"
                    class="flex items-center space-x-3"
                  >
                    <img
                      [src]="item.image"
                      [alt]="item.name"
                      class="w-16 h-16 object-contain rounded-lg bg-gray-50"
                    />
                    <div class="flex-1">
                      <h3 class="font-medium text-gray-900 text-sm">
                        {{ item.name }}
                      </h3>
                      <p class="text-sm text-gray-500">
                        Qty: {{ item.quantity }}
                      </p>
                      <p class="text-sm font-bold text-medical-navy">
                        PKR {{ item.price * item.quantity }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="border-t border-gray-200 pt-4 space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Subtotal</span
                    ><span class="font-medium"
                      >PKR {{ cartService.subtotal() }}</span
                    >
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Shipping</span
                    ><span class="font-medium"
                      ><span
                        *ngIf="shippingCost() === 0"
                        class="text-healthcare-green"
                        >FREE</span
                      ><span *ngIf="shippingCost() > 0"
                        >PKR {{ shippingCost() }}</span
                      ></span
                    >
                  </div>
                  <div
                    *ngIf="paymentMethod.type === 'cod'"
                    class="flex justify-between text-sm"
                  >
                    <span class="text-gray-600">COD Fee</span
                    ><span class="font-medium">PKR 50</span>
                  </div>
                  <div
                    class="flex justify-between text-lg font-bold text-medical-navy border-t pt-2"
                  >
                    <span>Total</span><span>PKR {{ finalTotal() }}</span>
                  </div>
                </div>
                <div
                  class="flex items-center justify-center mt-4 text-sm text-gray-500"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    ></path></svg
                  >Secure Checkout
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="orderPlaced()" class="max-w-3xl mx-auto">
            <div class="bg-white rounded-xl p-8 shadow-lg text-center">
              <div
                class="mx-auto w-16 h-16 rounded-full bg-healthcare-green/10 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-8 h-8 text-healthcare-green"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-medical-navy mb-2">
                Order Confirmed
              </h2>
              <p class="text-gray-700">
                Order Number:
                <span class="font-mono font-bold">{{ placedOrder()?.id }}</span>
              </p>
              <p class="text-gray-700">
                Payment Status:
                <span class="font-medium">{{
                  placedOrder()?.paymentStatus
                }}</span>
              </p>
              <p class="text-gray-700">
                Expected Delivery:
                <span class="font-medium">{{
                  placedOrder()?.expectedDelivery
                }}</span>
              </p>
              <div class="mt-6 text-left">
                <h3 class="font-medium text-gray-900 mb-2">Order Details</h3>
                <ul class="space-y-1 text-sm text-gray-700">
                  <li *ngFor="let it of placedOrder()?.items">
                    - {{ it.name }} × {{ it.quantity }} — PKR
                    {{ it.price * it.quantity }}
                  </li>
                </ul>
                <div class="mt-4 border-t pt-3 text-sm">
                  <div class="flex justify-between">
                    <span>Subtotal</span
                    ><span>PKR {{ placedOrder()?.subtotal }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Shipping</span
                    ><span>PKR {{ placedOrder()?.shipping }}</span>
                  </div>
                  <div
                    class="flex justify-between"
                    *ngIf="placedOrder()?.codFee"
                  >
                    <span>COD Fee</span
                    ><span>PKR {{ placedOrder()?.codFee }}</span>
                  </div>
                  <div class="flex justify-between font-bold text-medical-navy">
                    <span>Total</span
                    ><span>PKR {{ placedOrder()?.total }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-8 text-sm text-gray-600">
                You'll receive an SMS and email with tracking details.
              </div>
              <div class="mt-6 flex items-center justify-center space-x-3">
                <a
                  routerLink="/"
                  class="bg-medical-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-medical-navy transition-colors"
                  >Continue Shopping</a
                >
                <a
                  routerLink="/account?tab=orders"
                  class="border-2 border-medical-blue text-medical-blue px-6 py-3 rounded-lg font-medium hover:bg-medical-blue hover:text-white transition-colors"
                  >View Orders</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckoutComponent {
  step = signal<number>(1);
  placing = signal(false);

  shippingAddress: ShippingAddress = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    deliveryInstructions: "",
  };

  addressBook: ShippingAddress[] = [];
  selectedBookIndex: number | string = -1;
  saveAddress = false;

  deliveryMethod: DeliveryMethod = "home";
  deliverySlot = "9AM-12PM";

  paymentMethod: PaymentMethod = { type: "cod" };

  paymentDetails = {
    jazzcash: { mobile: "", cnic: "", transactionId: "" },
    easypaisa: { mobile: "", cnic: "", transactionId: "" },
    bank: { reference: "", transactionId: "" },
    card: { cardNumber: "", expiry: "", cvc: "" },
  };

  acceptTerms = false;
  orderPlaced = signal(false);
  placedOrder = signal<PlacedOrder | null>(null);

  private readonly MAJOR_CITIES = new Set([
    "lahore",
    "rawalpindi",
    "faisalabad",
    "multan",
    "gujranwala",
    "sialkot",
  ]);

  constructor(
    public cartService: CartService,
    private router: Router,
  ) {
    this.loadAddressBook();
  }

  loadAddressBook(): void {
    try {
      const raw = localStorage.getItem("addressBook");
      this.addressBook = raw ? JSON.parse(raw) : [];
    } catch {
      this.addressBook = [];
    }
  }
  saveToAddressBook(): void {
    if (!this.saveAddress) return;
    try {
      const list = [...this.addressBook, { ...this.shippingAddress }];
      this.addressBook = list;
      localStorage.setItem("addressBook", JSON.stringify(list));
    } catch {}
  }
  applyAddressFromBook(): void {
    const idx = Number(this.selectedBookIndex);
    if (!isNaN(idx) && idx >= 0 && idx < this.addressBook.length) {
      this.shippingAddress = { ...this.addressBook[idx] };
    }
  }

  isMajorCity(): boolean {
    return this.MAJOR_CITIES.has(
      (this.shippingAddress.district || "").toLowerCase(),
    );
  }
  homeDeliveryCost(): number {
    return this.isMajorCity() ? 150 : 300;
  }
  shippingCost(): number {
    switch (this.deliveryMethod) {
      case "home":
        return this.homeDeliveryCost();
      case "express":
        return 500;
      case "pickup":
        return 0;
    }
  }
  finalTotal(): number {
    const subtotal = this.cartService.subtotal();
    const shipping = this.shippingCost();
    const codFee = this.paymentMethod.type === "cod" ? 50 : 0;
    return subtotal + shipping + codFee;
  }

  isShippingValid(): boolean {
    const s = this.shippingAddress;
    return !!(
      s.firstName &&
      s.lastName &&
      s.phone &&
      s.email &&
      s.address &&
      s.city &&
      s.district &&
      this.deliverySlot
    );
  }
  isPaymentValid(): boolean {
    switch (this.paymentMethod.type) {
      case "cod":
        return true;
      case "jazzcash":
        return !!this.paymentDetails.jazzcash.mobile;
      case "easypaisa":
        return !!this.paymentDetails.easypaisa.mobile;
      case "bank_transfer":
        return true;
      case "card":
        return !!(
          this.paymentDetails.card.cardNumber &&
          this.paymentDetails.card.expiry &&
          this.paymentDetails.card.cvc
        );
    }
  }
  goToStep(n: number): void {
    if (n === 2 && !this.isShippingValid()) return;
    if (n === 3 && !this.isPaymentValid()) return;
    this.step.set(n);
    if (n === 2 && this.saveAddress) this.saveToAddressBook();
  }

  deliveryLabel(): string {
    switch (this.deliveryMethod) {
      case "home":
        return `Home delivery (${this.homeDeliveryCost()} PKR, 1–2 days)`;
      case "express":
        return "Express delivery (PKR 500, same day)";
      case "pickup":
        return "Pickup from nearest distributor (FREE)";
    }
  }
  paymentLabel(): string {
    switch (this.paymentMethod.type) {
      case "cod":
        return "Cash on Delivery (+ PKR 50 COD fee)";
      case "jazzcash":
        return `JazzCash${this.paymentDetails.jazzcash.transactionId ? ` — TX: ${this.paymentDetails.jazzcash.transactionId}` : ""}`;
      case "easypaisa":
        return `EasyPaisa${this.paymentDetails.easypaisa.transactionId ? ` — TX: ${this.paymentDetails.easypaisa.transactionId}` : ""}`;
      case "bank_transfer":
        return "Bank Transfer (manual verification within 24h)";
      case "card":
        return "Credit/Debit Card (3D Secure)";
    }
  }
  expectedDelivery(): string {
    const now = new Date();
    const addDays = (d: number) => {
      const dt = new Date(now);
      dt.setDate(dt.getDate() + d);
      return dt.toDateString();
    };
    if (this.deliveryMethod === "pickup") return now.toDateString();
    if (this.deliveryMethod === "express" && this.isMajorCity())
      return now.toDateString();
    if (this.deliveryMethod === "home")
      return addDays(this.isMajorCity() ? 1 : 2);
    return addDays(2);
  }

  placeOrder(): void {
    if (!this.isShippingValid() || !this.isPaymentValid() || !this.acceptTerms)
      return;
    this.placing.set(true);
    setTimeout(() => {
      const id = this.generateOrderId();
      const txId = this.ensureTransactionId();
      const order: PlacedOrder = {
        id,
        items: this.cartService.items(),
        shippingAddress: this.shippingAddress,
        deliveryMethod: this.deliveryMethod,
        deliverySlot: this.deliverySlot,
        paymentMethod: this.paymentMethod.type,
        subtotal: this.cartService.subtotal(),
        shipping: this.shippingCost(),
        codFee: this.paymentMethod.type === "cod" ? 50 : 0,
        total: this.finalTotal(),
        date: new Date().toISOString(),
        paymentStatus: this.paymentMethod.type === "cod" ? "Pending" : "Paid",
        transactionId: txId || undefined,
        expectedDelivery: this.expectedDelivery(),
        status: this.paymentMethod.type === "cod" ? "pending" : "processing",
      };
      try {
        const raw = localStorage.getItem("orders");
        const list = raw ? JSON.parse(raw) : [];
        list.push(order);
        localStorage.setItem("orders", JSON.stringify(list));
      } catch {}
      this.placedOrder.set(order);
      this.orderPlaced.set(true);
      this.cartService.clearCart();
      this.placing.set(false);
    }, 1200);
  }

  private generateOrderId(): string {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const d = new Date();
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `AHC-${y}${m}${day}-${rand}`;
  }
  private ensureTransactionId(): string | null {
    if (this.paymentMethod.type === "jazzcash") {
      if (!this.paymentDetails.jazzcash.transactionId) {
        this.paymentDetails.jazzcash.transactionId = `JC-${Date.now()}`;
      }
      return this.paymentDetails.jazzcash.transactionId;
    }
    if (this.paymentMethod.type === "easypaisa") {
      if (!this.paymentDetails.easypaisa.transactionId) {
        this.paymentDetails.easypaisa.transactionId = `EP-${Date.now()}`;
      }
      return this.paymentDetails.easypaisa.transactionId;
    }
    if (this.paymentMethod.type === "bank_transfer") {
      return this.paymentDetails.bank.transactionId || null;
    }
    return null;
  }
}
