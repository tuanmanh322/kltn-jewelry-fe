import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColorModel} from '../../../share/model/color.model';
import {CategoryModel} from '../../../share/model/category.model';
import {TradeMarkModel} from '../../../share/model/trade-mark.model';
import {SaleModel} from '../../../share/model/sale.model';
import {Subscription} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';
import {UploadAdapter} from '../../../share/model/upload-adapter';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ProductSearchDetail} from '../../../share/model/product-search-detail';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @Input() pro: ProductSearchDetail;
  productEdit: FormGroup;
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
    this.productEdit = this.fb.group({
      namesp: [this.pro.nameSP, Validators.required],
      price: [this.pro.price, [Validators.required, Validators.pattern('[0-9]*')]],
      idcate: [this.pro.idCategory],
      idsale: [this.pro.idSale],
      idmark: [this.pro.idMark],
      idco: [this.pro.idColor],
      image: [this.pro.imageProduct],
      masp: [this.pro.maSP, Validators.required],
      totaltitem: [this.pro.totalItem, [Validators.required, Validators.pattern('[0-9]*')]],
    });
    this.contentNews = this.pro.description;
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
    if (this.productEdit.valid) {
      const d = new FormData();
      if (this.isFile === true) {
        d.append('imageFile', this.productEdit.get('image').value);
      }else{
        d.append('imageFile', JSON.stringify(this.pro.imageProduct));
      }
      d.append('id', JSON.stringify(this.pro.id));
      d.append('description', this.contentNews);
      d.append('idCategory', this.productEdit.get('idcate').value);
      d.append('idSale', this.productEdit.get('idsale').value);
      d.append('idMark', this.productEdit.get('idmark').value);
      d.append('maSp', this.productEdit.get('masp').value);
      d.append('name', this.productEdit.get('namesp').value);
      d.append('price', this.productEdit.get('price').value);
      d.append('totalItem', this.productEdit.get('totaltitem').value);
      d.append('idColor', this.productEdit.get('idco').value);
      this.apiService.post('/product/edit', d).subscribe(() => {
        this.toastr.success('Thêm thành công');
        this.apiService.onFilter('create');
        this.activeModal.dismiss();
      });
    }
  }

  get f(): any {
    return this.productEdit.controls;
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
          this.productEdit.get('image').setValue(file);
          this.isFile = true;
        } else {
          this.toastr.error('Định dạng ảnh không đúng!');
          this.productEdit.get('image').setValue(null);
        }
      };
    }
  }

}
