import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <!-- Page Header -->
    <section class="bg-medical-gradient py-16 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl lg:text-5xl font-bold font-medical mb-6">About Arizona Health Care Products</h1>
          <p class="text-xl text-blue-100 leading-relaxed">
            Dedicated to providing trusted healthcare solutions across Punjab, Pakistan since our establishment.
          </p>
        </div>
      </div>
    </section>

    <!-- Company Story -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-medical-navy font-medical mb-6">Our Story</h2>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Arizona Health Care Products was founded with a mission to make quality healthcare accessible to families across Punjab, Pakistan. We recognized the need for reliable, FDA-approved healthcare products that families could trust.
            </p>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Starting with our flagship product, Bye Bye Fever cooling patches, we have built a reputation for safety, efficacy, and exceptional customer service. Our products undergo rigorous quality control and meet international healthcare standards.
            </p>
            <p class="text-gray-700 leading-relaxed">
              Today, we proudly serve 10 major districts across Punjab, providing families with healthcare solutions they can rely on during times of need.
            </p>
          </div>
          <div class="relative">
            <div class="bg-cooling-gradient rounded-2xl p-8">
              <img src="/api/placeholder/500/400" alt="Arizona Health Care Products Office" class="rounded-xl shadow-lg w-full">
            </div>
            <!-- Stats Overlay -->
            <div class="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
              <div class="text-center">
                <div class="text-2xl font-bold text-medical-navy">10,000+</div>
                <div class="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision & Values -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            Our Mission, Vision & Values
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Mission -->
          <div class="bg-white rounded-xl p-8 text-center shadow-lg">
            <div class="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-medical-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-4">Our Mission</h3>
            <p class="text-gray-600">
              To provide safe, effective, and affordable healthcare products that improve the quality of life for families across Punjab, Pakistan.
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-white rounded-xl p-8 text-center shadow-lg">
            <div class="w-16 h-16 bg-healthcare-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-healthcare-green" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-4">Our Vision</h3>
            <p class="text-gray-600">
              To become Pakistan's most trusted healthcare products company, expanding our reach while maintaining the highest quality standards.
            </p>
          </div>

          <!-- Values -->
          <div class="bg-white rounded-xl p-8 text-center shadow-lg">
            <div class="w-16 h-16 bg-cooling-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-cooling-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-4">Our Values</h3>
            <p class="text-gray-600">
              Safety first, quality assured, customer-focused, and community-driven healthcare solutions for every family.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            Our Leadership Team
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Experienced healthcare professionals dedicated to improving health outcomes across Pakistan
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- CEO -->
          <div class="text-center">
            <div class="relative mb-6">
              <img src="/api/placeholder/200/200" alt="CEO" class="w-32 h-32 rounded-full mx-auto object-cover shadow-lg">
              <div class="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-2">Muhammad Azeem</h3>
            <p class="text-medical-blue font-medium mb-3">Chief Executive Officer</p>
            <p class="text-gray-600 text-sm">15+ years in healthcare industry, passionate about accessible healthcare solutions</p>
          </div>

          <!-- Medical Director -->
          <div class="text-center">
            <div class="relative mb-6">
              <img src="/api/placeholder/200/200" alt="Medical Director" class="w-32 h-32 rounded-full mx-auto object-cover shadow-lg">
              <div class="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-8 h-8 bg-healthcare-green rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524 9.026 9.026 0 01-1 .8z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-2">Dr. Fatima Khan</h3>
            <p class="text-medical-blue font-medium mb-3">Medical Director</p>
            <p class="text-gray-600 text-sm">MBBS, certified in pharmaceutical regulations and medical device safety</p>
          </div>

          <!-- Operations Manager -->
          <div class="text-center">
            <div class="relative mb-6">
              <img src="/api/placeholder/200/200" alt="Operations Manager" class="w-32 h-32 rounded-full mx-auto object-cover shadow-lg">
              <div class="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-8 h-8 bg-cooling-600 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-2">Ahmed Hassan</h3>
            <p class="text-medical-blue font-medium mb-3">Operations Manager</p>
            <p class="text-gray-600 text-sm">Expert in supply chain management and quality assurance in healthcare</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications & Compliance -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            Certifications & Compliance
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            We maintain the highest standards of quality and safety through rigorous certifications and compliance protocols
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-medical-blue rounded-xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-lg">FDA</span>
            </div>
            <h3 class="font-bold text-medical-navy mb-2">FDA Approved</h3>
            <p class="text-sm text-gray-600">Food and Drug Administration certified products</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-healthcare-green rounded-xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-lg">ISO</span>
            </div>
            <h3 class="font-bold text-medical-navy mb-2">ISO Certified</h3>
            <p class="text-sm text-gray-600">International quality management standards</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-arizona-orange rounded-xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-lg">GMP</span>
            </div>
            <h3 class="font-bold text-medical-navy mb-2">GMP Compliant</h3>
            <p class="text-sm text-gray-600">Good Manufacturing Practice standards</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-medical-navy rounded-xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-lg">DRAP</span>
            </div>
            <h3 class="font-bold text-medical-navy mb-2">DRAP Licensed</h3>
            <p class="text-sm text-gray-600">Drug Regulatory Authority Pakistan approved</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Coverage Area -->
  <section class="py-16 bg-cooling-gradient">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
          Our Service Areas
        </h2>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          Currently serving 10 major districts across Punjab with plans for expansion
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Lahore</h3>
          <p class="text-sm text-gray-600">Main Hub</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Faisalabad</h3>
          <p class="text-sm text-gray-600">Industrial City</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Multan</h3>
          <p class="text-sm text-gray-600">Southern Punjab</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Rawalpindi</h3>
          <p class="text-sm text-gray-600">Twin City</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Gujranwala</h3>
          <p class="text-sm text-gray-600">Industrial Zone</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Sialkot</h3>
          <p class="text-sm text-gray-600">Export Hub</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Sargodha</h3>
          <p class="text-sm text-gray-600">Agricultural Center</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Bahawalpur</h3>
          <p class="text-sm text-gray-600">South Region</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Sheikhupura</h3>
          <p class="text-sm text-gray-600">Rural Access</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h3 class="font-bold text-medical-navy">Kasur</h3>
          <p class="text-sm text-gray-600">Border District</p>
        </div>
      </div>
    </div>
  </section>
  `
})
export class AboutComponent {}
