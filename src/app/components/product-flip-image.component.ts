import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-flip-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-64 group perspective-1000">
      <div class="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
        <!-- Front Image -->
        <div class="absolute inset-0 w-full h-full backface-hidden">
          <img 
            [src]="frontImage" 
            [alt]="altText + ' - Front'" 
            class="w-full h-full object-contain rounded-lg shadow-lg"
          >
        </div>
        
        <!-- Back Image -->
        <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <img 
            [src]="backImage" 
            [alt]="altText + ' - Back'" 
            class="w-full h-full object-contain rounded-lg shadow-lg"
          >
        </div>
      </div>
    </div>
  `,
  styles: [`
    .perspective-1000 {
      perspective: 1000px;
    }
    
    .transform-style-preserve-3d {
      transform-style: preserve-3d;
    }
    
    .backface-hidden {
      backface-visibility: hidden;
    }
    
    .rotate-y-180 {
      transform: rotateY(180deg);
    }
    
    .group:hover .group-hover\\:rotate-y-180 {
      transform: rotateY(180deg);
    }
  `]
})
export class ProductFlipImageComponent {
  @Input() frontImage: string = '';
  @Input() backImage: string = '';
  @Input() altText: string = 'Product Image';
}
