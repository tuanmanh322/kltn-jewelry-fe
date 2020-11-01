import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {SaleModel} from '../../../share/model/sale.model';

@Component({
  selector: 'app-sale-edit',
  templateUrl: './sale-edit.component.html',
  styleUrls: ['./sale-edit.component.css']
})
export class SaleEditComponent implements OnInit {

  @Input() ca: SaleModel;
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
      name: new FormControl(this.ca.name, [Validators.required]),
      code: new FormControl(this.ca.code, [Validators.required]),
      description: new FormControl(this.ca.description, [Validators.required]),
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
        code: this.cateForm.get('code').value,
        description: this.cateForm.get('description').value,
      };
      this.apiService.put('/sale/edit', cates).subscribe(() => {
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
