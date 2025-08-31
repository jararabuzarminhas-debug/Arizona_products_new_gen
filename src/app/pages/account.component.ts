import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { AuthService, User } from "../services/auth.service";

@Component({
  selector: "app-account",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Account Header -->
          <div class="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-medical-navy font-medical">
                  Welcome back, {{ authService.user()?.firstName }}!
                </h1>
                <p class="text-gray-600 mt-2">
                  Manage your account and track your orders
                </p>
              </div>
              <button
                (click)="logout()"
                class="text-gray-500 hover:text-red-600 transition-colors flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Sidebar Menu -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-xl p-6 shadow-lg">
                <nav class="space-y-2">
                  <button
                    *ngFor="let tab of tabs"
                    (click)="activeTab.set(tab.id)"
                    [class.active]="activeTab() === tab.id"
                    class="w-full text-left px-4 py-3 rounded-lg font-medium transition-colors hover:bg-gray-50"
                    [ngClass]="
                      activeTab() === tab.id
                        ? 'bg-medical-blue text-white'
                        : 'text-gray-700'
                    "
                  >
                    <div class="flex items-center space-x-3">
                      <svg class="w-5 h-5" [innerHTML]="tab.icon"></svg>
                      <span>{{ tab.label }}</span>
                    </div>
                  </button>
                </nav>
              </div>
            </div>

            <!-- Main Content -->
            <div class="lg:col-span-2">
              <!-- Profile Tab -->
              <div
                *ngIf="activeTab() === 'profile'"
                class="bg-white rounded-xl p-6 shadow-lg"
              >
                <h2 class="text-2xl font-bold text-medical-navy mb-6">
                  Profile Information
                </h2>

                <form (ngSubmit)="updateProfile()" #profileForm="ngForm">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >First Name</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="profileData.firstName"
                        name="firstName"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Last Name</label
                      >
                      <input
                        type="text"
                        [(ngModel)]="profileData.lastName"
                        name="lastName"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Email</label
                      >
                      <input
                        type="email"
                        [(ngModel)]="profileData.email"
                        name="email"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Phone</label
                      >
                      <input
                        type="tel"
                        [(ngModel)]="profileData.phone"
                        name="phone"
                        required
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    [disabled]="isUpdating()"
                    class="bg-medical-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-medical-navy transition-colors disabled:opacity-50"
                  >
                    {{ isUpdating() ? "Updating..." : "Update Profile" }}
                  </button>
                </form>
              </div>

              <!-- Orders Tab -->
              <div
                *ngIf="activeTab() === 'orders'"
                class="bg-white rounded-xl p-6 shadow-lg"
              >
                <h2 class="text-2xl font-bold text-medical-navy mb-6">
                  Order History
                </h2>

                <div *ngIf="orders.length === 0" class="text-center py-12">
                  <svg
                    class="w-24 h-24 mx-auto text-gray-300 mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p class="text-gray-500 mb-6">
                    Start shopping to see your orders here
                  </p>
                  <button
                    routerLink="/shop"
                    class="bg-medical-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-medical-navy transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>

                <!-- Sample orders would be displayed here -->
                <div *ngIf="orders.length > 0" class="space-y-4">
                  <div
                    *ngFor="let order of orders"
                    class="border border-gray-200 rounded-lg p-4"
                  >
                    <div class="flex items-center justify-between mb-3">
                      <div>
                        <h3 class="font-bold text-medical-navy">
                          Order #{{ order.id }}
                        </h3>
                        <p class="text-sm text-gray-500">
                          {{ order.date | date }}
                        </p>
                      </div>
                      <span
                        class="px-3 py-1 rounded-full text-sm font-medium"
                        [ngClass]="getOrderStatusClass(order.status)"
                      >
                        {{ order.status }}
                      </span>
                    </div>
                    <div class="text-lg font-bold text-medical-navy">
                      PKR {{ order.total }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Addresses Tab -->
              <div
                *ngIf="activeTab() === 'addresses'"
                class="bg-white rounded-xl p-6 shadow-lg"
              >
                <h2 class="text-2xl font-bold text-medical-navy mb-6">
                  Saved Addresses
                </h2>

                <div class="text-center py-12">
                  <svg
                    class="w-24 h-24 mx-auto text-gray-300 mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">
                    No saved addresses
                  </h3>
                  <p class="text-gray-500 mb-6">
                    Add an address for faster checkout
                  </p>
                  <button
                    class="bg-medical-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-medical-navy transition-colors"
                  >
                    Add Address
                  </button>
                </div>
              </div>

              <!-- Settings Tab -->
              <div
                *ngIf="activeTab() === 'settings'"
                class="bg-white rounded-xl p-6 shadow-lg"
              >
                <h2 class="text-2xl font-bold text-medical-navy mb-6">
                  Account Settings
                </h2>

                <!-- Change Password -->
                <div class="mb-8">
                  <h3 class="text-lg font-bold text-medical-navy mb-4">
                    Change Password
                  </h3>
                  <form (ngSubmit)="changePassword()" #passwordForm="ngForm">
                    <div class="space-y-4 mb-4">
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 mb-2"
                          >Current Password</label
                        >
                        <input
                          type="password"
                          [(ngModel)]="passwordData.current"
                          name="currentPassword"
                          required
                          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                        />
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 mb-2"
                          >New Password</label
                        >
                        <input
                          type="password"
                          [(ngModel)]="passwordData.new"
                          name="newPassword"
                          required
                          minlength="6"
                          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                        />
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 mb-2"
                          >Confirm New Password</label
                        >
                        <input
                          type="password"
                          [(ngModel)]="passwordData.confirm"
                          name="confirmPassword"
                          required
                          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      [disabled]="isChangingPassword()"
                      class="bg-medical-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-medical-navy transition-colors disabled:opacity-50"
                    >
                      {{
                        isChangingPassword() ? "Changing..." : "Change Password"
                      }}
                    </button>
                  </form>
                </div>

                <!-- Notification Preferences -->
                <div>
                  <h3 class="text-lg font-bold text-medical-navy mb-4">
                    Notification Preferences
                  </h3>
                  <div class="space-y-3">
                    <label class="flex items-center">
                      <input
                        type="checkbox"
                        [(ngModel)]="notificationSettings.email"
                        class="h-4 w-4 text-medical-blue focus:ring-medical-blue border-gray-300 rounded"
                      />
                      <span class="ml-3 text-gray-700"
                        >Email notifications</span
                      >
                    </label>
                    <label class="flex items-center">
                      <input
                        type="checkbox"
                        [(ngModel)]="notificationSettings.sms"
                        class="h-4 w-4 text-medical-blue focus:ring-medical-blue border-gray-300 rounded"
                      />
                      <span class="ml-3 text-gray-700">SMS notifications</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        type="checkbox"
                        [(ngModel)]="notificationSettings.newsletter"
                        class="h-4 w-4 text-medical-blue focus:ring-medical-blue border-gray-300 rounded"
                      />
                      <span class="ml-3 text-gray-700"
                        >Newsletter subscription</span
                      >
                    </label>
                  </div>
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
  activeTab = signal("profile");
  isUpdating = signal(false);
  isChangingPassword = signal(false);

  profileData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  passwordData = {
    current: "",
    new: "",
    confirm: "",
  };

  notificationSettings = {
    email: true,
    sms: true,
    newsletter: false,
  };

  orders: any[] = []; // Sample orders would be loaded here

  tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: '<path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>',
    },
    {
      id: "orders",
      label: "Orders",
      icon: '<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>',
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: '<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>',
    },
    {
      id: "settings",
      label: "Settings",
      icon: '<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>',
    },
  ];

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
    this.loadProfileData();
  }

  loadProfileData(): void {
    const user = this.authService.user();
    if (user) {
      this.profileData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      };
    }
  }

  async updateProfile(): Promise<void> {
    this.isUpdating.set(true);

    try {
      const result = await this.authService.updateProfile(this.profileData);
      if (result.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + result.message);
      }
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      this.isUpdating.set(false);
    }
  }

  async changePassword(): Promise<void> {
    if (this.passwordData.new !== this.passwordData.confirm) {
      alert("New passwords do not match");
      return;
    }

    this.isChangingPassword.set(true);

    try {
      const result = await this.authService.changePassword(
        this.passwordData.current,
        this.passwordData.new,
      );
      if (result.success) {
        alert("Password changed successfully!");
        this.passwordData = { current: "", new: "", confirm: "" };
      } else {
        alert("Failed to change password: " + result.message);
      }
    } catch (error) {
      alert("Failed to change password");
    } finally {
      this.isChangingPassword.set(false);
    }
  }

  getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
