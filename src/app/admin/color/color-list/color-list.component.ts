import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel} from '../../../share/model/category.model';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ColorCreateComponent} from '../color-create/color-create.component';
import {ColorEditComponent} from '../color-edit/color-edit.component';
import {ColorSearch} from '../../../share/model/color-search';
import {ColorModel} from '../../../share/model/color.model';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit, OnDestroy {
  categorySearch: ColorSearch = {
    page: 0,
    pageSize: 10,
  };
  cateList: ColorModel[];
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
    this.subcription = this.apiService.post('/color/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id) {
    this.apiService.delete('/color/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }

  create() {
    this.modalService.open(ColorCreateComponent, {size: 'md'});
  }

  edit(co) {
    this.modalService.open(ColorEditComponent, {size: 'md'}).componentInstance.co = co;
  }
}
