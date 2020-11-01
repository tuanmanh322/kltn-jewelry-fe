import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TradeMarkSearch} from '../../../share/model/trade-mark.-search';
import {TradeCreateComponent} from '../trade-create/trade-create.component';
import {TradeEditComponent} from '../trade-edit/trade-edit.component';
import {TradeMarkModel} from '../../../share/model/trade-mark.model';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.css']
})
export class TradeListComponent implements OnInit, OnDestroy {

  categorySearch: TradeMarkSearch = {
    page: 0,
    pageSize: 10,
    nameProduct: ''
  };
  cateList: TradeMarkModel[];
  totalItem = 0;
  subcription: Subscription;
  name = '';

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
    this.categorySearch.nameProduct = this.name;
    this.fetch();
  }

  fetch(): void {
    this.subcription = this.apiService.post('/trade/search', this.categorySearch).subscribe(data => {
      this.categorySearch = data;
      this.cateList = this.categorySearch.data;
      this.totalItem = this.categorySearch.totalRecords;
    });
  }

  de(id) {
    this.apiService.delete('/trade/delete/' + id).subscribe(() => {
      this.toastr.success('Xoá thành công');
      this.fetch();
    });
  }

  create() {
    this.modalService.open(TradeCreateComponent, {size: 'md'});
  }

  edit(ca) {
    this.modalService.open(TradeEditComponent, {size: 'md'}).componentInstance.ca = ca;
  }

}
