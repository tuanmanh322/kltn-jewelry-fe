import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {Product} from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public $data = new Subject<any>();
  sub = this.$data.asObservable();

  public cart = new Subject<Product>();
  $cart = this.cart.asObservable();

  private _listen = new Subject<any>();

  constructor(
    private http: HttpClient
  ) {
  }

  get(path: string, params = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {params})
      .pipe(
        retry(2),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body)
      .pipe(
        retry(2),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body)
      .pipe(
        retry(2),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  delete(path: string, body: Object = {}): Observable<any> {
    return this.delete(`${environment.api_url}${path}`, body)
      .pipe(retry(2),
        catchError(err => {
          return throwError(err);
        }));
  }

  onLoad(): Observable<any> {
    return this._listen.asObservable();
  }

  onFilter(filter: string) {
    this._listen.next(filter);
  }

  onRef(object: any) {
    this._listen.next(object);
  }


  // tslint:disable-next-line:typedef
  sendData(data) {
    this.$data.next(data);
  }

  sendCart(idCart){
    this.cart.next(idCart);
  }
}
