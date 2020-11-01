import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {TradeMarkModel} from '../../../share/model/trade-mark.model';

@Component({
  selector: 'app-trade-edit',
  templateUrl: './trade-edit.component.html',
  styleUrls: ['./trade-edit.component.css']
})
export class TradeEditComponent implements OnInit {

  @Input() ca: TradeMarkModel;
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
      nameProduct: new FormControl(this.ca.nameProduct, [Validators.required]),
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
        nameProduct: this.cateForm.get('nameProduct').value,
        description: this.cateForm.get('description').value,
      };
      this.apiService.put('/trade/edit', cates).subscribe(() => {
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
