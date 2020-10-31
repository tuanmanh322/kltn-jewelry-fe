import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {Product} from '../model/product';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {
  constructor(
    private http: HttpClient
  ) {
  }

  autoComplete(name: string): Observable<Product[]> {
    if (!name) {
      return of([]);
    }
    const auto = {
      keyword: name,
      excludeKeywords: []
    };
    this.http.post(`${environment.api_url}/product/auto-name`, auto).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
