import { Component, inject } from '@angular/core';
import { galleryImages } from "../../app/gallery-images";
import { IPicture } from "../../app/interfaces/IPicture";
import { MessageService } from "../../app/services/message.service";
import { Message } from "../../enums/Message";
import { popularCards } from "../../app/popular-cards";
import { ICard } from "../../app/interfaces/ICard";
import { travelCards } from "../../app/travel-cards";
import { galleryPictures } from "../../app/gallary-pictures";
import { IOffer } from "../../app/interfaces/IOffer";
import { offers } from '../../app/offers';

// import { Message } from '../message/message.component'

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);
  galleryPictures: IPicture[] = galleryPictures;
  galleryImages: IPicture[] = galleryImages;

  messageType: typeof Message = Message;
  offers: IOffer[] = offers;


  populars: ICard[] = popularCards;
  travels: ICard[] = travelCards;
}
