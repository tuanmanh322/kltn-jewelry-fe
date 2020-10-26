import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../share/service/api.service';
import {Product} from '../../share/model/product';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {SaleModel} from '../../share/model/sale.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product: Product[];
  sale: SaleModel[];
  saleName = '';

  saleM: SaleModel[];

  constructor(
    private apiService: ApiService,
    private title: Title,
    private toasrt: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.apiService.get('/product/index').subscribe(res => {
      this.product = res;
    });

    this.apiService.get('/sale/all').subscribe(res => {
      this.sale = res;
    });
  }

  addToCart(product) {
    this.apiService.sendCart(product);
    this.toasrt.success('Thêm vào giỏ hàng thành công');
  }


}
