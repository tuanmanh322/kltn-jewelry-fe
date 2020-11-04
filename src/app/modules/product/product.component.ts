import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChangeContext, LabelType, Options, PointerType} from 'ng5-slider';
import {FormControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../share/service/api.service';
import {ProductSearchModel} from '../../share/model/product-search.model';
import {Order} from '../../share/model/order';
import {CategoryModel} from '../../share/model/category.model';
import {SaleModel} from '../../share/model/sale.model';
import {TradeMarkModel} from '../../share/model/trade-mark.model';
import {ColorModel} from '../../share/model/color.model';
import {ProductSearchDetail} from '../../share/model/product-search-detail';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('checkboxcate') checkbox: ElementRef;

  control: FormControl = new FormControl([0, 20000000]);
  options: Options = {
    floor: 0,
    ceil: 20000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + 'đ';
        case LabelType.High:
          return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + 'đ';
        default:
          return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + 'đ';
      }
    }
  };
  order: Order = {
    ascending: true,
    property: ''
  };
  idColorList: number[] = [];
  idCateList: number[] = [];
  idMarkList: number[] = [];
  idSaleList: number[] = [];
  productSearch: ProductSearchModel = {
    idCategory: [],
    idColor: [],
    idMark: [],
    idSale: [],
    name: '',
    orders: [],
    page: 0,
    pageSize: 9,
    totalRecords: 0,
    priceFirst: null,
    priceSecond: null
  };
  priceLow = 0;
  priceMax = 0;

  productList: ProductSearchDetail[];
  categoryList: CategoryModel[];
  saleList: SaleModel[];
  tradeMarkList: TradeMarkModel[];
  colorList: ColorModel[];
  totalItem = 0;
  cateId = 0;

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Trang sức');
    this.productSearch.idSale = [];
    this.productSearch.idMark = [];
    this.productSearch.idColor = [];
    this.productSearch.idCategory = [];
    this.apiService.get('/category/all').subscribe(data => {
      this.categoryList = data;
    });
    this.apiService.get('/color/all').subscribe(data => {
      this.colorList = data;
    });
    this.apiService.get('/trade/all').subscribe(data => {
      this.tradeMarkList = data;
    });
    this.apiService.get('/sale/all').subscribe(data => {
      this.saleList = data;
    });
    this.apiService.cate.subscribe(data => {
      this.productSearch.idCategory.push(data);
      this.cateId = data;

    });
    this.fetchData();
  }

  onUserChange(changeContext: ChangeContext): void {
    this.priceLow = changeContext.value;
    this.priceMax = changeContext.highValue;
    this.productSearch.priceFirst = this.priceLow;
    this.productSearch.priceSecond = this.priceMax;
    setTimeout(() => {
      this.fetchData();
    }, 1000);
  }

  fetchData(): void {
    this.apiService.post('/product/search', this.productSearch).subscribe(data => {
      this.productSearch = data;
      this.productList = this.productSearch.data;
      this.totalItem = this.productSearch.totalRecords;
    });
  }

  searhProduct() {
    this.productSearch.page = 0;
    this.fetchData();
  }

  getChangeContextString(changeContext: ChangeContext): string {
    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
      `value: ${changeContext.value}, ` +
      `highValue: ${changeContext.highValue}}`;
  }

  addCart(product: ProductSearchDetail) {
    const datSend = {
      id: product.id,
      imageProduct: product.imageProduct,
      price: product.price,
      maSp: product.maSP,
      name: product.nameSP,
      quantity: 1,
    };
    this.apiService.sendCart(datSend);
    this.toastr.success('Đã vào giỏ hàng sản phẩm : ' + datSend.name);
  }

  getIdTrade(event, tra) {
    if (event.target.checked) {
      this.productSearch.idMark.push(tra);
    } else {
      this.productSearch.idMark.splice(this.productSearch.idMark.indexOf(tra), 1);
    }
    this.fetchData();
  }

  getIdColor(event, co) {
    if (event.target.checked) {
      this.productSearch.idColor.push(co);
    } else {
      this.productSearch.idColor.splice(this.productSearch.idColor.indexOf(co), 1);
    }
    this.fetchData();
  }

  getIdSale(event, sa) {
    if (event.target.checked) {
      this.productSearch.idSale.push(sa);
    } else {
      this.productSearch.idSale.splice(this.productSearch.idSale.indexOf(sa), 1);
    }
    this.fetchData();
  }

  getIdCate(event, ca) {
    if (event.target.checked) {
      this.productSearch.idCategory.push(ca);
    } else {
      this.productSearch.idCategory.splice(this.productSearch.idCategory.indexOf(ca), 1);
    }
    this.fetchData();
  }

  sortDesc(sho) {
    this.order.property = sho;
    this.productSearch.orders.push(this.order);
    this.fetchData();
  }

  sortAsc(sho) {
    this.order.property = sho;
    this.productSearch.orders.push(this.order);
    this.fetchData();
  }

  removeSort() {
    this.productSearch.orders = [];
    this.fetchData();
  }

  getSort($event){
    const pot = parseInt($event.target.value);
    let order = '';
    switch (pot) {
      case 0:
        this.productSearch.orders = [];
        this.fetchData();
        break;
      case 1:
        this.productSearch.orders = [];
        this.order.property = 'newest';
        this.productSearch.orders.push(this.order);
        this.fetchData();
        break;
      case 2:
        this.productSearch.orders = [];
        this.order.property = 'oldest';
        this.productSearch.orders.push(this.order);
        this.fetchData();
        break;
    }
  }
}
