import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {POT} from '../../share/model/jewelry.constant';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [
    {provide: 'test', useValue: 'x'}
  ]
})
export class AdminComponent implements OnInit, OnDestroy {
  pot = 1;
  constructor(
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Trang quản trị');
    // if (localStorage.getItem(POT)) {
    //   this.pot = parseInt(localStorage.getItem(POT));
    //   switch (this.pot) {
    //     case 1:
    //       this.ele = document.getElementById('tab1');
    //       break;
    //     case 2:
    //       this.ele = document.getElementById('tab2');
    //       break;
    //     case 3:
    //       this.ele = document.getElementById('tab3');
    //       break;
    //     case 4:
    //       this.ele = document.getElementById('tab4');
    //       break;
    //     case 5:
    //       this.ele = document.getElementById('tab5');
    //       break;
    //     case 6:
    //       this.ele = document.getElementById('tab6');
    //       break;
    //     case 7:
    //       this.ele = document.getElementById('tab7');
    //       break;
    //     case 8:
    //       this.ele = document.getElementById('tab8');
    //       break;
    //     case 9:
    //       this.ele = document.getElementById('tab9');
    //       break;
    //   }
    //   this.ele.classList.add('active');
    // }
  }

  ngOnDestroy(): void {
    localStorage.removeItem(POT);
  }

  getPot(pot) {
    this.pot = pot;
    localStorage.setItem(POT, pot);
  }
}
