import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../share/service/api.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  isNotMatch = false;
  constructor(
    private title: Title,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordRe: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.valid && this.isNotMatch === false) {
      const userAdd = {
        firstName: this.userForm.get('firstName').value,
        lastName: this.userForm.get('lastName').value,
        username: this.userForm.get('username').value,
        password: this.userForm.get('password').value,
        phone: this.userForm.get('phone').value,
        sex: this.userForm.get('sex').value,
      };
      this.apiService.post('/user/register', userAdd).subscribe(() => {
        this.toastr.success('Đăng ký thành công!');
        this.router.navigate(['/login']);
        this.userForm.reset();
      });
    }
  }

  checkMatchPw(event) {
    if (this.userForm.get('password').value !== event.target.value) {
      this.isNotMatch = true;
    }else{
      this.isNotMatch = false;
    }
  }
}
