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
  @ViewChild('tab1', {read: 'test'}) t1: ElementRef;
  @ViewChild('tab2', {read: 'test'}) t2: ElementRef;
  @ViewChild('tab3', {read: 'test'}) t3: ElementRef;
  @ViewChild('tab4', {read: 'test'}) t4: ElementRef;
  @ViewChild('tab5', {read: 'test'}) t5: ElementRef;
  @ViewChild('tab6', {read: 'test'}) t6: ElementRef;
  @ViewChild('tab7', {read: 'test'}) t7: ElementRef;
  @ViewChild('tab8', {read: 'test'}) t8: ElementRef;
  @ViewChild('tab9', {read: 'test'}) t9: ElementRef;

  pot = 1;

  constructor(
    private title: Title
  ) {
  }

  ngOnInit(): void {
    console.log(this.t1);
    this.title.setTitle('Trang quản trị');
    if (localStorage.getItem(POT)) {
      this.pot = parseInt(localStorage.getItem(POT));
      switch (this.pot) {
        case 1:
          this.t1.nativeElement.click();
          break;
        case 2:
          this.t2.nativeElement.click();
          break;
        case 3:
          this.t3.nativeElement.click();
          break;
        case 4:
          this.t4.nativeElement.click();
          break;
        case 5:
          this.t5.nativeElement.click();
          break;
        case 6:
          this.t6.nativeElement.click();
          break;
        case 7:
          this.t7.nativeElement.click();
          break;
        case 8:
          this.t8.nativeElement.click();
          break;
        case 9:
          this.t9.nativeElement.click();
          break;
      }
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem(POT);
  }

  getPot(pot) {
    this.pot = pot;
    localStorage.setItem(POT, pot);
  }
}
