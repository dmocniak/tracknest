import { Component } from '@angular/core';
import { SubscriptionService } from "./subscription/subscription.service";
import { MatDialog } from '@angular/material/dialog';

import { CreatePopupComponent } from "./subscription/createPopup/createPopup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public subService: SubscriptionService) { }

  title = 'tracknest';
  animal: string;

  openDialog() {
    this.subService.postNewSubscription();
  }

}
