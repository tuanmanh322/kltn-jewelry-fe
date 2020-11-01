import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {OrderEntityModel} from '../../../share/model/order-entity.model';
import {OrderSearch} from '../../../share/model/order-search';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  categorySearch: OrderSearch = {
    page: 0,
    pageSize: 10,
    phone: '',
    hoten: ''
  };
  cateList: OrderEntityModel[];
  totalItem = 0;
  subcription: Subscription;
  name = '';

  constructor(
    private title: Title,
    private apiService: ApiService,
    private toastr: ToastrService,
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

  search() {
    this.categorySearch.page = 0;
    this.categorySearch.hoten = this.name;
    this.fetch();
  }

  fetch(): void {
    this.subcription = this.apiService.post('/order/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id): void {
    this.apiService.delete('/contact/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }

}
