import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-load-success',
  templateUrl: './load-success.component.html',
  styleUrls: ['./load-success.component.css']
})
export class LoadSuccessComponent implements OnInit, OnDestroy {
  timeLeft = 10;
  subscription;
  sub : Subscription;
  public intervallTimer = interval(1000);
  constructor(
    private title: Title,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Thông báo');
    this.sub = this.intervallTimer.subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
