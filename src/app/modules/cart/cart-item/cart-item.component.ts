import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiService} from '../../../share/service/api.service';
import {Product} from '../../../share/model/product';
import {PRODUCT} from '../../../share/model/jewelry.constant';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, OnChanges {
  productList: Product[];
  quantity = 1;
  cartd: Product;
  dataMap = [];
  priceTotal = 0;

  constructor(
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Giỏ hàng');
    this.fetchData();

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.quantity);
  }

  removeItem(id) {
    this.productList.splice(id, 1);
    localStorage.setItem(PRODUCT, JSON.stringify(this.productList));
    this.toastr.success('Xoá thành công');
    this.fetchData();
  }

  getData(p: Product) {
    this.dataMap = this.productList;
    let pot = this.productList.findIndex(pro => pro.id === p.id);
    this.cartd = this.productList.filter(pro => pro.id === p.id)[0];
    const carput: Product = {
      id: this.cartd.id,
      imageProduct: this.cartd.imageProduct,
      price: this.cartd.price,
      name: this.cartd.name,
      quantity: p.quantity,
      maSp: this.cartd.maSp,
      codeSale: this.cartd.codeSale,
      saleName: this.cartd.saleName,
      idSale: this.cartd.idSale,
      createdDate: this.cartd.createdDate,
      description: this.cartd.description,
      idCategory: this.cartd.idCategory,
      idColor: this.cartd.idColor,
      idMark: this.cartd.idMark,
      sellCount: this.cartd.sellCount,
      totalItem: this.cartd.totalItem
    };
    this.productList.splice(pot, 1, carput);
    localStorage.setItem(PRODUCT, JSON.stringify(this.productList));
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

  goToOrder(): void{
    if (this.productList === undefined){
      this.toastr.error('Giỏ hàng của bạn rỗng!');
    }else{
      this.router.navigate(['/order']);
    }
  }


}
