import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {UserProfileModel} from '../model/user-profile.model';
import {StorageService} from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private userModel: UserProfileModel;
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private storageService: StorageService
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userModel = this.storageService.getProfileJson();
    return !(!this.auth.isAuthenticated() && this.userModel.userRole !== 1);
  }
}
