import {Component, EventEmitter, OnInit} from '@angular/core';
import {ChangeContext, LabelType, Options, PointerType} from 'ng5-slider';
import {FormControl} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  control: FormControl = new FormControl([0, 20000000]);
  options: Options = {
    floor: 0,
    ceil: 20000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + 'đ';
        case LabelType.High:
          return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + 'đ';
        default:
          return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + 'đ';
      }
    }
  };


  priceChange: number = 0;
  priceHigh: number = this.control.value[1];

  priceLow = 0;
  priceMax = 0;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.priceChange);
    console.log(this.priceHigh);
    // $(document).ready(function () {
    //   $(".tab1 .single-bottom").hide();
    //   $(".tab2 .single-bottom").hide();
    //   $(".tab3 .single-bottom").hide();
    //   $(".tab4 .single-bottom").hide();
    //   $(".tab5 .single-bottom").hide();
    //
    //   $(".tab1 ul").click(function () {
    //     $(".tab1 .single-bottom").slideToggle(300);
    //     $(".tab2 .single-bottom").hide();
    //     $(".tab3 .single-bottom").hide();
    //     $(".tab4 .single-bottom").hide();
    //     $(".tab5 .single-bottom").hide();
    //   })
    //   $(".tab2 ul").click(function () {
    //     $(".tab2 .single-bottom").slideToggle(300);
    //     $(".tab1 .single-bottom").hide();
    //     $(".tab3 .single-bottom").hide();
    //     $(".tab4 .single-bottom").hide();
    //     $(".tab5 .single-bottom").hide();
    //   })
    //   $(".tab3 ul").click(function () {
    //     $(".tab3 .single-bottom").slideToggle(300);
    //     $(".tab4 .single-bottom").hide();
    //     $(".tab5 .single-bottom").hide();
    //     $(".tab2 .single-bottom").hide();
    //     $(".tab1 .single-bottom").hide();
    //   })
    //   $(".tab4 ul").click(function () {
    //     $(".tab4 .single-bottom").slideToggle(300);
    //     $(".tab5 .single-bottom").hide();
    //     $(".tab3 .single-bottom").hide();
    //     $(".tab2 .single-bottom").hide();
    //     $(".tab1 .single-bottom").hide();
    //   })
    //   $(".tab5 ul").click(function () {
    //     $(".tab5 .single-bottom").slideToggle(300);
    //     $(".tab4 .single-bottom").hide();
    //     $(".tab3 .single-bottom").hide();
    //     $(".tab2 .single-bottom").hide();
    //     $(".tab1 .single-bottom").hide();
    //   })
    // });
  }

  onUserChange(changeContext: ChangeContext): void {
    this.priceLow = changeContext.value;
    this.priceMax = changeContext.highValue;
    console.log('this.priceMax: ' + this.priceMax);
    console.log('this.priceLow: ' + this.priceLow);

  }

  getChangeContextString(changeContext: ChangeContext): string {
    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
      `value: ${changeContext.value}, ` +
      `highValue: ${changeContext.highValue}}`;
  }

}
