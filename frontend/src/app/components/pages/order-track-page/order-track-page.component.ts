import { Component } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { TitleComponent } from '../../partials/title/title.component';

@Component({
  selector: 'app-order-track-page',
  standalone: true,
  imports: [CommonModule, OrderItemsListComponent, MapComponent, TitleComponent],
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.css'
})
export class OrderTrackPageComponent {
  order!:Order;
  // we get order id from ActivatedRoute
  //we  get order from server by orderservice
  constructor(activatedRoute:ActivatedRoute, orderservice:OrderService){
    const params = activatedRoute.snapshot.params;
    if(!params.orderId) return;

    orderservice.trackOrderById(params.orderId).subscribe(order =>{      
      this.order = order;
    })
  }
}
