import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Page Header -->
    <section class="bg-medical-gradient py-16 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl lg:text-5xl font-bold font-medical mb-6">Contact Arizona Health Care Products</h1>
          <p class="text-xl text-blue-100 leading-relaxed">
            We're here to help with your healthcare needs. Reach out to our dedicated support team.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <!-- Phone Contact -->
          <div class="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-medical-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-4">Phone Support</h3>
            <p class="text-gray-600 mb-4">Speak directly with our healthcare experts</p>
            <div class="space-y-2">
              <p class="font-bold text-medical-blue">+92-XXX-XXXXXXX</p>
              <p class="text-sm text-gray-500">Monday - Friday: 9AM - 6PM</p>
              <p class="text-sm text-gray-500">Saturday: 9AM - 4PM</p>
            </div>
            <button class="mt-4 bg-medical-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-medical-navy transition-colors">
              Call Now
            </button>
          </div>

          <!-- WhatsApp Contact -->
          <div class="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-healthcare-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-healthcare-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.386"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-4">WhatsApp Support</h3>
            <p class="text-gray-600 mb-4">24/7 instant messaging support</p>
            <div class="space-y-2">
              <p class="font-bold text-healthcare-green">+92-XXX-XXXXXXX</p>
              <p class="text-sm text-gray-500">Available 24/7</p>
              <p class="text-sm text-gray-500">Quick response guaranteed</p>
            </div>
            <button class="mt-4 bg-healthcare-green text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Chat Now
            </button>
          </div>

          <!-- Email Contact -->
          <div class="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-cooling-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-cooling-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-medical-navy mb-4">Email Support</h3>
            <p class="text-gray-600 mb-4">Send us detailed inquiries</p>
            <div class="space-y-2">
              <p class="font-bold text-cooling-600">info@arizonahcp.com</p>
              <p class="text-sm text-gray-500">Response within 24 hours</p>
              <p class="text-sm text-gray-500">Detailed support available</p>
            </div>
            <button class="mt-4 bg-cooling-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold text-medical-navy font-medical mb-8">Send Us a Message</h2>
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="space-y-6">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input type="text" id="firstName" name="firstName" [(ngModel)]="formData.firstName" required
                         class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                         placeholder="Your first name">
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" [(ngModel)]="formData.lastName" required
                         class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                         placeholder="Your last name">
                </div>
              </div>

              <!-- Contact Info -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" [(ngModel)]="formData.email" required
                         class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                         placeholder="your.email@example.com">
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" [(ngModel)]="formData.phone"
                         class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                         placeholder="+92-XXX-XXXXXXX">
                </div>
              </div>

              <!-- Location -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="district" class="block text-sm font-medium text-gray-700 mb-2">District *</label>
                  <select id="district" name="district" [(ngModel)]="formData.district" required
                          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent">
                    <option value="">Select your district</option>
                    <option value="lahore">Lahore</option>
                    <option value="faisalabad">Faisalabad</option>
                    <option value="multan">Multan</option>
                    <option value="rawalpindi">Rawalpindi</option>
                    <option value="gujranwala">Gujranwala</option>
                    <option value="sialkot">Sialkot</option>
                    <option value="sargodha">Sargodha</option>
                    <option value="bahawalpur">Bahawalpur</option>
                    <option value="sheikhupura">Sheikhupura</option>
                    <option value="kasur">Kasur</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select id="subject" name="subject" [(ngModel)]="formData.subject" required
                          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent">
                    <option value="">Select subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-support">Order Support</option>
                    <option value="technical-issue">Technical Issue</option>
                    <option value="distributor">Become a Distributor</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea id="message" name="message" [(ngModel)]="formData.message" required rows="5"
                          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                          placeholder="Please describe your inquiry or how we can help you..."></textarea>
              </div>

              <!-- Newsletter Signup -->
              <div class="flex items-center space-x-3">
                <input type="checkbox" id="newsletter" name="newsletter" [(ngModel)]="formData.newsletter"
                       class="w-4 h-4 text-medical-blue focus:ring-medical-blue border-gray-300 rounded">
                <label for="newsletter" class="text-sm text-gray-700">
                  Subscribe to our newsletter for health tips and product updates
                </label>
              </div>

              <!-- Submit Button -->
              <div>
                <button type="submit" [disabled]="!contactForm.form.valid" 
                        class="w-full bg-medical-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-medical-navy transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                  Send Message
                </button>
                <p class="text-sm text-gray-500 mt-2">
                  We'll respond to your inquiry within 24 hours during business days.
                </p>
              </div>
            </form>
          </div>

          <!-- Office Information -->
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-medical-navy font-medical mb-8">Visit Our Office</h2>
              
              <!-- Office Address -->
              <div class="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 class="text-xl font-bold text-medical-navy mb-4 flex items-center">
                  <svg class="w-6 h-6 mr-3 text-medical-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                  </svg>
                  Head Office
                </h3>
                <div class="space-y-2 text-gray-700">
                  <p class="font-medium">Arizona Health Care Products</p>
                  <p>123 Medical Plaza, Gulberg III</p>
                  <p>Lahore, Punjab 54660</p>
                  <p>Pakistan</p>
                </div>
              </div>

              <!-- Business Hours -->
              <div class="bg-cooling-50 rounded-xl p-6 mb-8">
                <h3 class="text-xl font-bold text-medical-navy mb-4 flex items-center">
                  <svg class="w-6 h-6 mr-3 text-cooling-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  Business Hours
                </h3>
                <div class="space-y-2 text-gray-700">
                  <div class="flex justify-between">
                    <span>Monday - Friday</span>
                    <span class="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Saturday</span>
                    <span class="font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Sunday</span>
                    <span class="font-medium text-gray-500">Closed</span>
                  </div>
                  <div class="pt-3 border-t border-gray-200">
                    <div class="flex justify-between items-center">
                      <span class="text-healthcare-green font-medium">WhatsApp Support</span>
                      <span class="font-bold text-healthcare-green">24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Emergency Contact -->
              <div class="bg-healthcare-orange/10 border border-healthcare-orange/20 rounded-xl p-6">
                <h3 class="text-xl font-bold text-healthcare-orange mb-4 flex items-center">
                  <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  Emergency Medical Consultation
                </h3>
                <p class="text-gray-700 mb-4">
                  For medical emergencies or urgent health concerns, please contact your healthcare provider immediately or call emergency services.
                </p>
                <p class="text-sm text-gray-600 italic">
                  Arizona Health Care Products provides health information and products but is not a substitute for professional medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            Find Us on Map
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Lahore, easily accessible by public transport and private vehicles
          </p>
        </div>

        <!-- Map Placeholder -->
        <div class="bg-white rounded-xl p-8 shadow-lg">
          <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div class="text-center text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-lg font-medium">Interactive Map</p>
              <p class="text-sm">Arizona Health Care Products Office Location</p>
              <p class="text-xs mt-2">Gulberg III, Lahore, Punjab, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick answers to common questions about our products and services
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-6">
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-bold text-medical-navy mb-3">How quickly can I expect a response to my inquiry?</h3>
            <p class="text-gray-700">We respond to all inquiries within 24 hours during business days. For urgent matters, please use our WhatsApp support which is available 24/7.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-bold text-medical-navy mb-3">Do you offer bulk pricing for healthcare facilities?</h3>
            <p class="text-gray-700">Yes! We offer special pricing for hospitals, clinics, pharmacies, and other healthcare facilities. Please contact us with your requirements for a custom quote.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-bold text-medical-navy mb-3">Can I become a distributor for Arizona Health Care Products?</h3>
            <p class="text-gray-700">We're always looking for reliable distributors across Pakistan. Please fill out the contact form with "Become a Distributor" as the subject, and we'll send you our distributor information package.</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-bold text-medical-navy mb-3">What areas do you currently serve?</h3>
            <p class="text-gray-700">We currently serve 10 major districts across Punjab: Lahore, Faisalabad, Multan, Rawalpindi, Gujranwala, Sialkot, Sargodha, Bahawalpur, Sheikhupura, and Kasur. We're expanding to other regions soon.</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    district: "",
    subject: "",
    message: "",
    newsletter: false,
  };

  onSubmit() {
    console.log("Form submitted:", this.formData);
    // Here you would typically send the form data to your backend
    alert("Thank you for your message! We will respond within 24 hours.");

    // Reset form
    this.formData = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      district: "",
      subject: "",
      message: "",
      newsletter: false,
    };
  }
}
