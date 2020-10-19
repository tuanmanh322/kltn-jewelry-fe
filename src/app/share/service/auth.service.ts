import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../model/login.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TOKEN, USER} from '../model/jewelry.constant';
import {UserProfileModel} from '../model/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rememberMe: boolean;
  userProfile: UserProfileModel;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }


  public login(login: LoginModel): Observable<any> {
    this.rememberMe = login.rememberMe;
    return this.http.post<LoginModel>(`${environment.api_url}/login`, login, {observe: 'response'});
  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  public getProfileUser() {
    return this.http.get(`${environment.api_url}/profile-user`);
  }

  public getAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  saveToken(token: string) {
    if (this.rememberMe) {
      localStorage.setItem(TOKEN, token);
    }
  }

  getCurrentUser() {
    if (!this.getAuthenticated()) {
      return undefined;
    }
    return JSON.parse(localStorage.getItem(USER));
  }
}
