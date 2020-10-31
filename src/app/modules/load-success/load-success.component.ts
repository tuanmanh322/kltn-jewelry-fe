import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-load-success',
  templateUrl: './load-success.component.html',
  styleUrls: ['./load-success.component.css']
})
export class LoadSuccessComponent implements OnInit, OnDestroy {
  timeLeft = 10;
  subscription;

  constructor(
    private title: Title,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.title.setTitle('Thông báo');
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.router.navigate(['']);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
      clearInterval(this.subscription);
  }

}
