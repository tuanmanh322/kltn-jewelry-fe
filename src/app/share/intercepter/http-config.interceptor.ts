import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TOKEN, USER} from '../model/jewelry.constant';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem(TOKEN) && localStorage.getItem(USER)) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem(TOKEN)
        }
      });
    }
    return next.handle(req);
  }
}
