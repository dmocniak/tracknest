import { Component, OnInit, HostListener } from '@angular/core';
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

  openDialog() {
    this.subService.postNewSubscription();
  }

  onRemove(id: string) {
    console.log('sub-list id = ', id);

    this.subService.removeProduct(id);
  };

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event) {
    const createBTN = document.getElementById('createBTN');
    if (window.pageYOffset >= 54) {
      createBTN.classList.remove("hide");
    } else if (window.pageYOffset < 54) {
      createBTN.classList.add("hide");
    }
  }


}
