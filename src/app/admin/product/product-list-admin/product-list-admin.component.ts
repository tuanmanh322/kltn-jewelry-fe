import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategorySearch} from '../../../share/model/category-search';
import {CategoryModel} from '../../../share/model/category.model';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryCreateComponent} from '../../category/category-create/category-create.component';
import {CategoryEditComponent} from '../../category/category-edit/category-edit.component';
import {ProductSearchModel} from '../../../share/model/product-search.model';
import {ProductSearchDetail} from '../../../share/model/product-search-detail';
import {ProductCreateComponent} from '../product-create/product-create.component';
import {ProductEditComponent} from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.css']
})
export class ProductListAdminComponent implements OnInit, OnDestroy {

  categorySearch: ProductSearchModel = {
    page: 0,
    pageSize: 10,
    name: '',
    idColor: [],
    idCategory: [],
    idMark: [],
    idSale: [],
    priceSecond: null,
    priceFirst: null
  };
  cateList: ProductSearchDetail[];
  totalItem = 0;
  subcription: Subscription;
  nameS = '';

  constructor(
    private title: Title,
    private apiService: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.fetch();
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onSearch() {
    this.categorySearch.page = 0;
    this.categorySearch.name = this.nameS;
    this.fetch();
  }

  fetch(): void {
    this.subcription = this.apiService.post('/product/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id) {
    this.apiService.delete('/product/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }

  create() {
    this.modalService.open(ProductCreateComponent, {size: 'lg'});
  }

  edit(pro) {
    this.modalService.open(ProductEditComponent, {size: 'lg'}).componentInstance.pro = pro;
  }

}
