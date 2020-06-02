import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from "../subscription.service";
import { Subscription } from 'rxjs';
import { stubbedSubscriptions } from "../stubbed-subscriptions";

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  constructor(public subService: SubscriptionService) { }

  useStubbedData = true;

  products = [];
  subSubscription: Subscription;

  ngOnInit() {
    if (!this.useStubbedData) {
      this.subService.getProducts();
      this.subService.getSubListener().subscribe((products: []) => { this.products = products });
    } else {
      console.log(stubbedSubscriptions);

      this.products = stubbedSubscriptions;
    }

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
