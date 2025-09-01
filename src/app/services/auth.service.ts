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
  verificationToken?: string;
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
  role?: "customer" | "admin";
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
      await this.delay(500);

      if (!(credentials.email && credentials.password)) {
        return { success: false, message: "Invalid email or password" };
      }

      const users = this.getStoredUsers();
      const existing = users.find((u) => u.email === credentials.email);

      if (existing) {
        if (existing.role === "admin" && !existing.isVerified) {
          return {
            success: false,
            message: "Admin email not verified. Please check your inbox.",
          };
        }
        this.setUser(existing);
        return { success: true, message: "Login successful" };
      }

      // Create customer by default when not found
      const user: User = {
        id: "user_" + Date.now(),
        firstName: credentials.email.split("@")[0],
        lastName: "",
        email: credentials.email,
        phone: "+92-XXX-XXXXXXX",
        dateJoined: new Date(),
        isVerified: true,
        role: "customer",
      };
      this.storeUser(user);
      this.setUser(user);
      return { success: true, message: "Login successful" };
    } catch (error) {
      return { success: false, message: "Login failed. Please try again." };
    }
  }

  async register(
    data: RegisterData,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.delay(800);

      if (data.password !== data.confirmPassword) {
        return { success: false, message: "Passwords do not match" };
      }

      const existingUsers = this.getStoredUsers();
      if (existingUsers.some((u) => u.email === data.email)) {
        return {
          success: false,
          message: "User with this email already exists",
        };
      }

      const isAdminSignup = data.role === "admin";
      if (
        isAdminSignup &&
        !data.email.toLowerCase().endsWith("@arizonahcp.com")
      ) {
        return {
          success: false,
          message: "Admin accounts must use @arizonahcp.com email",
        };
      }

      const user: User = {
        id: "user_" + Date.now(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dateJoined: new Date(),
        isVerified: !isAdminSignup, // admins require verification
        role: isAdminSignup ? "admin" : "customer",
        verificationToken: isAdminSignup ? this.generateToken() : undefined,
      };

      this.storeUser(user);
      this.setUser(user);

      if (isAdminSignup) {
        console.info("Admin verification token:", user.verificationToken);
        return {
          success: true,
          message: "Admin account created. Verification email sent.",
        };
      }
      return { success: true, message: "Registration successful!" };
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

  private generateToken(): string {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  // Mock method to check if email exists
  async checkEmailExists(email: string): Promise<boolean> {
    await this.delay(300);
    const users = this.getStoredUsers();
    return users.some((u) => u.email === email);
  }

  // Verify email using token (would be called from email link)
  verifyEmail(token: string): { success: boolean; message: string } {
    const users = this.getStoredUsers();
    const idx = users.findIndex((u) => u.verificationToken === token);
    if (idx === -1)
      return { success: false, message: "Invalid or expired token" };
    users[idx].isVerified = true;
    users[idx].verificationToken = undefined;
    localStorage.setItem("users", JSON.stringify(users));

    // Update current user if matching
    const current = this.currentUser();
    if (current && current.id === users[idx].id) {
      this.setUser(users[idx]);
    }
    return { success: true, message: "Email verified successfully" };
  }
}
