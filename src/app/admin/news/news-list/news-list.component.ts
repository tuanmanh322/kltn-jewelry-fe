import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsCreateComponent} from '../news-create/news-create.component';
import {NewsEditComponent} from '../news-edit/news-edit.component';
import {NewSearchModel} from '../../../share/model/new-search.model';
import {NewsModel} from '../../../share/model/news.model';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  categorySearch: NewSearchModel = {
    page: 0,
    pageSize: 10,
    title: ''
  };

  titleS = '';
  cateList: NewsModel[];
  totalItem = 0;
  subcription: Subscription;

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

  search() {
    this.categorySearch.page = 0;
    this.categorySearch.title = this.titleS;
    this.fetch();
  }


  fetch(): void {
    this.subcription = this.apiService.post('/news/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id) {
    this.apiService.delete('/news/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }

  create() {
    this.modalService.open(NewsCreateComponent, {size: 'lg'});
  }

  edit(ca) {
    this.modalService.open(NewsEditComponent, {size: 'lg'}).componentInstance.ca = ca;
  }

}
