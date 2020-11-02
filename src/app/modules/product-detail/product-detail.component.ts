import {Component, OnInit} from '@angular/core';
import {Product} from '../../share/model/product';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ApiService} from '../../share/service/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {ProductDetailModel} from '../../share/model/product-detail.model';

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

  productDetail: ProductDetailModel;
  nameProduct = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private title: Title,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      const id = data.id;
      this.apiService.get('/product/detail/' + id).subscribe(res => {
        this.productDetail = res;
        this.nameProduct = this.productDetail.name;
        this.title.setTitle(this.nameProduct);
        this.fetchDataRelative(this.productDetail);
      });
    });
  }

  fetchDataRelative(productDetail: ProductDetailModel) {
    const product = {
      idSale: productDetail.idSale,
      idColor: productDetail.idColor,
      idCategory: productDetail.idCategory,
      idMark: productDetail.idMark
    };
    this.apiService.post('/product/relative', product).subscribe(data => {
      this.productSaleList = data;
    });
  }

  addToCart() {
    const productS = {
      id: this.productDetail.id,
      price: this.productDetail.price,
      imageProduct: this.productDetail.imageProduct,
      maSp: this.productDetail.maSp,
      quantity: 1,
      name: this.productDetail.name
    };
    if (this.productDetail.codeSale) {
      productS.price = this.productDetail.price - (this.productDetail.price * this.productDetail.codeSale);
    }
    this.apiService.sendCart(productS);
    this.toastr.success('Đã thêm sản phẩm vào giỏ hàng');
  }

  moveToOrder() {
    const productS = {
      id: this.productDetail.id,
      price: this.productDetail.price,
      imageProduct: this.productDetail.imageProduct,
      maSp: this.productDetail.maSp,
      quantity: 1,
      name: this.productDetail.name
    };
    if (this.productDetail.codeSale) {
      productS.price = this.productDetail.price - (this.productDetail.price * this.productDetail.codeSale);
    }
    this.apiService.sendCart(productS);
    this.router.navigate(['/order', {data: this.productDetail.id}]);
  }

}
