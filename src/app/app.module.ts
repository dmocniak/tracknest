import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatIconModule, MatDialogModule } from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { CreatePopupComponent } from "./subscription/createPopup/createPopup.component";
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionListComponent,
    CreatePopupComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule
  ],
  entryComponents: [
    CreatePopupComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
