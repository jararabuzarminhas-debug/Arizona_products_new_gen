import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFlipImageComponent } from '../components/product-flip-image.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-bye-bye-fever',
  standalone: true,
  imports: [CommonModule, ProductFlipImageComponent],
  template: `
    <!-- Product Hero Section -->
    <section class="py-16 bg-cooling-gradient">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Product Images -->
          <div class="space-y-4">
            <!-- Main Product Image -->
            <div class="relative">
              <app-product-flip-image
                frontImage="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F88c51a0e3ab44433a76f6eab60193797?format=webp&width=600"
                backImage="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F997192e653f646c89759edaa49301faa?format=webp&width=600"
                altText="Bye Bye Fever Cooling Patches">
              </app-product-flip-image>
              <!-- Up to 8 Hours Badge -->
              <div class="absolute top-6 right-6 bg-healthcare-orange text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-center shadow-lg">
                <div>
                  <div class="text-sm">Up to</div>
                  <div class="text-lg">8 Hours</div>
                </div>
              </div>
              <!-- FDA Approved Badge -->
              <div class="absolute bottom-6 left-6 bg-medical-blue text-white rounded-lg px-4 py-2 font-bold">
                FDA Approved
              </div>
            </div>
            
            <!-- Thumbnail Images -->
            <div class="grid grid-cols-4 gap-4">
              <img src="/api/placeholder/150/150" alt="Product packaging" class="w-full h-24 object-cover rounded-lg border-2 border-transparent hover:border-medical-blue cursor-pointer transition-colors">
              <img src="/api/placeholder/150/150" alt="Product in use" class="w-full h-24 object-cover rounded-lg border-2 border-transparent hover:border-medical-blue cursor-pointer transition-colors">
              <img src="/api/placeholder/150/150" alt="Product details" class="w-full h-24 object-cover rounded-lg border-2 border-transparent hover:border-medical-blue cursor-pointer transition-colors">
              <img src="/api/placeholder/150/150" alt="Before and after" class="w-full h-24 object-cover rounded-lg border-2 border-transparent hover:border-medical-blue cursor-pointer transition-colors">
            </div>
          </div>

          <!-- Product Details -->
          <div class="space-y-6">
            <!-- Product Title & Rating -->
            <div>
              <div class="flex items-center space-x-2 mb-3">
                <span class="bg-healthcare-green text-white px-3 py-1 rounded-full text-sm font-bold">Available Now</span>
                <span class="bg-medical-blue/10 text-medical-blue px-3 py-1 rounded-full text-sm font-bold">FDA Approved</span>
              </div>
              
              <h1 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
                Arizona Bye Bye Fever - Instant Cooling Relief
              </h1>
              
              <div class="flex items-center space-x-4 mb-4">
                <div class="flex items-center space-x-2">
                  <div class="flex text-arizona-yellow text-lg">
                    <span>★★★★★</span>
                  </div>
                  <span class="text-gray-600">(125 reviews)</span>
                </div>
                <span class="text-healthcare-green font-medium">In Stock</span>
              </div>
              
              <p class="text-lg text-gray-700 leading-relaxed">
                Safe to Use With Medication - Ready to Use patches providing up to 8 hours of continuous cooling relief
              </p>
            </div>

            <!-- Key Benefits -->
            <div class="space-y-3">
              <h3 class="text-lg font-bold text-medical-navy">Key Benefits:</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-healthcare-green rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">Up to 8 hours relief</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-healthcare-green rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">Safe with medication</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-healthcare-green rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">All ages safe</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-healthcare-green rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">No preparation needed</span>
                </div>
              </div>
            </div>

            <!-- Pricing & Quantity -->
            <div class="border-t pt-6">
              <div class="flex items-center space-x-4 mb-6">
                <div class="text-3xl font-bold text-medical-navy">PKR 299</div>
                <div class="text-xl text-gray-400 line-through">PKR 399</div>
                <div class="bg-healthcare-orange text-white px-3 py-1 rounded-full text-sm font-bold">25% OFF</div>
              </div>
              
              <!-- Quantity Selector -->
              <div class="flex items-center space-x-4 mb-6">
                <label class="font-medium text-gray-700">Quantity:</label>
                <div class="flex items-center border border-gray-200 rounded-lg">
                  <button (click)="decreaseQuantity()" class="px-4 py-2 hover:bg-gray-50 transition-colors">-</button>
                  <span class="px-4 py-2 border-x border-gray-200">{{quantity()}}</span>
                  <button (click)="increaseQuantity()" class="px-4 py-2 hover:bg-gray-50 transition-colors">+</button>
                </div>
                <span class="text-sm text-gray-600">(2 patches per pack)</span>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button (click)="addToCart()" class="flex-1 bg-medical-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-medical-navy transform hover:scale-105 transition-all duration-200 shadow-lg">
                  Add to Cart
                </button>
                <button (click)="buyNow()" class="flex-1 border-2 border-medical-blue text-medical-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-medical-blue hover:text-white transition-all duration-200">
                  Buy Now
                </button>
              </div>

              <!-- Bundle Offer -->
              <div class="mt-6 p-4 bg-healthcare-orange/10 border border-healthcare-orange/20 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-bold text-healthcare-orange">Bundle Offer</h4>
                    <p class="text-sm text-gray-600">Buy 3 Get 1 Free - Save PKR 200</p>
                  </div>
                  <button class="bg-healthcare-orange text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    View Bundle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Information Tabs -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <!-- Tab Navigation -->
        <div class="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          <button *ngFor="let tab of tabs; let i = index" 
                  (click)="activeTab = i"
                  [class.active]="activeTab === i"
                  class="px-6 py-3 font-medium text-gray-600 hover:text-medical-blue transition-colors relative">
            {{tab.label}}
            <div *ngIf="activeTab === i" class="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-blue"></div>
          </button>
        </div>

        <!-- Tab Content -->
        <div class="max-w-4xl mx-auto">
          <!-- Features Tab -->
          <div *ngIf="activeTab === 0" class="space-y-6">
            <h3 class="text-2xl font-bold text-medical-navy font-medical mb-6">Product Features</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 class="text-lg font-bold text-medical-navy mb-4">Cooling Technology</h4>
                <ul class="space-y-3 text-gray-700">
                  <li class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-cooling-600 rounded-full mt-2"></div>
                    <span><strong>Duration:</strong> Up to 8 hours of continuous cooling relief</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-cooling-600 rounded-full mt-2"></div>
                    <span><strong>Heat Absorption:</strong> Water-based gel absorbs heat and provides quick cool effect</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-cooling-600 rounded-full mt-2"></div>
                    <span><strong>Adhesive Power:</strong> Strong adhesive power for secure application</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="text-lg font-bold text-medical-navy mb-4">Safety Features</h4>
                <ul class="space-y-3 text-gray-700">
                  <li class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-healthcare-green rounded-full mt-2"></div>
                    <span><strong>Gentle Formula:</strong> Gentle to skin, safe for all ages</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-healthcare-green rounded-full mt-2"></div>
                    <span><strong>Medication Safe:</strong> Safe to use with other medications</span>
                  </li>
                  <li class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-healthcare-green rounded-full mt-2"></div>
                    <span><strong>Child Safe:</strong> Bitterness ingredient to prevent accidental eating</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- How to Use Tab -->
          <div *ngIf="activeTab === 1" class="space-y-8">
            <h3 class="text-2xl font-bold text-medical-navy font-medical mb-6">How to Use</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 class="font-bold text-medical-navy mb-2">Preparation</h4>
                    <p class="text-gray-700">Peel off the transparent file carefully from the adhesive surface</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 class="font-bold text-medical-navy mb-2">Application</h4>
                    <p class="text-gray-700">Apply the adhesive surface directly to the skin on forehead or affected area</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 class="font-bold text-medical-navy mb-2">Enhancement</h4>
                    <p class="text-gray-700">For enhanced cooling effect, place the sheet in refrigerator before use</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h4 class="font-bold text-medical-navy mb-2">Usage</h4>
                    <p class="text-gray-700">Use once only for good efficacy, adhesive, and hygiene</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Precautions Tab -->
          <div *ngIf="activeTab === 2" class="space-y-6">
            <h3 class="text-2xl font-bold text-medical-navy font-medical mb-6">Precautions & Safety</h3>
            <div class="bg-healthcare-orange/10 border border-healthcare-orange/20 rounded-lg p-6 mb-6">
              <h4 class="text-lg font-bold text-healthcare-orange mb-4 flex items-center">
                <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                Important Safety Information
              </h4>
              <ul class="space-y-2 text-gray-700">
                <li>⚠️ For external use only</li>
                <li>⚠️ Do not use on open cuts or irritated skin</li>
                <li>⚠️ Stop use and consult doctor if rashes, redness, itching or irritation occurs</li>
                <li>⚠️ Use under supervision of parents, doctor, or healthcare professional</li>
                <li>⚠️ Cooling effect decreases gradually after opening - use promptly</li>
              </ul>
            </div>
          </div>

          <!-- Ingredients Tab -->
          <div *ngIf="activeTab === 3" class="space-y-6">
            <h3 class="text-2xl font-bold text-medical-navy font-medical mb-6">Ingredients</h3>
            <div class="bg-medical-blue/5 rounded-lg p-6">
              <h4 class="text-lg font-bold text-medical-navy mb-4">Major Constituents:</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul class="space-y-3 text-gray-700">
                  <li><strong>NP 700:</strong> (9003-04-07)</li>
                  <li><strong>AQUA:</strong> Deionized Water (7732)</li>
                  <li><strong>GLYCERIN:</strong> (56-81-5)</li>
                </ul>
                <ul class="space-y-3 text-gray-700">
                  <li><strong>PIGMENT:</strong> (3844-45-9)</li>
                  <li><strong>PEPPERMINT:</strong> (8006-90-4)</li>
                  <li><strong>ICE COOL FACTOR:</strong> Special cooling agent</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Storage Tab -->
          <div *ngIf="activeTab === 4" class="space-y-6">
            <h3 class="text-2xl font-bold text-medical-navy font-medical mb-6">Storage & Safety</h3>
            <div class="space-y-6">
              <div class="bg-cooling-50 rounded-lg p-6">
                <h4 class="text-lg font-bold text-cooling-700 mb-4">Storage Instructions</h4>
                <ul class="space-y-2 text-gray-700">
                  <li>🏠 Store in cool & dry place</li>
                  <li>☀️ Avoid direct sunlight and high temperature</li>
                  <li>❄️ To enhance cooling effect, place in refrigerator before use</li>
                </ul>
              </div>
              
              <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 class="text-lg font-bold text-red-700 mb-4">Important Disclaimer</h4>
                <p class="text-gray-700 font-medium">
                  BYE BYE FEVER IS NOT A MEDICAL PRODUCT. IF FEVER PERSISTS CONSULT WITH YOUR DOCTOR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Reviews -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            Customer Reviews
          </h2>
          <div class="flex items-center justify-center space-x-4">
            <div class="flex text-arizona-yellow text-2xl">
              <span>★★★★★</span>
            </div>
            <span class="text-xl font-bold text-medical-navy">4.8 out of 5</span>
            <span class="text-gray-600">(125 reviews)</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Customer Review 1 -->
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">SA</span>
              </div>
              <div>
                <h4 class="font-bold text-medical-navy">Sarah Ahmed</h4>
                <div class="flex items-center space-x-2">
                  <div class="flex text-arizona-yellow text-sm">
                    <span>★★★★★</span>
                  </div>
                  <span class="text-xs text-gray-500">Lahore • 2 weeks ago</span>
                </div>
              </div>
            </div>
            <p class="text-gray-700 italic mb-3">
              "Absolutely amazing! My daughter had high fever and this worked exactly as promised. 8 hours of relief and she slept peacefully. Highly recommend to all parents!"
            </p>
            <div class="flex items-center text-sm text-gray-500">
              <span>😊 👍 ❤️</span>
              <span class="ml-2">Verified Purchase</span>
            </div>
          </div>

          <!-- Customer Review 2 -->
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-healthcare-green rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">MH</span>
              </div>
              <div>
                <h4 class="font-bold text-medical-navy">Muhammad Hassan</h4>
                <div class="flex items-center space-x-2">
                  <div class="flex text-arizona-yellow text-sm">
                    <span>★★★★★</span>
                  </div>
                  <span class="text-xs text-gray-500">Faisalabad • 1 month ago</span>
                </div>
              </div>
            </div>
            <p class="text-gray-700 italic mb-3">
              "Very safe to use with other medicines. Great for both kids and adults. No side effects noticed. Will definitely order again for our family."
            </p>
            <div class="flex items-center text-sm text-gray-500">
              <span>💯 🙏</span>
              <span class="ml-2">Verified Purchase</span>
            </div>
          </div>

          <!-- Customer Review 3 -->
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-cooling-600 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">FK</span>
              </div>
              <div>
                <h4 class="font-bold text-medical-navy">Fatima Khan</h4>
                <div class="flex items-center space-x-2">
                  <div class="flex text-arizona-yellow text-sm">
                    <span>★★★★★</span>
                  </div>
                  <span class="text-xs text-gray-500">Multan • 3 weeks ago</span>
                </div>
              </div>
            </div>
            <p class="text-gray-700 italic mb-3">
              "Easy to apply and instant cooling effect. My elderly father loves these patches. No side effects and works exactly as described. Great value for money!"
            </p>
            <div class="flex items-center text-sm text-gray-500">
              <span>😍 💯</span>
              <span class="ml-2">Verified Purchase</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <button class="border-2 border-medical-blue text-medical-blue px-8 py-3 rounded-lg font-medium hover:bg-medical-blue hover:text-white transition-all duration-200">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  `
})
export class ByeByeFeverComponent {
  activeTab = 0;
  quantity = signal(1);

  tabs = [
    { label: 'Features' },
    { label: 'How to Use' },
    { label: 'Precautions' },
    { label: 'Ingredients' },
    { label: 'Storage & Safety' }
  ];

  constructor(private cartService: CartService) {}

  increaseQuantity(): void {
    if (this.quantity() < 10) {
      this.quantity.update(q => q + 1);
    }
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToCart(): void {
    this.cartService.addToCart({
      id: 'bye-bye-fever-001',
      name: 'Arizona Bye Bye Fever - Instant Cooling Relief',
      price: 299,
      originalPrice: 399,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F88c51a0e3ab44433a76f6eab60193797?format=webp&width=400',
      inStock: true,
      maxQuantity: 10
    }, this.quantity());
  }

  buyNow(): void {
    this.addToCart();
    // TODO: Navigate to checkout
    console.log('Proceeding to checkout...');
  }
}
