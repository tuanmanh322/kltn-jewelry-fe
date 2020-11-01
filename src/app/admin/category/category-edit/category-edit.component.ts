import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from '../../../share/model/category.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @Input() ca: CategoryModel;
  cateForm: FormGroup;
  cate: CategoryModel;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.cateForm = this.fb.group({
      name: new FormControl(this.ca.name, [Validators.required]),
      description: new FormControl(this.ca.description, [Validators.required])
    });
  }


  get f() {
    return this.cateForm.controls;
  }

  onEdit() {
    if (this.cateForm.valid) {
      const cates = {
        id: this.ca.id,
        name: this.cateForm.get('name').value,
        description: this.cateForm.get('description').value
      };
      this.apiService.put('/category/edit', cates).subscribe(() => {
        this.toastr.success('Sửa thành công');
        this.apiService.onFilter('edit');
        this.activeModal.dismiss();
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }

}
