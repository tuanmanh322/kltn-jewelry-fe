import { Component, OnInit } from '@angular/core';
import {ColorSearch} from '../../../share/model/color-search';
import {ColorModel} from '../../../share/model/color.model';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ColorCreateComponent} from '../../color/color-create/color-create.component';
import {ColorEditComponent} from '../../color/color-edit/color-edit.component';
import {UserProfileModel} from '../../../share/model/user-profile.model';
import {UserCreateComponent} from '../user-create/user-create.component';
import {UserEditComponent} from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  categorySearch: ColorSearch = {
    page: 0,
    pageSize: 10,
  };
  cateList: UserProfileModel[];
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

  fetch(): void {
    this.subcription = this.apiService.post('/user/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id) {
    this.apiService.delete('/user/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }

  create() {
    this.modalService.open(UserCreateComponent, {size: 'md'});
  }

  edit(user) {
    this.modalService.open(UserEditComponent, {size: 'md'}).componentInstance.user = user;
  }

}
