import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {

  cateForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.cateForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required,Validators.pattern('^(0|\\d)(\\.\\d{1,2})?$')]),
      description: new FormControl('', [Validators.required]),
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  onCreate() {
    if (this.cateForm.valid) {
      this.apiService.post('/sale/add', this.cateForm.value).subscribe(() => {
        this.toastr.success('Thêm thành công');
        this.apiService.onFilter('create');
        this.activeModal.dismiss();
      });
    }
  }

  get f() {
    return this.cateForm.controls;
  }
}
