import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  private products = [];
  stubbedProducts = [];
  private productsSubject = new Subject();

  getProducts() {
    this.http.get<{ message: string, subs: any }>('http://localhost:3000/subscriptions/')
      .subscribe((getResponse) => {
        this.products = getResponse.subs;
        this.productsSubject.next([...this.products]);

      });
  };

  getSubListener() {
    return this.productsSubject.asObservable();
  }

}
