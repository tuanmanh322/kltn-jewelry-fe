import {Component, OnInit} from '@angular/core';
import {Product} from '../../share/model/product';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ApiService} from '../../share/service/api.service';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})


export class ProductDetailComponent implements OnInit {
  productSaleList: Product[];
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
    private apiService: ApiService
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

}
