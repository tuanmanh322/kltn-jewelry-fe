import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {ContactSearch} from '../../../share/model/contact-search';
import {ContactModel} from '../../../share/model/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  categorySearch: ContactSearch = {
    page: 0,
    pageSize: 10,
    name: '',
    phone: '',
    email: ''
  };
  cateList: ContactModel[];
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
    this.categorySearch.name = this.name;
    this.fetch();
  }

  fetch(): void {
    this.subcription = this.apiService.post('/contact/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id) {
    this.apiService.delete('/contact/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }
}
