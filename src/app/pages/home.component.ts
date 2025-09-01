import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <!-- Hero Section - Bye Bye Fever Focus (Reduced Height) -->
    <section class="bg-cooling-gradient py-8 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left Content -->
          <div class="space-y-4">
            <div
              class="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <span class="text-medical-navy text-sm font-medium"
                >FDA Approved • Safe with Medication</span
              >
            </div>

            <h1
              class="text-3xl lg:text-5xl font-bold text-medical-navy font-medical leading-tight"
            >
              Instant Cooling Relief with
              <span class="text-cooling-700 block">Bye Bye Fever</span>
            </h1>

            <p class="text-base text-gray-700 leading-relaxed">
              Safe with medication • Up to 8 hours relief • Ready to use patches
              for instant cooling comfort
            </p>

            <!-- Key Features -->
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <div
                  class="w-5 h-5 bg-healthcare-green rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-white"
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
                <span class="text-gray-700 font-medium text-sm"
                  >FDA Approved cooling patches</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <div
                  class="w-5 h-5 bg-healthcare-green rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-white"
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
                <span class="text-gray-700 font-medium text-sm"
                  >Safe for children and adults</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <div
                  class="w-5 h-5 bg-healthcare-green rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-white"
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
                <span class="text-gray-700 font-medium text-sm"
                  >Works alongside other medications</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <div
                  class="w-5 h-5 bg-healthcare-green rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-white"
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
                <span class="text-gray-700 font-medium text-sm"
                  >No mixing required - ready to use</span
                >
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                class="bg-medical-blue text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-medical-navy transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Order Now - PKR 299
              </button>
              <button
                class="border-2 border-medical-blue text-medical-blue px-6 py-3 rounded-lg font-bold text-base hover:bg-medical-blue hover:text-white transition-all duration-200"
              >
                Learn More
              </button>
            </div>

            <p class="text-sm text-gray-600 flex items-center">
              <svg
                class="w-4 h-4 mr-2 text-healthcare-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Trusted by families across Punjab
            </p>
          </div>

          <!-- Right Content - Product Showcase -->
          <div class="relative">
            <div class="relative animate-float">
              <!-- 8 Hours Badge -->
              <div
                class="absolute -top-3 -right-3 bg-healthcare-orange text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-center shadow-lg z-10"
              >
                <div>
                  <div class="text-sm">Up to</div>
                  <div class="text-base">8 Hours</div>
                </div>
              </div>

              <!-- Product Image Container -->
              <div
                class="bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-2xl"
              >
                <div class="bg-white rounded-2xl p-4 shadow-lg">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F88c51a0e3ab44433a76f6eab60193797?format=webp&width=600"
                    alt="Bye Bye Fever Cooling Patches - Front"
                    class="w-full h-auto object-contain"
                  />
                </div>
              </div>

              <!-- 2 Patches Badge -->
              <div
                class="absolute -bottom-3 -left-3 bg-cooling-600 text-white rounded-xl px-3 py-2 font-bold shadow-lg text-sm"
              >
                2 Patches Included
              </div>
            </div>

            <!-- Decorative Elements -->
            <div
              class="absolute top-1/4 -right-6 w-24 h-24 bg-white/10 rounded-full blur-3xl"
            ></div>
            <div
              class="absolute bottom-1/4 -left-6 w-20 h-20 bg-cooling-300/30 rounded-full blur-2xl"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Certifications Banner with Animation -->
    <section class="bg-white border-y border-gray-200 py-6">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          <!-- Left Banner -->
          <div class="lg:col-span-1 text-center lg:text-left">
            <div class="bg-medical-blue text-white rounded-xl p-4">
              <h3 class="text-lg font-bold mb-1">4 Certificates</h3>
              <p class="text-sm text-blue-100">
                From Global & National Authorities
              </p>
            </div>
          </div>

          <!-- Moving Certifications (logos only, spaced, hidden under left banner) -->
          <div class="lg:col-span-3">
            <div class="relative overflow-hidden">
              <div class="absolute left-0 top-0 h-full w-24 bg-white"></div>
              <div class="absolute right-0 top-0 h-full w-24 bg-white"></div>
              <div class="animate-scroll flex items-center space-x-16">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F1f1502d9a8224eea86bf9439bfdf2723?format=webp&width=160"
                  alt="FDA"
                  class="h-14 w-auto object-contain shrink-0"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2Fbc2efc8bcb1147018a9aa7b2fc88f9ad?format=webp&width=160"
                  alt="DRAP"
                  class="h-14 w-auto object-contain shrink-0"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F905a3e873c5b4c028d3d66a2f8d42ffa?format=webp&width=160"
                  alt="CDA"
                  class="h-14 w-auto object-contain shrink-0"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F3748f4f65f554f98af1921e55a2aac5a?format=webp&width=160"
                  alt="ISO"
                  class="h-14 w-auto object-contain shrink-0"
                />
                <!-- duplicate sequence for seamless scroll -->
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F1f1502d9a8224eea86bf9439bfdf2723?format=webp&width=160"
                  alt="FDA"
                  class="h-14 w-auto object-contain shrink-0"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2Fbc2efc8bcb1147018a9aa7b2fc88f9ad?format=webp&width=160"
                  alt="DRAP"
                  class="h-14 w-auto object-contain shrink-0"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F905a3e873c5b4c028d3d66a2f8d42ffa?format=webp&width=160"
                  alt="CDA"
                  class="h-14 w-auto object-contain shrink-0"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F3748f4f65f554f98af1921e55a2aac5a?format=webp&width=160"
                  alt="ISO"
                  class="h-14 w-auto object-contain shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Now - Bundle Section -->
    <section
      class="py-12 bg-gradient-to-br from-arizona-orange/10 to-healthcare-orange/10"
    >
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center bg-healthcare-orange text-white px-4 py-2 rounded-full mb-4"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <span class="font-bold text-sm">TRENDING NOW</span>
          </div>
          <h2
            class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4"
          >
            High Sale Bundle Offers
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Save more with our popular bundle packages - perfect for families
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Bundle of 2 -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg border-2 border-healthcare-orange/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <!-- Trending Badge -->
            <div
              class="absolute top-4 right-4 bg-healthcare-orange text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse"
            >
              🔥 HOT DEAL
            </div>

            <div class="text-center">
              <div class="mb-6">
                <div class="flex justify-center items-center space-x-2 mb-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F88c51a0e3ab44433a76f6eab60193797?format=webp&width=150"
                    alt="Bye Bye Fever"
                    class="w-20 h-24 object-contain"
                  />
                  <span class="text-2xl font-bold text-medical-blue">+</span>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F88c51a0e3ab44433a76f6eab60193797?format=webp&width=150"
                    alt="Bye Bye Fever"
                    class="w-20 h-24 object-contain"
                  />
                </div>
                <h3 class="text-xl font-bold text-medical-navy mb-2">
                  Bundle of 2 Packs
                </h3>
                <p class="text-gray-600 text-sm mb-4">
                  4 cooling patches total • Perfect for couples
                </p>
              </div>

              <div class="mb-6">
                <div class="flex items-center justify-center space-x-2 mb-2">
                  <span class="text-2xl font-bold text-red-500 line-through"
                    >PKR 598</span
                  >
                  <span class="text-3xl font-bold text-healthcare-green"
                    >PKR 499</span
                  >
                </div>
                <div
                  class="bg-healthcare-green text-white px-3 py-1 rounded-full text-sm font-bold inline-block"
                >
                  Save PKR 99 (17% OFF)
                </div>
              </div>

              <button
                class="w-full bg-healthcare-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
              >
                Order Bundle of 2
              </button>
            </div>
          </div>

          <!-- Bundle of 3 -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg border-2 border-medical-blue/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <!-- Most Popular Badge -->
            <div
              class="absolute top-4 right-4 bg-medical-blue text-white px-3 py-1 rounded-full text-xs font-bold"
            >
              ⭐ MOST POPULAR
            </div>

            <div class="text-center">
              <div class="mb-6">
                <div class="flex justify-center items-center space-x-1 mb-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F88c51a0e3ab44433a76f6eab60193797?format=webp&width=150"
                    alt="Bye Bye Fever"
                    class="w-16 h-20 object-contain"
                  />
                  <span class="text-xl font-bold text-medical-blue">+</span>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F88c51a0e3ab44433a76f6eab60193797?format=webp&width=150"
                    alt="Bye Bye Fever"
                    class="w-16 h-20 object-contain"
                  />
                  <span class="text-xl font-bold text-medical-blue">+</span>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F9b521cffba264c368029dd6e2d6a20f2%2F88c51a0e3ab44433a76f6eab60193797?format=webp&width=150"
                    alt="Bye Bye Fever"
                    class="w-16 h-20 object-contain"
                  />
                </div>
                <h3 class="text-xl font-bold text-medical-navy mb-2">
                  Bundle of 3 Packs
                </h3>
                <p class="text-gray-600 text-sm mb-4">
                  6 cooling patches total • Best for families
                </p>
              </div>

              <div class="mb-6">
                <div class="flex items-center justify-center space-x-2 mb-2">
                  <span class="text-2xl font-bold text-red-500 line-through"
                    >PKR 897</span
                  >
                  <span class="text-3xl font-bold text-medical-blue"
                    >PKR 699</span
                  >
                </div>
                <div
                  class="bg-medical-blue text-white px-3 py-1 rounded-full text-sm font-bold inline-block"
                >
                  Save PKR 198 (22% OFF)
                </div>
              </div>

              <button
                class="w-full bg-medical-blue text-white py-3 rounded-lg font-bold hover:bg-medical-navy transition-colors"
              >
                Order Bundle of 3
              </button>
            </div>
          </div>
        </div>

        <!-- Bundle Benefits -->
        <div class="text-center mt-8">
          <div
            class="inline-flex items-center space-x-6 bg-white rounded-lg px-6 py-3 shadow-md"
          >
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <svg
                class="w-4 h-4 text-healthcare-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Free Delivery</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <svg
                class="w-4 h-4 text-healthcare-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Best Value</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <svg
                class="w-4 h-4 text-healthcare-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Limited Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Bye Bye Fever Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2
            class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4"
          >
            Why Choose Bye Bye Fever?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by healthcare professionals and families across Punjab for
            safe, effective fever relief
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Instant Relief -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <div
              class="w-14 h-14 bg-cooling-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-7 h-7 text-cooling-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-medical-navy mb-3">
              Instant Relief
            </h3>
            <p class="text-gray-600 text-sm">
              Works in minutes to provide immediate cooling comfort and
              temperature reduction
            </p>
          </div>

          <!-- Long Lasting -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <div
              class="w-14 h-14 bg-healthcare-green/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-7 h-7 text-healthcare-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-medical-navy mb-3">
              Long Lasting
            </h3>
            <p class="text-gray-600 text-sm">
              Up to 8 hours of continuous cooling relief for extended comfort
              and peace of mind
            </p>
          </div>

          <!-- Safe Formula -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <div
              class="w-14 h-14 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-7 h-7 text-medical-blue"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-medical-navy mb-3">
              Safe Formula
            </h3>
            <p class="text-gray-600 text-sm">
              Safe to use with other medications. Gentle on skin for children
              and adults
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10">
          <h2
            class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4"
          >
            How Bye Bye Fever Works
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple 4-step process for instant cooling relief
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="relative mb-4">
              <div
                class="w-16 h-16 bg-cooling-gradient rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <span class="text-lg font-bold text-medical-navy">1</span>
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 bg-healthcare-orange rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  ></path>
                </svg>
              </div>
            </div>
            <h3 class="text-base font-bold text-medical-navy mb-2">Peel</h3>
            <p class="text-gray-600 text-xs">
              Remove the transparent backing film carefully
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="relative mb-4">
              <div
                class="w-16 h-16 bg-cooling-gradient rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <span class="text-lg font-bold text-medical-navy">2</span>
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 bg-healthcare-green rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                  ></path>
                </svg>
              </div>
            </div>
            <h3 class="text-base font-bold text-medical-navy mb-2">Apply</h3>
            <p class="text-gray-600 text-xs">
              Place on forehead or affected area gently
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="relative mb-4">
              <div
                class="w-16 h-16 bg-cooling-gradient rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <span class="text-lg font-bold text-medical-navy">3</span>
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 bg-cooling-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <h3 class="text-base font-bold text-medical-navy mb-2">Cool</h3>
            <p class="text-gray-600 text-xs">
              Immediate cooling sensation begins instantly
            </p>
          </div>

          <!-- Step 4 -->
          <div class="text-center">
            <div class="relative mb-4">
              <div
                class="w-16 h-16 bg-cooling-gradient rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <span class="text-lg font-bold text-medical-navy">4</span>
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 bg-arizona-yellow rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <h3 class="text-base font-bold text-medical-navy mb-2">Relief</h3>
            <p class="text-gray-600 text-xs">
              Up to 8 hours of continuous cooling comfort
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Results Section -->
    <section class="py-12 bg-cooling-gradient">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div class="text-3xl font-bold text-medical-navy mb-2">10,000+</div>
            <p class="text-medical-blue font-medium">Satisfied Customers</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-medical-navy mb-2">10+</div>
            <p class="text-medical-blue font-medium">Districts in Punjab</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-medical-navy mb-2">95%</div>
            <p class="text-medical-blue font-medium">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      @keyframes scroll {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      .animate-scroll {
        animation: scroll 25s linear infinite;
      }

      .certification-item {
        animation: fadeInOut 4s ease-in-out infinite;
      }

      @keyframes fadeInOut {
        0%,
        100% {
          opacity: 0.7;
          transform: scale(0.95);
        }
        50% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    `,
  ],
})
export class HomeComponent {}
