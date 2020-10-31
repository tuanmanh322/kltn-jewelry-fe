import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {AuthService} from '../../share/service/auth.service';
import {ADMIN, PRODUCT, ROLE, TITLE, USER_PROFILE_CHANGED} from '../../share/model/jewelry.constant';
import {EventManagement} from '../../share/service/event.managements';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {StorageService} from '../../share/service/storage.service';
import {ApiService} from '../../share/service/api.service';
import {UserProfileModel} from '../../share/model/user-profile.model';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../share/model/product';
import {CategoryModel} from '../../share/model/category.model';
import {AutoCompleteService} from '../../share/service/auto-complete.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticate: boolean = true;
  isLoginPage: boolean;
  userProfile: UserProfileModel;
  test: Subscription;
  isAdmin: boolean;
  testtt: boolean;
  titles = '';
  data = '';
  isLogin: boolean;
  cart = [];
  money = 0;
  itemCount = 0;
  cartd: Product;
  cardPut = {};
  categoryList: CategoryModel[];
  namePro: Observable<Product[] | Observable<Product[]>>;

  name = new FormControl();
  clickSearch = false;

  constructor(
    private router: Router,
    private eventManagement: EventManagement,
    private elementRef: ElementRef,
    private message: ToastrService,
    private route: ActivatedRoute,
    private title: Title,
    private storageService: StorageService,
    private userService: AuthService,
    private apiService: ApiService,
    private renderer: Renderer2,
    private autoComplete: AutoCompleteService
  ) {
  }

  ngOnInit(): void {
    this.eventManagement.subscribe(USER_PROFILE_CHANGED, () => {
      this.getProfile();
    });
    this.userProfile = {};
    this.isAuthenticate = this.userService.isAuthenticated();
    this.isLoginPage = this.userService.isLogin();
    if (this.isAuthenticate) {
      this.userService.identity().then(userProfile => {
        this.userProfile = userProfile;
      });
    }
    this.userService.getAuthState().subscribe(() => {
      this.getProfile();
    });
    this.namePro = this.name.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.clickSearch = true),
      switchMap(name => this.autoComplete.autoComplete(name)),
      tap(() => this.clickSearch = false)
    );

    this.apiService.$data.subscribe(data => {
      this.data = data;
    });
    setInterval(() => {
      if (localStorage.getItem(PRODUCT)) {
        this.money = 0;
        this.itemCount = 0;
        this.cart = JSON.parse(localStorage.getItem(PRODUCT));
        if (this.cart.length > 0) {
          this.cart.forEach(ca => {
            this.money += ca.price * ca.quantity;
            this.itemCount += ca.quantity;
          });
        }
      }
    }, 700);

    this.apiService.$cart.subscribe((data) => {
      this.money = 0;
      if (this.cart.findIndex(d => d.id === data.id) >= 0 && this.cart.length > 0) {
        this.cartd = this.cart.filter((p: Product) => p.id === data.id)[0];
        let pot = this.cart.findIndex(d => d.id === data.id);
        this.cardPut = {
          id: this.cartd.id,
          imageProduct: this.cartd.imageProduct,
          quantity: this.cartd.quantity + 1,
          name: this.cartd.name,
          maSp: this.cartd.maSp,
          price: this.cartd.price
        };
        this.cart.splice(pot, 1, this.cardPut);
      } else {
        this.cart.push(data);
      }
      this.cart.forEach(ca => {
        this.money += ca.price * ca.quantity;
        this.itemCount += ca.quantity;
      });
      localStorage.setItem(PRODUCT, JSON.stringify(this.cart));
    });

    this.apiService.get('/category/all').subscribe(res => {
      this.categoryList = res;
    });
  }


  getProfile() {
    const authenticate = this.userService.isLogin();
    if (!authenticate) {
      this.userProfile = {};
      this.isAuthenticate = false;
      return;
    }
    this.userService.identity().then(userProfile => {
      this.userProfile = userProfile;
      this.isAuthenticate = true;
      localStorage.removeItem(ROLE);
      localStorage.setItem(ROLE, this.userProfile.userRoleName);
      if (localStorage.getItem(ROLE) === ADMIN) {
        this.isAdmin = true;
      }
    });

  }


  logOut() {
    this.storageService.logOut();
    this.isAuthenticate = false;
    this.router.navigate(['']);
  }


  getDataTitle() {
    localStorage.removeItem(TITLE);
    localStorage.setItem(TITLE, this.titles);
    this.apiService.sendData(this.titles);
    this.titles = '';
  }
}
