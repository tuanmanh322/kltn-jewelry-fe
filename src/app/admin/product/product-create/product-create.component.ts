import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {UploadAdapter} from '../../../share/model/upload-adapter';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  cateForm: FormGroup;
  public Editor = ClassicEditor;
  newsForm: FormGroup;
  isFile: boolean;
  preview: string = '';
  isEmailExisted: boolean;
  avatarUrl: any;
  fileTypeImg: any;
  contentNews: any;
  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.cateForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required,Validators.pattern('^[0-9]*$')]),
      idCategory: new FormControl(''),
      description: new FormControl(''),
      idSale: new FormControl(''),
      idMark: new FormControl(''),
      idColor: new FormControl(''),
      imageProduct: new FormControl(''),
      maSp: new FormControl('', [Validators.required]),
      totalItem: new FormControl('', [Validators.required,Validators.pattern('^[0-9]*$')]),
    });
  }
  public onReady(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }
  close() {
    this.activeModal.dismiss();
  }

  onCreate() {
    if (this.cateForm.valid) {
      this.apiService.post('/color/add', this.cateForm.value).subscribe(() => {
        this.toastr.success('Thêm thành công');
        this.apiService.onFilter('create');
        this.activeModal.dismiss();
      });
    }
  }

  get f() {
    return this.cateForm.controls;
  }

  getFile(event) {
    const imgTypes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/jpg'
    ];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.preview = reader.result as string;
        if (file.type === 'image/jpeg' || file.type === 'image/pjpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
          this.fileTypeImg = file.type;
          this.newsForm.get('image').setValue(file);
          this.isFile = true;
        } else {
          this.toastr.error('Định dạng ảnh không đúng!');
          this.newsForm.get('image').setValue(null);
        }
      };
    }
  }

}
