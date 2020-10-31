import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategorySearch} from '../../../share/model/category-search';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {CategoryModel} from '../../../share/model/category.model';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit, OnDestroy {
  categorySearch: CategorySearch = {
    page: 0,
    pageSize: 10,
    name: ''
  };
  cateList: CategoryModel[];
  totalItem = 0;
  subcription: Subscription;

  constructor(
    private title: Title,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  ngOnDestroy(): void {

  }

  fetch(): void {
    this.subcription = this.apiService.post('/category/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id) {
    this.apiService.delete('/category/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }
}
