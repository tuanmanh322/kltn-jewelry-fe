import {Component, OnInit} from '@angular/core';
import {PRODUCT} from '../../../share/model/jewelry.constant';
import {Product} from '../../../share/model/product';
import {ApiService} from '../../../share/service/api.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css']
})
export class CartOrderComponent implements OnInit {
  productList: Product[];
  quantity = 1;
  priceTotal = 0;

  orderForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private title: Title,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Đặt hàng');
    this.orderForm = this.fb.group({
      hoten: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      address: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });
    this.fetchData();
  }

  fetchData(): void {
    if (localStorage.getItem(PRODUCT)) {
      this.productList = JSON.parse(localStorage.getItem(PRODUCT));
    } else {
      this.productList.length = 0;
    }
    this.priceTotal = 0;
    this.productList.forEach(pro => {
      this.priceTotal += pro.price * pro.quantity;
    });
  }

  backToCart(): void {
    this.router.navigate(['/cart']);
  }

  onOrder(): void {
    if (this.productList.length === 0) {
      this.toastr.error('Giỏ hàng của bạn rỗng!');
      return;
    }
    if (this.orderForm.valid) {
      const orderm = {
        hoten: this.orderForm.get('hoten').value,
        address: this.orderForm.get('address').value,
        phone: this.orderForm.get('phone').value,
        totalMoney: this.priceTotal
      };
      this.apiService.post('/order/add-cart', orderm).subscribe(data => {
        this.productList.forEach(p => {
          const cart = {
            quantity: p.quantity,
            idProduct: p.id,
            idOrder: data.id
          };
          this.apiService.post('/cart/add-checkout', cart).subscribe(() => {

          });
          this.toastr.success('Đặt hàng thành công');
          localStorage.removeItem(PRODUCT);
        });
        this.router.navigate(['/load-success']);
      });
    }
  }

  get f() {
    return this.orderForm.controls;
  }
}
