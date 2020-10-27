import {Component, OnDestroy} from '@angular/core';
import {PRODUCT} from './share/model/jewelry.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'fe-jewelry';

  ngOnDestroy(): void {
    localStorage.removeItem(PRODUCT);
  }
}
