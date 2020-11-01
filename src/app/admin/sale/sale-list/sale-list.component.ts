import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {SaleSearch} from '../../../share/model/sale-search';
import {SaleModel} from '../../../share/model/sale.model';
import {SaleCreateComponent} from '../sale-create/sale-create.component';
import {SaleEditComponent} from '../sale-edit/sale-edit.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit, OnDestroy {

  categorySearch: SaleSearch = {
    page: 0,
    pageSize: 10,
  };
  cateList: SaleModel[];
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
    this.subcription = this.apiService.post('/sale/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id) {
    this.apiService.delete('/sale/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }

  create() {
    this.modalService.open(SaleCreateComponent, {size: 'md'});
  }

  edit(ca) {
    this.modalService.open(SaleEditComponent, {size: 'md'}).componentInstance.ca = ca;
  }
}
