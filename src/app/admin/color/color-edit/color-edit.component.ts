import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {ColorModel} from '../../../share/model/color.model';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  @Input() co: ColorModel;
  cateForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.cateForm = this.fb.group({
      name: new FormControl(this.co.name, [Validators.required]),
    });
  }


  get f() {
    return this.cateForm.controls;
  }

  onEdit() {
    if (this.cateForm.valid) {
      const cates = {
        id: this.co.id,
        name: this.cateForm.get('name').value,
      };
      this.apiService.put('/color/edit', cates).subscribe(() => {
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
