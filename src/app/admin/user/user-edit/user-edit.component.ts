import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {UserProfileModel} from '../../../share/model/user-profile.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: UserProfileModel;
  userFormEdit: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.userFormEdit = this.fb.group({
      firstname: new FormControl(this.user.firstName, [Validators.required]),
      lastname: new FormControl(this.user.lastName, [Validators.required]),
      username: new FormControl(this.user.username, [Validators.required]),
      role: new FormControl(this.user.userRole, [Validators.required]),
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  onCreate() {
    if (this.userFormEdit.valid) {
      const user ={
        id: this.user.id,
        firstName: this.userFormEdit.get('firstname').value,
        lastName: this.userFormEdit.get('lastname').value,
        username: this.userFormEdit.get('username').value,
        userRole: this.userFormEdit.get('role').value,
      };
      this.apiService.put('/user/edit-admin', user).subscribe(() => {
        this.toastr.success('Sửa thành công');
        this.apiService.onFilter('Edit');
        this.activeModal.dismiss();
      });
    }
  }

  get f() {
    return this.userFormEdit.controls;
  }

}
