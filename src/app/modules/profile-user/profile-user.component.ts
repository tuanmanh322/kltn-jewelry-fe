import {Component, OnInit} from '@angular/core';
import {UserProfileModel} from '../../share/model/user-profile.model';
import {CURRENT_USER} from '../../share/model/jewelry.constant';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {CartDetailModel} from '../../share/model/cart-detail.model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  userProfile: UserProfileModel;
  userPForm: FormGroup;
  isNotMatch = false;
  passwordForm: FormGroup;
  cartDetail: CartDetailModel[];
  isAdmin: boolean;
  constructor(
    private title: Title,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.userProfile = JSON.parse(localStorage.getItem(CURRENT_USER));
    this.userPForm = this.fb.group({
      firstname: new FormControl(this.userProfile.firstName, [Validators.required]),
      lastname: new FormControl(this.userProfile.lastName, [Validators.required]),
      username: new FormControl(this.userProfile.username),
      phone: new FormControl(this.userProfile.phone, [Validators.required]),
      address: new FormControl(this.userProfile.address, [Validators.required]),
    });
    this.passwordForm = this.fb.group({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });

    this.apiService.get('/cart/cart-list/' + this.userProfile.id).subscribe(data => {
      this.cartDetail = data;
    });
    if (this.userProfile.userRole === 1){
      this.isAdmin = true;
    }
  }


  get f() {
    return this.userPForm.controls;
  }

  onSave() {
    if (this.userPForm.valid) {
      const u = {
        id: this.userProfile.id,
        firstName: this.userPForm.get('firstname').value,
        lastName: this.userPForm.get('lastname').value,
        phone: this.userPForm.get('phone').value,
        address: this.userPForm.get('address').value,
      };
      this.apiService.put('/user/edit-profile', u).subscribe(data => {
        this.toastr.success('Cập nhật thành công');
        localStorage.removeItem(CURRENT_USER);
        this.userProfile = data;
        localStorage.setItem(CURRENT_USER, JSON.stringify(this.userProfile));
        this.apiService.sendAction(1);
      });
    }
  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      this.apiService.put('/user/change-password', this.passwordForm.value).subscribe(() => {
        this.toastr.success('Đổi thành công');
        this.passwordForm.reset();
      });
    }
  }

  checkPassMatch(event) {
    if (this.passwordForm.get('newPassword').value !== event.target.value) {
      this.isNotMatch = true;
    }
  }

  get fr() {
    return this.passwordForm.controls;
  }
}
