import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../share/service/api.service';
import {Product} from '../../../share/model/product';
import {PRODUCT} from '../../../share/model/jewelry.constant';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  productList: Product[];
  quantity = 1;
  constructor(
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Giỏ hàng');
    if (localStorage.getItem(PRODUCT)){
      this.productList = JSON.parse(localStorage.getItem(PRODUCT));
    }else{
      this.productList.length = 0;
    }

    if (this.productList){
      const arr = this.productList.every(p => p === p.id[1]);
      console.log(arr);
    }
  }
  removeItem(id){
    this.productList.splice(id,1);
    localStorage.setItem(PRODUCT, JSON.stringify(this.productList));
    this.toastr.success('Xoá thành công');
  }
}
