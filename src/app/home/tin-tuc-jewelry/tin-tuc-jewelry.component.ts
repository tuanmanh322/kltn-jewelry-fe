import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../share/service/api.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {NewsModel} from '../../share/model/news.model';

@Component({
  selector: 'app-tin-tuc-jewelry',
  templateUrl: './tin-tuc-jewelry.component.html',
  styleUrls: ['./tin-tuc-jewelry.component.css']
})
export class TinTucJewelryComponent implements OnInit {
  news: NewsModel[];

  data1 = [];

  data2 = [];

  constructor(
    private apiService: ApiService,
    private title: Title,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.apiService.get('/news/index').subscribe(res => {
      this.news = res;
      for (let i = 0; i < this.news.length; i++) {
        if (i <= 1) {
          this.data1.push(this.news[i]);
        }else {
          this.data2.push(this.news[i]);
        }
      }
    });

  }

}
