import { Component, NgModule } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../services/order.service';
import { Route, Router } from '@angular/router';
import { TitleComponent } from '../../partials/title/title.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [TitleComponent, OrderItemsListComponent, MapComponent, PaypalButtonComponent],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  order: Order = new Order();
  constructor(orderservice:OrderService, router:Router){
    orderservice.getNewOrderForCurrentUser().subscribe({
      next:(order)=>{
        this.order = order;
      },
      error:()=>{
        router.navigateByUrl('/checkout');
      }
    })
  }
}
