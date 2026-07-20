import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[boldHover]',
})
export class BoldHoverDirective {

  @HostBinding('style.font-weight') fontWeight: string = 'normal';

  @HostListener('mouseenter')
  onEnter(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.fontWeight = 'normal';
  }

}
