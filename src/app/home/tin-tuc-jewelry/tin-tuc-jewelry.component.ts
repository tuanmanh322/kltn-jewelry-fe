import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../share/service/api.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {NewsModel} from '../../share/model/news.model';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-tin-tuc-jewelry',
  templateUrl: './tin-tuc-jewelry.component.html',
  styleUrls: ['./tin-tuc-jewelry.component.css']
})
export class TinTucJewelryComponent implements OnInit {
  news: NewsModel[];

  data1 = [];
  apiData = ['../../../assets/images/logo/ides_rabbit_0efbbbf0.jpg',
    '../../../assets/images/logo/Jewelry-Wallpaper-58-1920x1080.jpg',
    '../../../assets/images/logo/Swarovski-Jewelry-Wallpaper-Cardiff-Jewellers.jpg',
  '../../../assets/images/logo/jewellery-wallpapers-jewellery-wallpapers-1.jpg',
    '../../../assets/images/logo/unnamed.jpg'];
  data2 = [];
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  };

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
        } else {
          this.data2.push(this.news[i]);
        }
      }
    });

  }

}
