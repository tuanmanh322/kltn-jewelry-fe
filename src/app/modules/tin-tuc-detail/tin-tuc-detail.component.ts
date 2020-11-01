import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../share/service/api.service';
import {NewsModel} from '../../share/model/news.model';

@Component({
  selector: 'app-tin-tuc-detail',
  templateUrl: './tin-tuc-detail.component.html',
  styleUrls: ['./tin-tuc-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TinTucDetailComponent implements OnInit {
  newDetail: NewsModel;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      const id = parseInt(res.id);
      this.apiService.get('/news/detail/' + id).subscribe(ne => {
        this.newDetail = ne;
      });
    });
  }

}
