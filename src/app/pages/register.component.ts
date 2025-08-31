import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, RegisterData } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2Fd86bb14e3b9f4d549dd2a7cfd71e4717?format=webp&width=100" alt="Arizona Health Care Products" class="mx-auto h-16 w-auto">
          <h2 class="mt-6 text-3xl font-bold text-medical-navy font-medical">Create your account</h2>
          <p class="mt-2 text-sm text-gray-600">
            Already have an account?
            <a routerLink="/login" class="font-medium text-medical-blue hover:text-medical-navy transition-colors">
              Sign in here
            </a>
          </p>
        </div>

        <!-- Registration Form -->
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="mt-8 space-y-6">
          <div class="space-y-4">
            <!-- Name Fields -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input id="firstName" name="firstName" type="text" [(ngModel)]="registerData.firstName" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                       placeholder="First name">
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input id="lastName" name="lastName" type="text" [(ngModel)]="registerData.lastName" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                       placeholder="Last name">
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input id="email" name="email" type="email" [(ngModel)]="registerData.email" required
                     (blur)="checkEmailAvailability()"
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                     placeholder="Enter your email">
              <p *ngIf="emailExists()" class="mt-1 text-sm text-red-600">This email is already registered</p>
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input id="phone" name="phone" type="tel" [(ngModel)]="registerData.phone" required
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                     placeholder="+92-XXX-XXXXXXX">
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div class="relative">
                <input id="password" name="password" [type]="showPassword() ? 'text' : 'password'" 
                       [(ngModel)]="registerData.password" required minlength="6"
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent pr-12"
                       placeholder="Create a password">
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
              <p class="mt-1 text-sm text-gray-600">Password must be at least 6 characters long</p>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" [type]="showConfirmPassword() ? 'text' : 'password'" 
                     [(ngModel)]="registerData.confirmPassword" required
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent pr-12"
                     placeholder="Confirm your password">
              <p *ngIf="registerData.confirmPassword && !passwordsMatch()" class="mt-1 text-sm text-red-600">
                Passwords do not match
              </p>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input id="agreeTerms" name="agreeTerms" type="checkbox" [(ngModel)]="agreeTerms" required
                   class="h-4 w-4 text-medical-blue focus:ring-medical-blue border-gray-300 rounded">
            <label for="agreeTerms" class="ml-2 block text-sm text-gray-900">
              I agree to the 
              <a href="#" class="text-medical-blue hover:text-medical-navy">Terms of Service</a> 
              and 
              <a href="#" class="text-medical-blue hover:text-medical-navy">Privacy Policy</a>
            </label>
          </div>

          <!-- Newsletter Subscription -->
          <div class="flex items-center">
            <input id="newsletter" name="newsletter" type="checkbox" [(ngModel)]="subscribeNewsletter"
                   class="h-4 w-4 text-medical-blue focus:ring-medical-blue border-gray-300 rounded">
            <label for="newsletter" class="ml-2 block text-sm text-gray-900">
              Subscribe to our newsletter for health tips and product updates
            </label>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage()" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {{errorMessage()}}
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage()" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
            {{successMessage()}}
          </div>

          <!-- Submit Button -->
          <div>
            <button type="submit" [disabled]="isLoading() || !isFormValid()"
                    class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-medical-blue hover:bg-medical-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <span *ngIf="isLoading()" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{isLoading() ? 'Creating account...' : 'Create account'}}
            </button>
          </div>
        </form>

        <!-- Footer -->
        <div class="text-center text-sm text-gray-600">
          <p>By creating an account, you agree to receive order updates via SMS and email.</p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerData: RegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  agreeTerms = false;
  subscribeNewsletter = false;
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  emailExists = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword.update(show => !show);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(show => !show);
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  async checkEmailAvailability(): Promise<void> {
    if (this.registerData.email) {
      const exists = await this.authService.checkEmailExists(this.registerData.email);
      this.emailExists.set(exists);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.registerData.firstName &&
      this.registerData.lastName &&
      this.registerData.email &&
      this.registerData.phone &&
      this.registerData.password &&
      this.registerData.confirmPassword &&
      this.passwordsMatch() &&
      this.agreeTerms &&
      !this.emailExists()
    );
  }

  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      this.errorMessage.set('Please fill in all required fields correctly');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const result = await this.authService.register(this.registerData);
      
      if (result.success) {
        this.successMessage.set(result.message);
        // Redirect to account page after successful registration
        setTimeout(() => {
          this.router.navigate(['/account']);
        }, 2000);
      } else {
        this.errorMessage.set(result.message);
      }
    } catch (error) {
      this.errorMessage.set('Registration failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
