import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  constructor() { }

  products = [
    {
      title: 'IELLO King of Tokyo: New Edition Board Game',
      price: '31.43',
      imgURL: 'https://images-na.ssl-images-amazon.com/images/I/81eN66OIlBL._AC_SX522_.jpg',
      productURL: 'https://www.amazon.com/dp/B01F46RPS4/'
    }
  ]

  ngOnInit() {
  }

}
