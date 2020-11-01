import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {UploadAdapter} from '../../../share/model/upload-adapter';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../share/service/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
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

  public onReady(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }

  ngOnInit(): void {
    this.newsForm = this.fb.group({
      image: new FormControl(''),
      thumbnails: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
    });
    console.log(this.contentNews);
  }

  get f() {
    return this.newsForm.controls;
  }

  onCreate() {
    if (this.contentNews === '') {
      this.toastr.error('Bạn chưa nhập nội dung');
      return;
    }
    if (this.isFile === false) {
      this.toastr.error('File ảnh không hợp lệ ');
      return;
    }
    if (this.newsForm.valid) {
      const d = new FormData();
      d.append('title', this.newsForm.get('title').value);
      d.append('thumbnails', this.newsForm.get('thumbnails').value);
      if (this.isFile === true){
        d.append('file', this.newsForm.get('image').value);
      }
      d.append('content', this.contentNews);
      this.apiService.post('/news/add', d).subscribe(() => {
        this.toastr.success('Thêm mới thành công!');
        this.apiService.onFilter('create');
        this.activeModal.dismiss();
      });
    }
  }

  close() {
    this.activeModal.dismiss();
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
