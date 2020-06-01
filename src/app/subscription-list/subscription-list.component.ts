import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  // (click)="gotoPage(productTitle)"

  constructor() { }

  products = [
    {
      title: 'IELLO King of Tokyo: New Edition Board Game',
      curPrice: '20.00',
      ogPrice: '31.43',
      imgURL: 'https://images-na.ssl-images-amazon.com/images/I/81eN66OIlBL._AC_SX522_.jpg',
      productURL: 'https://www.amazon.com/dp/B01F46RPS4/'
    },
    {
      title: 'Self-Leveling 360-Degree Cross Line Laser',
      curPrice: '89.99',
      ogPrice: '89.99',
      imgURL: 'https://images-na.ssl-images-amazon.com/images/I/41ldFW%2BuWHL._AC_.jpg',
      productURL: 'https://www.amazon.com/dp/B00OZHIMBS/'
    },
    {
      title: 'POWERBLOCK Exp Stage 2 Expansion Kit, Black/Red, 20 lb',
      curPrice: 'Unavailable',
      ogPrice: 'Unavailable',
      imgURL: 'https://images-na.ssl-images-amazon.com/images/I/71LqGvah%2BpL._AC_SX679_.jpg',
      productURL: 'https://www.amazon.com/dp/B006RJ6VJW/'
    }
  ];

  gotoPage(url) {
    window.open(url, '_blank');
  }

  getSalePercentage(curPrice, ogPrice) {
    const currentPrice = parseFloat(curPrice)
    const originalPrice = parseFloat(ogPrice)
    const percentage = parseFloat(((originalPrice - currentPrice) / originalPrice * 100).toFixed(0))
    return percentage ? `-${percentage}%` : 'Not on Sale'
  }

  ngOnInit() {
  }

}
