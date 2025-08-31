import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { AuthService, LoginCredentials } from "../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2Fd86bb14e3b9f4d549dd2a7cfd71e4717?format=webp&width=100" alt="Arizona Health Care Products" class="mx-auto h-16 w-auto">
          <h2 class="mt-6 text-3xl font-bold text-medical-navy font-medical">Sign in to your account</h2>
          <p class="mt-2 text-sm text-gray-600">
            Or
            <a routerLink="/register" class="font-medium text-medical-blue hover:text-medical-navy transition-colors">
              create a new account
            </a>
          </p>
        </div>

        <!-- Login Form -->
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="mt-8 space-y-6">
          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input id="email" name="email" type="email" [(ngModel)]="credentials.email" required
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                     placeholder="Enter your email">
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div class="relative">
                <input id="password" name="password" [type]="showPassword() ? 'text' : 'password'" 
                       [(ngModel)]="credentials.password" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent pr-12"
                       placeholder="Enter your password">
                <button type="button" (click)="togglePassword()" 
                        class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg *ngIf="!showPassword()" class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                  </svg>
                  <svg *ngIf="showPassword()" class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"></path>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Remember me & Forgot password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" [(ngModel)]="rememberMe"
                     class="h-4 w-4 text-medical-blue focus:ring-medical-blue border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-medical-blue hover:text-medical-navy transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage()" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {{errorMessage()}}
          </div>

          <!-- Submit Button -->
          <div>
            <button type="submit" [disabled]="isLoading() || !loginForm.form.valid"
                    class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-medical-blue hover:bg-medical-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <span *ngIf="isLoading()" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{isLoading() ? 'Signing in...' : 'Sign in'}}
            </button>
          </div>

          <!-- Demo Credentials -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h4>
            <div class="text-sm text-blue-700 space-y-1">
              <p><strong>Customer:</strong> any email + any password</p>
              <p><strong>Admin:</strong> admin@arizonahcp.com + any password</p>
            </div>
          </div>
        </form>

        <!-- Footer -->
        <div class="text-center text-sm text-gray-600">
          <p>Don't have an account? 
            <a routerLink="/register" class="font-medium text-medical-blue hover:text-medical-navy transition-colors">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  credentials: LoginCredentials = {
    email: "",
    password: "",
  };

  rememberMe = false;
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal("");

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePassword(): void {
    this.showPassword.update((show) => !show);
  }

  async onSubmit(): Promise<void> {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage.set("Please fill in all fields");
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set("");

    try {
      const result = await this.authService.login(this.credentials);

      if (result.success) {
        // Check if user is admin and redirect accordingly
        if (this.authService.isAdmin()) {
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/account"]);
        }
      } else {
        this.errorMessage.set(result.message);
      }
    } catch (error) {
      this.errorMessage.set("Login failed. Please try again.");
    } finally {
      this.isLoading.set(false);
    }
  }
}
