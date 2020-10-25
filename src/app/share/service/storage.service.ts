import {Injectable} from '@angular/core';
import {ADMIN, AUTHORITIES_KEY, CURRENT_USER, ROLE, TOKEN, USER} from '../model/jewelry.constant';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private role: Array<string> = [];

  constructor() {
  }

  logOut() {
    localStorage.clear();
  }

  saveToken(token: any) {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  saveUser(maThe: string) {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, maThe);
  }

  getUser() {
    return localStorage.getItem(USER);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  getRole() {
    return localStorage.getItem(ROLE);
  }

  public getAuthorities(): string[] {
    this.role = [];

    if (sessionStorage.getItem(TOKEN)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.role.push(authority.authority);
      });
    }

    return this.role;
  }

  public isAuthenticated(): boolean {
    // This method is required to implement authentication.
    return !!this.getToken();
  }

  getProfileJson() {
    return JSON.parse(localStorage.getItem(CURRENT_USER));
  }

  public isAdmin(): boolean {
    let role = localStorage.getItem(ROLE);
    if (role === ADMIN) {
      return true;
    } else {
      return false;
    }
  }
}
