import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})


export class ProductDetailComponent implements OnInit {
  slides = [
    {img: 'http://placehold.it/350x150/000000'},
    {img: 'http://placehold.it/350x150/111111'},
    {img: 'http://placehold.it/350x150/333333'},
    {img: 'http://placehold.it/350x150/666666'},
    {img: 'http://placehold.it/350x150/666666'},
    {img: 'http://placehold.it/350x150/666666'},
    {img: 'http://placehold.it/350x150/666666'},
  ];
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: false,
    method: {},
    speed: 300,
    autoplay: true,
  };

  constructor() {
  }

  ngOnInit(): void {
    // $(document).ready(function() {
    //   $('.tab1 .single-bottom').hide();
    //   $('.tab2 .single-bottom').hide();
    //   $('.tab3 .single-bottom').hide();
    //   $('.tab4 .single-bottom').hide();
    //   $('.tab5 .single-bottom').hide();
    //
    //   $('.tab1 ul').click(function() {
    //     $('.tab1 .single-bottom').slideToggle(300);
    //     $('.tab2 .single-bottom').hide();
    //     $('.tab3 .single-bottom').hide();
    //     $('.tab4 .single-bottom').hide();
    //     $('.tab5 .single-bottom').hide();
    //   });
    //   $('.tab2 ul').click(function() {
    //     $('.tab2 .single-bottom').slideToggle(300);
    //     $('.tab1 .single-bottom').hide();
    //     $('.tab3 .single-bottom').hide();
    //     $('.tab4 .single-bottom').hide();
    //     $('.tab5 .single-bottom').hide();
    //   });
    //   $('.tab3 ul').click(function() {
    //     $('.tab3 .single-bottom').slideToggle(300);
    //     $('.tab4 .single-bottom').hide();
    //     $('.tab5 .single-bottom').hide();
    //     $('.tab2 .single-bottom').hide();
    //     $('.tab1 .single-bottom').hide();
    //   });
    //   $('.tab4 ul').click(function() {
    //     $('.tab4 .single-bottom').slideToggle(300);
    //     $('.tab5 .single-bottom').hide();
    //     $('.tab3 .single-bottom').hide();
    //     $('.tab2 .single-bottom').hide();
    //     $('.tab1 .single-bottom').hide();
    //   });
    //   $('.tab5 ul').click(function() {
    //     $('.tab5 .single-bottom').slideToggle(300);
    //     $('.tab4 .single-bottom').hide();
    //     $('.tab3 .single-bottom').hide();
    //     $('.tab2 .single-bottom').hide();
    //     $('.tab1 .single-bottom').hide();
    //   });
    // });
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
