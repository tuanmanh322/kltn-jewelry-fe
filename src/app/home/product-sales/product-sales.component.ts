import {Component, OnInit} from '@angular/core';
import {Product} from '../../share/model/product';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ApiService} from '../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-sales',
  templateUrl: './product-sales.component.html',
  styleUrls: ['./product-sales.component.css']
})
export class ProductSalesComponent implements OnInit {
  productSaleList: Product[];
  limit: number = 20; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    autoplayTimeout: 2000,
    responsive: {
      0: {
        items: 5
      },
      600: {
        items: 5
      },
      1000: {
        items: 5
      }
    }
  };

  constructor(
    private apiService: ApiService,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.apiService.get('/product/index-sale').subscribe(data => {
      this.productSaleList = data;
    });
  }

  sendCart(product, priceSale){
    const productS ={
      id: product.id,
      price: priceSale,
      imageProduct: product.imageProduct,
      maSp: product.maSp,
      quantity: 1,
      name: product.name
    };
    this.apiService.sendCart(productS);
    this.toast.success('Thêm vào giỏ hàng thành công');
  }

}
