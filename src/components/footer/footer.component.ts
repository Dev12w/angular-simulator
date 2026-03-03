import { Component } from '@angular/core';
import { IPicture } from "../../app/interfaces/IPicture";
import { galleryIcons } from "../../app/gallery-icons";

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  galleryIcons: IPicture[] = galleryIcons;

}
