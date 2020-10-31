import {Component, OnInit} from '@angular/core';
import {NewSearchModel} from '../../share/model/new-search.model';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../share/service/api.service';
import {NewsModel} from '../../share/model/news.model';

@Component({
  selector: 'app-tin-tuc',
  templateUrl: './tin-tuc.component.html',
  styleUrls: ['./tin-tuc.component.css']
})
export class TinTucComponent implements OnInit {
  newSearch: NewSearchModel = {
    title: '',
    page: 0,
    pageSize: 6,
    orders: []
  };
  newModel: NewsModel[];

  constructor(
    private title: Title,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.apiService.post('/news/search', this.newSearch).subscribe(ne => {
      this.newSearch = ne;
      this.newModel = this.newSearch.data;
    });
  }


}
