import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    TitleComponent, 
    TextInputComponent, 
    ReactiveFormsModule, 
    OrderItemsListComponent,
    MapComponent
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit{

  order: Order = new Order();
  checkoutForn!: FormGroup;
  constructor(
    cartservice: CartService, 
    private formBuilder:FormBuilder, 
    private userservice:UserService,          //for default name and address of the user
    private toastrservice:ToastrService,
    private orderservice:OrderService,
    private router:Router
  ) {
    const cart = cartservice.getCart();   //we dont use observable bcoz we only want the latest value there
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }
  ngOnInit(): void {
    //initial value of form should not be empty
    let {name, address} = this.userservice.currentUser;
    this.checkoutForn = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    })
  }
  get fc(){
    return this.checkoutForn.controls;
  }

  createOrder(){
    if(this.checkoutForn.invalid){
      this.toastrservice.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    if(!this.order.addressLatLng){
      this.toastrservice.warning('Please select your location on the map', 'Location');
      return  //if the location on the map is selected, go to the next step
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderservice.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payment-page');
      },
      error:(errRes)=>{     
        this.toastrservice.error(errRes.error, 'Cart');
      }
    })
  }
}