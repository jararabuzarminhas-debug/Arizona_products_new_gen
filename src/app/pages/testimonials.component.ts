import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Page Header -->
    <section class="bg-medical-gradient py-16 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl lg:text-5xl font-bold font-medical mb-6">
            Customer Testimonials
          </h1>
          <p class="text-xl text-blue-100 leading-relaxed">
            Real stories from real customers across Punjab, Pakistan
          </p>
          <div class="flex items-center justify-center space-x-4 mt-8">
            <div class="flex text-arizona-yellow text-3xl">
              <span>★★★★★</span>
            </div>
            <div class="text-left">
              <p class="text-2xl font-bold">4.8 out of 5</p>
              <p class="text-blue-100">Based on 250+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Options -->
    <section class="py-8 bg-gray-50 border-b">
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <!-- Product Filter -->
          <div class="flex flex-wrap gap-2">
            <button
              *ngFor="let filter of productFilters; let i = index"
              (click)="activeProductFilter = i"
              [class.active]="activeProductFilter === i"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
              [ngClass]="
                activeProductFilter === i
                  ? 'bg-medical-blue text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              "
            >
              {{ filter.label }}
            </button>
          </div>

          <!-- Rating Filter -->
          <div class="flex items-center space-x-4">
            <span class="text-sm font-medium text-gray-700"
              >Filter by rating:</span
            >
            <select
              [(ngModel)]="selectedRating"
              (ngModelChange)="filterTestimonials()"
              class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>

          <!-- Sort Options -->
          <div class="flex items-center space-x-4">
            <span class="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              [(ngModel)]="sortOption"
              (ngModelChange)="sortTestimonials()"
              class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-medical-navy mb-2">250+</div>
            <p class="text-gray-600">Total Reviews</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-healthcare-green mb-2">95%</div>
            <p class="text-gray-600">5-Star Reviews</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-cooling-600 mb-2">4.8</div>
            <p class="text-gray-600">Average Rating</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-arizona-orange mb-2">98%</div>
            <p class="text-gray-600">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Testimonials -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl font-bold text-medical-navy font-medical text-center mb-12"
        >
          Featured Customer Stories
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <!-- Featured Testimonial 1 -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg border-l-4 border-medical-blue"
          >
            <div class="flex items-center mb-6">
              <img
                src="/api/placeholder/80/80"
                alt="Customer"
                class="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 class="text-xl font-bold text-medical-navy">
                  Dr. Ayesha Rahman
                </h3>
                <p class="text-medical-blue font-medium">
                  Pediatrician, Lahore
                </p>
                <div class="flex items-center space-x-2 mt-1">
                  <div class="flex text-arizona-yellow">
                    <span>★★★★★</span>
                  </div>
                  <span class="text-sm text-gray-500">• 2 months ago</span>
                </div>
              </div>
            </div>
            <blockquote
              class="text-gray-700 italic text-lg leading-relaxed mb-4"
            >
              "As a pediatrician, I recommend Bye Bye Fever to all my patients'
              families. It's safe, effective, and provides real relief. The fact
              that it's FDA approved gives both me and parents peace of mind.
              I've seen children sleep comfortably through the night thanks to
              these patches."
            </blockquote>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2 text-sm text-gray-500">
                <span>Used for:</span>
                <span
                  class="bg-cooling-100 text-cooling-700 px-2 py-1 rounded text-xs"
                  >Pediatric Fever Relief</span
                >
              </div>
              <div class="flex space-x-2">
                <span>😊</span>
                <span>👍</span>
                <span>🙏</span>
              </div>
            </div>
          </div>

          <!-- Featured Testimonial 2 -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg border-l-4 border-healthcare-green"
          >
            <div class="flex items-center mb-6">
              <img
                src="/api/placeholder/80/80"
                alt="Customer"
                class="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 class="text-xl font-bold text-medical-navy">Amira Malik</h3>
                <p class="text-healthcare-green font-medium">
                  Mother of 3, Faisalabad
                </p>
                <div class="flex items-center space-x-2 mt-1">
                  <div class="flex text-arizona-yellow">
                    <span>★★★★★</span>
                  </div>
                  <span class="text-sm text-gray-500">• 1 month ago</span>
                </div>
              </div>
            </div>
            <blockquote
              class="text-gray-700 italic text-lg leading-relaxed mb-4"
            >
              "With three children, fever nights used to be a nightmare for our
              family. Bye Bye Fever has been a game-changer! Last month when all
              three kids had fever, these patches helped them rest peacefully. I
              keep a box in our medicine cabinet at all times now."
            </blockquote>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2 text-sm text-gray-500">
                <span>Family size:</span>
                <span
                  class="bg-healthcare-green/10 text-healthcare-green px-2 py-1 rounded text-xs"
                  >3 Children</span
                >
              </div>
              <div class="flex space-x-2">
                <span>❤️</span>
                <span>💯</span>
                <span>🏆</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Testimonials -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl font-bold text-medical-navy font-medical text-center mb-12"
        >
          All Customer Reviews
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            *ngFor="let testimonial of filteredTestimonials"
            class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <!-- Customer Info -->
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                [ngClass]="testimonial.avatarColor"
              >
                <span class="text-white font-bold">{{
                  testimonial.initials
                }}</span>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-medical-navy">
                  {{ testimonial.name }}
                </h4>
                <p class="text-sm text-gray-600">{{ testimonial.location }}</p>
                <div class="flex items-center space-x-2 mt-1">
                  <div class="flex text-arizona-yellow text-sm">
                    <span>{{ getStarRating(testimonial.rating) }}</span>
                  </div>
                  <span class="text-xs text-gray-500"
                    >• {{ testimonial.timeAgo }}</span
                  >
                </div>
              </div>
              <div
                *ngIf="testimonial.verified"
                class="bg-healthcare-green text-white px-2 py-1 rounded text-xs font-bold"
              >
                Verified
              </div>
            </div>

            <!-- Review Text -->
            <p class="text-gray-700 italic mb-4 leading-relaxed">
              {{ testimonial.review }}
            </p>

            <!-- Product Used -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2 text-sm text-gray-500">
                <span>Product:</span>
                <span
                  class="bg-medical-blue/10 text-medical-blue px-2 py-1 rounded text-xs"
                  >{{ testimonial.product }}</span
                >
              </div>
              <div class="flex space-x-1 text-lg">
                <span *ngFor="let emoji of testimonial.emojis">{{
                  emoji
                }}</span>
              </div>
            </div>

            <!-- Helpful Actions -->
            <div
              class="flex items-center justify-between pt-3 border-t border-gray-200"
            >
              <button
                class="flex items-center space-x-2 text-sm text-gray-500 hover:text-medical-blue transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                  ></path>
                </svg>
                <span>Helpful ({{ testimonial.helpfulCount }})</span>
              </button>
              <span class="text-xs text-gray-400">{{ testimonial.date }}</span>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-12">
          <button
            class="bg-medical-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-medical-navy transition-colors"
          >
            Load More Reviews
          </button>
        </div>
      </div>
    </section>

    <!-- Submit Review CTA -->
    <section class="py-16 bg-cooling-gradient">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2
            class="text-3xl lg:text-4xl font-bold text-medical-navy font-medical mb-6"
          >
            Share Your Experience
          </h2>
          <p class="text-lg text-gray-700 mb-8">
            Help other families by sharing your experience with Arizona Health
            Care Products
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="bg-medical-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-medical-navy transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Write a Review
            </button>
            <button
              class="border-2 border-medical-blue text-medical-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-medical-blue hover:text-white transition-all duration-200"
            >
              Upload Photo Review
            </button>
          </div>
          <p class="text-sm text-gray-600 mt-4">
            * Only verified customers can submit reviews
          </p>
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsComponent implements OnInit {
  activeProductFilter = 0;
  selectedRating = "";
  sortOption = "newest";

  productFilters = [
    { label: "All Products", value: "all" },
    { label: "Bye Bye Fever", value: "bye-bye-fever" },
    { label: "Upcoming Products", value: "upcoming" },
  ];

  testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      initials: "SA",
      location: "Lahore",
      rating: 5,
      review:
        "Absolutely amazing product! My daughter had high fever and this worked exactly as promised. 8 hours of relief and she slept peacefully through the night. Highly recommend to all parents!",
      product: "Bye Bye Fever",
      emojis: ["😊", "👍", "❤️"],
      timeAgo: "2 weeks ago",
      date: "January 15, 2024",
      verified: true,
      helpfulCount: 24,
      avatarColor: "bg-medical-blue",
    },
    {
      id: 2,
      name: "Muhammad Hassan",
      initials: "MH",
      location: "Faisalabad",
      rating: 5,
      review:
        "Very safe to use with other medicines. Great for both kids and adults. No side effects noticed. Will definitely order again for our family. Fast delivery too!",
      product: "Bye Bye Fever",
      emojis: ["💯", "🙏"],
      timeAgo: "1 month ago",
      date: "December 28, 2023",
      verified: true,
      helpfulCount: 18,
      avatarColor: "bg-healthcare-green",
    },
    {
      id: 3,
      name: "Fatima Khan",
      initials: "FK",
      location: "Multan",
      rating: 5,
      review:
        "Easy to apply and instant cooling effect. My elderly father loves these patches. No side effects and works exactly as described. Great value for money!",
      product: "Bye Bye Fever",
      emojis: ["😍", "💯"],
      timeAgo: "3 weeks ago",
      date: "January 8, 2024",
      verified: true,
      helpfulCount: 31,
      avatarColor: "bg-cooling-600",
    },
    {
      id: 4,
      name: "Ahmed Ali",
      initials: "AA",
      location: "Rawalpindi",
      rating: 4,
      review:
        "Good product overall. Helped with my son's fever during the night. Takes about 15-20 minutes to feel the cooling effect but then works well for hours.",
      product: "Bye Bye Fever",
      emojis: ["👍", "😊"],
      timeAgo: "1 week ago",
      date: "January 22, 2024",
      verified: true,
      helpfulCount: 12,
      avatarColor: "bg-arizona-orange",
    },
    {
      id: 5,
      name: "Aisha Begum",
      initials: "AB",
      location: "Gujranwala",
      rating: 5,
      review:
        "Fantastic! As a mother of twins, these patches have been a lifesaver during fever episodes. Both children can use them safely and sleep better.",
      product: "Bye Bye Fever",
      emojis: ["❤️", "🙏", "👶"],
      timeAgo: "2 months ago",
      date: "November 20, 2023",
      verified: true,
      helpfulCount: 42,
      avatarColor: "bg-medical-blue",
    },
    {
      id: 6,
      name: "Dr. Tariq Mehmood",
      initials: "TM",
      location: "Sialkot",
      rating: 5,
      review:
        "As a family physician, I recommend this to my patients. FDA approved, safe ingredients, and effective cooling. Parents are always grateful for this recommendation.",
      product: "Bye Bye Fever",
      emojis: ["🏥", "👨‍⚕️", "💯"],
      timeAgo: "3 months ago",
      date: "October 15, 2023",
      verified: true,
      helpfulCount: 67,
      avatarColor: "bg-healthcare-green",
    },
    {
      id: 7,
      name: "Zainab Malik",
      initials: "ZM",
      location: "Sargodha",
      rating: 4,
      review:
        "Works well for mild to moderate fever. The cooling sensation is immediate and comforting. I keep these in my first aid kit now.",
      product: "Bye Bye Fever",
      emojis: ["😌", "👍"],
      timeAgo: "1 month ago",
      date: "December 18, 2023",
      verified: true,
      helpfulCount: 15,
      avatarColor: "bg-cooling-600",
    },
    {
      id: 8,
      name: "Usman Ghani",
      initials: "UG",
      location: "Bahawalpur",
      rating: 5,
      review:
        "Excellent customer service and fast delivery to Bahawalpur. Product quality is top-notch. My whole family uses these patches when needed.",
      product: "Bye Bye Fever",
      emojis: ["🚚", "⭐", "👨‍👩‍👧‍👦"],
      timeAgo: "2 weeks ago",
      date: "January 12, 2024",
      verified: true,
      helpfulCount: 20,
      avatarColor: "bg-arizona-orange",
    },
    {
      id: 9,
      name: "Nadia Sheikh",
      initials: "NS",
      location: "Sheikhupura",
      rating: 5,
      review:
        "Been using for 6 months now. Never disappoints! Safe for my 2-year-old and works for adults too. The 8-hour relief claim is accurate.",
      product: "Bye Bye Fever",
      emojis: ["⏰", "💝", "😊"],
      timeAgo: "4 weeks ago",
      date: "December 30, 2023",
      verified: true,
      helpfulCount: 28,
      avatarColor: "bg-medical-blue",
    },
  ];

  filteredTestimonials = [...this.testimonials];

  ngOnInit() {
    this.filterTestimonials();
  }

  filterTestimonials() {
    let filtered = [...this.testimonials];

    // Filter by rating
    if (this.selectedRating) {
      const minRating = parseInt(this.selectedRating);
      filtered = filtered.filter((t) => t.rating >= minRating);
    }

    // Filter by product
    const activeFilter = this.productFilters[this.activeProductFilter];
    if (activeFilter.value !== "all") {
      filtered = filtered.filter((t) =>
        t.product.toLowerCase().includes(activeFilter.value.replace("-", " ")),
      );
    }

    this.filteredTestimonials = filtered;
    this.sortTestimonials();
  }

  sortTestimonials() {
    switch (this.sortOption) {
      case "newest":
        this.filteredTestimonials.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        this.filteredTestimonials.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "highest":
        this.filteredTestimonials.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        this.filteredTestimonials.sort((a, b) => a.rating - b.rating);
        break;
    }
  }

  getStarRating(rating: number): string {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }
}
