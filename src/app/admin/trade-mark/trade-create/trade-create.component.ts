import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-trade-create',
  templateUrl: './trade-create.component.html',
  styleUrls: ['./trade-create.component.css']
})
export class TradeCreateComponent implements OnInit {

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
      nameProduct: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  onCreate() {
    if (this.cateForm.valid) {
      this.apiService.post('/trade/add', this.cateForm.value).subscribe(() => {
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
