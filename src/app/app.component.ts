import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from "./subscription/subscription.service";
import { MatDialog } from '@angular/material/dialog';

import { CreatePopupComponent } from "./subscription/createPopup/createPopup.component";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public subService: SubscriptionService, private router: Router) { }

  title = 'tracknest';
  animal: string;

  ngOnInit() {
    //scrolls to top when navigating
    this.router.events.subscribe((event) => {
      if ((event instanceof NavigationEnd)) {
        window.scrollTo(0, 0)
      }
      return;
    });
  }

  openDialog() {
    this.subService.postNewSubscription();
  }

  onNavigateAccount() {
    const createBTN = document.getElementById('createBTN');
    createBTN.classList.add("hide");
  }

}
