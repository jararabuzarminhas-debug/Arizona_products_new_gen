import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <!-- Hero Section - Bye Bye Fever Focus -->
    <section class="bg-cooling-gradient py-16 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-6">
            <div class="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span class="text-medical-navy text-sm font-medium">FDA Approved • Safe with Medication</span>
            </div>
            
            <h1 class="text-4xl lg:text-6xl font-bold text-medical-navy font-medical leading-tight">
              Instant Cooling Relief with
              <span class="text-cooling-700 block">Bye Bye Fever</span>
            </h1>
            
            <p class="text-lg text-gray-700 leading-relaxed">
              Safe with medication • Up to 8 hours relief • Ready to use patches for instant cooling comfort
            </p>

            <!-- Key Features -->
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-healthcare-green rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">FDA Approved cooling patches</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-healthcare-green rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">Safe for children and adults</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-healthcare-green rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">Works alongside other medications</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-healthcare-green rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">No mixing required - ready to use</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button class="bg-medical-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-medical-navy transform hover:scale-105 transition-all duration-200 shadow-lg">
                Order Now - PKR 299
              </button>
              <button class="border-2 border-medical-blue text-medical-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-medical-blue hover:text-white transition-all duration-200">
                Learn More
              </button>
            </div>

            <p class="text-sm text-gray-600 flex items-center">
              <svg class="w-4 h-4 mr-2 text-healthcare-green" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              Trusted by families across Punjab
            </p>
          </div>

          <!-- Right Content - Product Showcase -->
          <div class="relative">
            <div class="relative animate-float">
              <!-- 8 Hours Badge -->
              <div class="absolute -top-4 -right-4 bg-healthcare-orange text-white rounded-full w-24 h-24 flex items-center justify-center font-bold text-center shadow-lg z-10">
                <div>
                  <div class="text-lg">Up to</div>
                  <div class="text-xl">8 Hours</div>
                </div>
              </div>
              
              <!-- Product Image Container -->
              <div class="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div class="bg-white rounded-2xl p-6 shadow-lg">
                  <img src="/api/placeholder/400/500" alt="Bye Bye Fever Cooling Patches" class="w-full h-auto object-contain">
                </div>
              </div>

              <!-- 2 Patches Badge -->
              <div class="absolute -bottom-4 -left-4 bg-cooling-600 text-white rounded-xl px-4 py-2 font-bold shadow-lg">
                2 Patches Included
              </div>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute top-1/4 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-1/4 -left-8 w-24 h-24 bg-cooling-300/30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Moving Certifications Banner -->
    <section class="bg-white border-y border-gray-200 py-4 overflow-hidden">
      <div class="animate-scroll flex items-center space-x-12 whitespace-nowrap">
        <!-- FDA Approved -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">FDA</span>
          </div>
          <span class="font-medium text-gray-700">FDA Approved</span>
        </div>
        
        <!-- ISO Quality -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-healthcare-green rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">ISO</span>
          </div>
          <span class="font-medium text-gray-700">ISO Quality Certified</span>
        </div>
        
        <!-- GMP -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-arizona-orange rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">GMP</span>
          </div>
          <span class="font-medium text-gray-700">Good Manufacturing Practice</span>
        </div>
        
        <!-- CE Marking -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-medical-navy rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">CE</span>
          </div>
          <span class="font-medium text-gray-700">CE Marking</span>
        </div>
        
        <!-- Made in China -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-arizona-red rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">QC</span>
          </div>
          <span class="font-medium text-gray-700">Quality Control</span>
        </div>
        
        <!-- Import License -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-cooling-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">LIC</span>
          </div>
          <span class="font-medium text-gray-700">Import Licensed</span>
        </div>
        
        <!-- Halal -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-healthcare-green rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">♦</span>
          </div>
          <span class="font-medium text-gray-700">Halal Certified</span>
        </div>
        
        <!-- Child Safety -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-arizona-yellow rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">👶</span>
          </div>
          <span class="font-medium text-gray-700">Child Safe</span>
        </div>
      </div>
    </section>

    <!-- Why Choose Bye Bye Fever Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            Why Choose Bye Bye Fever?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by healthcare professionals and families across Punjab for safe, effective fever relief
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Instant Relief -->
          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-cooling-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-cooling-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-3">Instant Relief</h3>
            <p class="text-gray-600">Works in minutes to provide immediate cooling comfort and temperature reduction</p>
          </div>

          <!-- Long Lasting -->
          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-healthcare-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-healthcare-green" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-3">Long Lasting</h3>
            <p class="text-gray-600">Up to 8 hours of continuous cooling relief for extended comfort and peace of mind</p>
          </div>

          <!-- Safe Formula -->
          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-medical-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-3">Safe Formula</h3>
            <p class="text-gray-600">Safe to use with other medications. Gentle on skin for children and adults</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            How Bye Bye Fever Works
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple 4-step process for instant cooling relief
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-cooling-gradient rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span class="text-2xl font-bold text-medical-navy">1</span>
              </div>
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-healthcare-orange rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-bold text-medical-navy mb-2">Peel</h3>
            <p class="text-gray-600 text-sm">Remove the transparent backing film carefully</p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-cooling-gradient rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span class="text-2xl font-bold text-medical-navy">2</span>
              </div>
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-healthcare-green rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-bold text-medical-navy mb-2">Apply</h3>
            <p class="text-gray-600 text-sm">Place on forehead or affected area gently</p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-cooling-gradient rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span class="text-2xl font-bold text-medical-navy">3</span>
              </div>
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-cooling-600 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-bold text-medical-navy mb-2">Cool</h3>
            <p class="text-gray-600 text-sm">Immediate cooling sensation begins instantly</p>
          </div>

          <!-- Step 4 -->
          <div class="text-center">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-cooling-gradient rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span class="text-2xl font-bold text-medical-navy">4</span>
              </div>
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-arizona-yellow rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-bold text-medical-navy mb-2">Relief</h3>
            <p class="text-gray-600 text-sm">Up to 8 hours of continuous cooling comfort</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Results Section -->
    <section class="py-16 bg-cooling-gradient">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-medical-navy mb-2">10,000+</div>
            <p class="text-medical-blue font-medium">Satisfied Customers</p>
          </div>
          <div>
            <div class="text-4xl font-bold text-medical-navy mb-2">10+</div>
            <p class="text-medical-blue font-medium">Districts in Punjab</p>
          </div>
          <div>
            <div class="text-4xl font-bold text-medical-navy mb-2">95%</div>
            <p class="text-medical-blue font-medium">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Testimonials Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            What Our Customers Say
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from families across Punjab who trust Arizona Health Care Products
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">SA</span>
              </div>
              <div>
                <h4 class="font-bold text-medical-navy">Sarah Ahmed</h4>
                <p class="text-sm text-gray-600">Lahore</p>
              </div>
            </div>
            <div class="flex mb-3">
              <span class="text-arizona-yellow">★★★★★</span>
            </div>
            <p class="text-gray-700 italic">"Bye Bye Fever saved the night when my daughter had high fever. Works exactly as promised - 8 hours of relief!"</p>
            <div class="mt-4 flex items-center text-sm text-gray-500">
              <span>😊 👍</span>
              <span class="ml-2">• 2 weeks ago</span>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-healthcare-green rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">MH</span>
              </div>
              <div>
                <h4 class="font-bold text-medical-navy">Muhammad Hassan</h4>
                <p class="text-sm text-gray-600">Faisalabad</p>
              </div>
            </div>
            <div class="flex mb-3">
              <span class="text-arizona-yellow">★★★★★</span>
            </div>
            <p class="text-gray-700 italic">"Safe to use with other medicines. Great for kids and adults. Highly recommend to all families."</p>
            <div class="mt-4 flex items-center text-sm text-gray-500">
              <span>❤️ 🙏</span>
              <span class="ml-2">• 1 month ago</span>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-cooling-600 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold">FK</span>
              </div>
              <div>
                <h4 class="font-bold text-medical-navy">Fatima Khan</h4>
                <p class="text-sm text-gray-600">Multan</p>
              </div>
            </div>
            <div class="flex mb-3">
              <span class="text-arizona-yellow">★★★★★</span>
            </div>
            <p class="text-gray-700 italic">"Easy to apply and instant cooling effect. No side effects. Will definitely order again!"</p>
            <div class="mt-4 flex items-center text-sm text-gray-500">
              <span>💯 😍</span>
              <span class="ml-2">• 3 weeks ago</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <button class="border-2 border-medical-blue text-medical-blue px-8 py-3 rounded-lg font-medium hover:bg-medical-blue hover:text-white transition-all duration-200">
            Read All Testimonials
          </button>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {}
