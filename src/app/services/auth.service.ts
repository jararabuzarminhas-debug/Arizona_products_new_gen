import { Injectable, signal, computed } from "@angular/core";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
  };
  dateJoined: Date;
  isVerified: boolean;
  role: "customer" | "admin";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal(false);

  // Computed values
  user = this.currentUser.asReadonly();
  authenticated = this.isAuthenticated.asReadonly();
  isAdmin = computed(() => this.currentUser()?.role === "admin");

  constructor() {
    this.loadUserFromStorage();
  }

  async login(
    credentials: LoginCredentials,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API call
      await this.delay(1000);

      // For demo purposes, accept any email/password combo
      // In real app, this would be an actual API call
      if (credentials.email && credentials.password) {
        const user: User = {
          id: "user_" + Date.now(),
          firstName: "Muhammad",
          lastName: "Hamza",
          email: credentials.email,
          phone: "+92-XXX-XXXXXXX",
          dateJoined: new Date(),
          isVerified: true,
          role: credentials.email.includes("admin") ? "admin" : "customer",
        };

        this.setUser(user);
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      return { success: false, message: "Login failed. Please try again." };
    }
  }

  async register(
    data: RegisterData,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API call
      await this.delay(1000);

      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        return { success: false, message: "Passwords do not match" };
      }

      // Check if user already exists (in real app, this would be server-side)
      const existingUsers = this.getStoredUsers();
      if (existingUsers.some((u) => u.email === data.email)) {
        return {
          success: false,
          message: "User with this email already exists",
        };
      }

      // Create new user
      const user: User = {
        id: "user_" + Date.now(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dateJoined: new Date(),
        isVerified: false,
        role: "customer",
      };

      // Store user
      this.storeUser(user);
      this.setUser(user);

      return {
        success: true,
        message: "Registration successful! Please verify your email.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem("currentUser");
  }

  updateProfile(
    userData: Partial<User>,
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const current = this.currentUser();
        if (current) {
          const updated = { ...current, ...userData };
          this.setUser(updated);
          resolve({ success: true, message: "Profile updated successfully" });
        } else {
          resolve({ success: false, message: "User not found" });
        }
      }, 500);
    });
  }

  changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In real app, verify current password with backend
        if (currentPassword && newPassword) {
          resolve({ success: true, message: "Password changed successfully" });
        } else {
          resolve({ success: false, message: "Invalid password" });
        }
      }, 500);
    });
  }

  private setUser(user: User): void {
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  private loadUserFromStorage(): void {
    try {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        const user = JSON.parse(stored);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      }
    } catch (error) {
      console.error("Failed to load user from storage:", error);
    }
  }

  private storeUser(user: User): void {
    try {
      const users = this.getStoredUsers();
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.error("Failed to store user:", error);
    }
  }

  private getStoredUsers(): User[] {
    try {
      const stored = localStorage.getItem("users");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to get stored users:", error);
      return [];
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Mock method to check if email exists
  async checkEmailExists(email: string): Promise<boolean> {
    await this.delay(300);
    const users = this.getStoredUsers();
    return users.some((u) => u.email === email);
  }
}
