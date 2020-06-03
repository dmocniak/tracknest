import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreatePopupComponent } from "../subscription/createPopup/createPopup.component"
import { SubModel } from "./subscription.model";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  private products: SubModel[] = [];
  private productsSubject = new Subject();

  getProducts() {
    this.http.get<{ message: string, subscriptions: any }>('http://localhost:3000/subscriptions/')
      .pipe(map((getData) => {
        return getData.subscriptions.map(sub => {
          return {
            subID: sub._id,
            title: sub.title,
            curPrice: sub.curPrice,
            ogPrice: sub.ogPrice,
            imgURL: sub.imgURL,
            productURL: sub.productURL
          };
        });
      }))
      .subscribe((getResponse) => {
        this.products = getResponse;
        this.productsSubject.next([...this.products]);

      });
  };

  postNewSubscription() {
    const dialogRef = this.dialog.open(CreatePopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((dialogRes: { productURL: string }) => {

      // handle URL
      if (!dialogRes) {
        console.log('Invalid Dialog Returned');
        return;
      } else if (!dialogRes.productURL.slice(0, 23).includes('amazon.com/')) {
        console.log('Not a valid Amazon.com link');
        return;
      }

      this.http.post<{ message: string, subscription: SubModel }>('http://localhost:3000/subscriptions/', dialogRes)
        .subscribe((postResponse) => {
          console.log(postResponse.message);
          this.products.push(postResponse.subscription);
          this.productsSubject.next([...this.products]);
        });
    });


  }

  removeProduct(id: string) {
    console.log('local delete triggered', id);

    this.http.delete('http://localhost:3000/subscriptions/' + id)
      .subscribe(() => {
        const updatedArr = this.products.filter(sub => sub.subID !== id);
        this.products = updatedArr;
        this.productsSubject.next([...this.products]);
      })
  };

  getSubListener() {
    return this.productsSubject.asObservable();
  }

}
