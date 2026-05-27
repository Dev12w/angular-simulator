import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientConfig } from '../app/interfaces/IGradientConfig';

@Directive({
  selector: '[gradientBorder]',
  standalone: true,
})
export class GradientBorderDirective {

  @Input() GradientConfiguration: IGradientConfig = {};

  private defaultConfig: IGradientConfig = {
    delay: 1000,
    colors: ['#ff0080', '#7928ca', '#2afadf', '#00ff88'],
    thickness: '2px',
  };

  @HostBinding('class.animated-gradient-border') gradientBorder: boolean = false;
  @HostBinding('style.--gradient-colors') gradientColors: string = '';
  @HostBinding('style.--gradient-thickness') gradientThickness: string = '2px';

  timeoutId!: number;

  @HostListener('mouseenter')
  onEnter(): void {
    const saveGradientConfiguration = { ...this.defaultConfig, ...this.GradientConfiguration };

    this.timeoutId = setTimeout(() => {
      this.gradientBorder = true;
      this.gradientColors = saveGradientConfiguration.colors!.join(', ');
      this.gradientThickness = saveGradientConfiguration.thickness!;
    }, saveGradientConfiguration.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    clearTimeout(this.timeoutId);
    this.gradientBorder = false;
    this.gradientColors = '';
    this.gradientThickness = '2px';
  }

}
