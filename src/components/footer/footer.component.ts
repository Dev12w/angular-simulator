import { Component } from '@angular/core';
import { faTelegram, faVk, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  imports: [
    FaIconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  telegram: IconDefinition = faTelegram;
  vk: IconDefinition = faVk;
  pinterest: IconDefinition = faPinterest;
  skype: IconDefinition = faSkype;

}
