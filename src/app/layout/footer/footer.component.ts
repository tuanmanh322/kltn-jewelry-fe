import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../share/service/api.service';
import {CategoryModel} from '../../share/model/category.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categoryList: CategoryModel[];
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.get('/category/all').subscribe(res => {
      this.categoryList = res;
    });
  }
  sendCate(id){
    this.apiService.sendCate(id);
  }

}
