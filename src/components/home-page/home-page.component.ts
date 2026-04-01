import { Component, inject } from '@angular/core';
import { galleryImages } from "../../app/gallery-images";
import { IPicture } from "../../app/interfaces/IPicture";
import { MessageService } from "../../app/services/message.service";
import { popularCards } from "../../app/popular-cards";
import { ICard } from "../../app/interfaces/ICard";
import { travelCards } from "../../app/travel-cards";
import { pictures } from "../../app/pictures";
import { IOffer } from "../../app/interfaces/IOffer";
import { offers } from '../../app/offers';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);

  pictures: IPicture[] = pictures;
  galleryImages: IPicture[] = galleryImages;
  offers: IOffer[] = offers;
  populars: ICard[] = popularCards;
  travels: ICard[] = travelCards;

}
