import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/service/auth.service';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginModel} from '../../share/model/login.model';
import {UserProfileModel} from '../../share/model/user-profile.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LOGIN_SUCCESS, SESSIONID} from '../../share/model/jewelry.constant';
import {EventManagement} from '../../share/service/event.managements';
import {StorageService} from '../../share/service/storage.service';
import {ApiService} from '../../share/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userProfile: UserProfileModel;

  constructor(
    private authService: AuthService,
    private title: Title,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private eventmanager: EventManagement,
    private storageSerivce: StorageService,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Đăng nhập');
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin(): void {
    const login: LoginModel = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      rememberMe: false
    };
    this.authService.login(login).subscribe(res => {
        const token = res.headers.get('Authorization');
        // this.tokenM = res.body;
        this.storageSerivce.saveToken(token);
        this.storageSerivce.saveUser(login.username);
        this.authService.identity(true).then(() => {
          this.eventmanager.broadcast(LOGIN_SUCCESS);
          this.authService.entranceUrl();
          this.toastr.success('Đăng nhập thành công!');
          this.apiService.onFilter('Login');
          this.router.navigate(['']);
        });
      }, error => {
        this.loginForm.get('password').reset();
        if (error.status === 401) {
          if (error.error) {
            this.toastr.error(`Lỗi ${error.error.message}`);
          } else {
            this.toastr.error('Bạn không có quyền truy cập');
          }
        }
      }
    );
  }
  get f(){
    return this.loginForm.controls;
  }
}
