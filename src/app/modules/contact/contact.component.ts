import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../share/service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Liên hệ');
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      content: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      email: new FormControl('',[Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')])

    });

  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.apiService.post('/contact/add', this.contactForm.value).subscribe(() => {
        this.toastr.success('Thêm liên hệ thành công');
        this.contactForm.reset();
      });
    }
  }
}
