import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Page Header -->
    <section class="bg-medical-gradient py-16 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl lg:text-5xl font-bold font-medical mb-6">Healthcare Products Shop</h1>
          <p class="text-xl text-blue-100 leading-relaxed">
            Browse our complete range of FDA-approved healthcare products for your family's wellbeing
          </p>
        </div>
      </div>
    </section>

    <!-- Filters & Search -->
    <section class="py-8 bg-gray-50 border-b">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- Search -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <input type="text" placeholder="Search products..." 
                     class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2">
            <button class="px-4 py-2 bg-medical-blue text-white rounded-lg font-medium hover:bg-medical-navy transition-colors">
              All Products
            </button>
            <button class="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Fever Relief
            </button>
            <button class="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Child Care
            </button>
            <button class="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              First Aid
            </button>
          </div>

          <!-- Sort -->
          <div>
            <select class="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Best Selling</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <!-- Bye Bye Fever - Available Now -->
          <div class="product-card group hover:scale-105 transition-all duration-300">
            <div class="relative mb-6">
              <img src="/api/placeholder/300/300" alt="Bye Bye Fever Cooling Patches" class="w-full h-64 object-cover rounded-lg">
              <!-- Available Badge -->
              <div class="absolute top-4 left-4 bg-healthcare-green text-white px-3 py-1 rounded-full text-sm font-bold">
                Available Now
              </div>
              <!-- Discount Badge -->
              <div class="absolute top-4 right-4 bg-arizona-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                25% OFF
              </div>
              <!-- Quick View Button -->
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button class="bg-white text-medical-navy px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Quick View
                </button>
              </div>
            </div>
            
            <!-- Product Info -->
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <span class="bg-cooling-100 text-cooling-700 px-2 py-1 rounded text-xs font-medium">Fever Relief</span>
                <span class="bg-medical-blue/10 text-medical-blue px-2 py-1 rounded text-xs font-medium">FDA Approved</span>
              </div>
              
              <h3 class="text-xl font-bold text-medical-navy group-hover:text-medical-blue transition-colors">
                Bye Bye Fever Cooling Patches
              </h3>
              
              <p class="text-gray-600 text-sm">
                Instant cooling relief patches. Safe with medication, up to 8 hours relief. Pack of 2 patches.
              </p>
              
              <!-- Rating -->
              <div class="flex items-center space-x-2">
                <div class="flex text-arizona-yellow">
                  <span>★★★★★</span>
                </div>
                <span class="text-sm text-gray-500">(125 reviews)</span>
              </div>
              
              <!-- Price -->
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-medical-navy">PKR 299</span>
                  <span class="text-lg text-gray-400 line-through ml-2">PKR 399</span>
                </div>
                <button class="bg-medical-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-medical-navy transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Coming Soon Product 1 -->
          <div class="product-card opacity-75 relative">
            <div class="relative mb-6">
              <img src="/api/placeholder/300/300" alt="Pain Relief Gel" class="w-full h-64 object-cover rounded-lg filter grayscale">
              <!-- Coming Soon Overlay -->
              <div class="absolute inset-0 bg-medical-navy/80 flex items-center justify-center">
                <div class="text-center text-white">
                  <h4 class="text-xl font-bold mb-2">Coming Soon</h4>
                  <p class="text-sm">Pain Relief Gel</p>
                  <p class="text-xs mt-2">Expected: March 2024</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">Pain Management</span>
                <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">Topical</span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-600">Arizona Pain Relief Gel</h3>
              <p class="text-gray-500 text-sm">Fast-acting topical pain relief gel for muscle and joint pain. Natural ingredients with cooling effect.</p>
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gray-500">PKR 450</span>
                  <span class="text-sm text-gray-400 ml-2">(Expected price)</span>
                </div>
                <button class="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          <!-- Coming Soon Product 2 -->
          <div class="product-card opacity-75 relative">
            <div class="relative mb-6">
              <img src="/api/placeholder/300/300" alt="Children's Vitamin Drops" class="w-full h-64 object-cover rounded-lg filter grayscale">
              <div class="absolute inset-0 bg-medical-navy/80 flex items-center justify-center">
                <div class="text-center text-white">
                  <h4 class="text-xl font-bold mb-2">Coming Soon</h4>
                  <p class="text-sm">Children's Vitamin Drops</p>
                  <p class="text-xs mt-2">Expected: April 2024</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">Child Care</span>
                <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">Vitamins</span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-600">Arizona Kids Vitamin Drops</h3>
              <p class="text-gray-500 text-sm">Essential vitamins for growing children. Orange flavor, easy to administer drops for daily nutrition.</p>
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gray-500">PKR 650</span>
                  <span class="text-sm text-gray-400 ml-2">(Expected price)</span>
                </div>
                <button class="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          <!-- Coming Soon Product 3 -->
          <div class="product-card opacity-75 relative">
            <div class="relative mb-6">
              <img src="/api/placeholder/300/300" alt="First Aid Kit" class="w-full h-64 object-cover rounded-lg filter grayscale">
              <div class="absolute inset-0 bg-medical-navy/80 flex items-center justify-center">
                <div class="text-center text-white">
                  <h4 class="text-xl font-bold mb-2">Coming Soon</h4>
                  <p class="text-sm">Family First Aid Kit</p>
                  <p class="text-xs mt-2">Expected: May 2024</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">First Aid</span>
                <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">Emergency</span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-600">Arizona Family First Aid Kit</h3>
              <p class="text-gray-500 text-sm">Complete first aid kit for home and travel. Contains essential medical supplies for emergency care.</p>
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gray-500">PKR 1,200</span>
                  <span class="text-sm text-gray-400 ml-2">(Expected price)</span>
                </div>
                <button class="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          <!-- Bundle Offer -->
          <div class="product-card border-2 border-healthcare-orange relative overflow-hidden">
            <!-- Bundle Badge -->
            <div class="absolute top-0 right-0 bg-healthcare-orange text-white px-4 py-2 text-sm font-bold transform rotate-12 translate-x-4 -translate-y-2">
              BUNDLE OFFER
            </div>
            
            <div class="relative mb-6">
              <img src="/api/placeholder/300/300" alt="Family Health Bundle" class="w-full h-64 object-cover rounded-lg">
              <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <p class="text-sm font-bold text-medical-navy">Save PKR 200</p>
                <p class="text-xs text-gray-600">Buy 3 Get 1 Free</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <span class="bg-healthcare-orange/10 text-healthcare-orange px-2 py-1 rounded text-xs font-medium">Bundle</span>
                <span class="bg-medical-blue/10 text-medical-blue px-2 py-1 rounded text-xs font-medium">Best Value</span>
              </div>
              
              <h3 class="text-xl font-bold text-medical-navy">Family Health Bundle</h3>
              <p class="text-gray-600 text-sm">4x Bye Bye Fever patches for the whole family. Perfect for households with children and elderly.</p>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Individual price:</span>
                  <span class="text-gray-400 line-through">PKR 1,196</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-medical-navy">Bundle price:</span>
                  <span class="text-2xl font-bold text-healthcare-orange">PKR 897</span>
                </div>
              </div>
              
              <button class="w-full bg-healthcare-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                Add Bundle to Cart
              </button>
            </div>
          </div>

          <!-- Placeholder for more products -->
          <div class="product-card border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[400px]">
            <div class="text-center text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
              </svg>
              <h3 class="text-lg font-medium mb-2">More Products Coming</h3>
              <p class="text-sm">We're constantly expanding our healthcare product range</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="py-16 bg-cooling-gradient">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-medical-navy font-medical mb-4">
            Stay Updated on New Products
          </h2>
          <p class="text-gray-700 mb-8">
            Be the first to know when new healthcare products become available
          </p>
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" 
                   class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent">
            <button class="bg-medical-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-medical-navy transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ShopComponent {}
