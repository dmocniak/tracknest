import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from "../subscription.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  constructor(public subService: SubscriptionService) { }

  products = [];
  subSubscription: Subscription;

  ngOnInit() {
    this.subService.getProducts();
    this.subService.getSubListener().subscribe((products: []) => { this.products = products });
  }

  gotoPage(url) {
    window.open(url, '_blank');
  }

  getSalePercentage(curPrice, ogPrice) {
    const currentPrice = parseFloat(curPrice)
    const originalPrice = parseFloat(ogPrice)
    const percentage = parseFloat(((originalPrice - currentPrice) / originalPrice * 100).toFixed(0))
    return percentage ? `-${percentage}%` : 'Not on Sale'
  }


}
