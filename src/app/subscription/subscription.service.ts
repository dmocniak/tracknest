import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreatePopupComponent } from "../subscription/createPopup/createPopup.component"

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  private products = [];
  private productsSubject = new Subject();

  private newProdUrl: string = 'old url';

  getProducts() {
    this.http.get<{ message: string, subs: any }>('http://localhost:3000/subscriptions/')
      .subscribe((getResponse) => {
        this.products = getResponse.subs;
        this.productsSubject.next([...this.products]);

      });
  };

  postNewSubscription() {
    const dialogRef = this.dialog.open(CreatePopupComponent, {
      width: '400px',
      data: { productURL: this.newProdUrl }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newProdUrl = result;
    });

    console.log(this.newProdUrl);

  }

  getSubListener() {
    return this.productsSubject.asObservable();
  }

}
