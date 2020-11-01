import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
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
      description: new FormControl('', [Validators.required])
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  onCreate() {
    if (this.cateForm.valid) {
      this.apiService.post('/category/add', this.cateForm.value).subscribe(result => {
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
