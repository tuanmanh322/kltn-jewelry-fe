import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {UploadAdapter} from '../../../share/model/upload-adapter';
import {ColorModel} from '../../../share/model/color.model';
import {CategoryModel} from '../../../share/model/category.model';
import {TradeMarkModel} from '../../../share/model/trade-mark.model';
import {SaleModel} from '../../../share/model/sale.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  public Editor = ClassicEditor;
  newsForm: FormGroup;
  isFile: boolean;
  preview: string = '';
  fileTypeImg: any;
  contentNews: any;
  colorList: ColorModel[];
  cateList: CategoryModel[];
  trademark: TradeMarkModel[];
  saleList: SaleModel[];
  subcription: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.subcription = this.apiService.get('/category/all').subscribe(res => {
      this.cateList = res;
    });
    this.subcription = this.apiService.get('/color/all').subscribe(res => {
      this.colorList = res;
    });
    this.subcription = this.apiService.get('/trade/all').subscribe(res => {
      this.trademark = res;
    });
    this.subcription = this.apiService.get('/sale/all').subscribe(res => {
      this.saleList = res;
    });
    this.productForm = this.fb.group({
      namesp: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      idcate: [''],
      idsale: [''],
      idmark: [''],
      idco: [''],
      image: [''],
      masp: ['', Validators.required],
      totaltitem: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
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
    if (this.contentNews === '') {
      this.toastr.error('Bạn cần nhập mô tả sản phẩm');
      return;
    }
    if (this.productForm.valid) {
      const d = new FormData();
      if (this.isFile === true) {
        d.append('imageFile', this.productForm.get('image').value);
      }
      d.append('description', this.contentNews);
      d.append('idCategory', this.productForm.get('idcate').value);
      d.append('idSale', this.productForm.get('idsale').value);
      d.append('idMark', this.productForm.get('idmark').value);
      d.append('maSp', this.productForm.get('masp').value);
      d.append('name', this.productForm.get('namesp').value);
      d.append('price', this.productForm.get('price').value);
      d.append('totalItem', this.productForm.get('totaltitem').value);
      d.append('idColor', this.productForm.get('idco').value);
      this.apiService.post('/product/add', d).subscribe(() => {
        this.toastr.success('Thêm thành công');
        this.apiService.onFilter('create');
        this.activeModal.dismiss();
      });
    }
  }

  get f(): any {
    return this.productForm.controls;
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
          this.productForm.get('image').setValue(file);
          this.isFile = true;
        } else {
          this.toastr.error('Định dạng ảnh không đúng!');
          this.productForm.get('image').setValue(null);
        }
      };
    }
  }

}
