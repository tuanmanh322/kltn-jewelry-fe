import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'vndTransfer'})
export class MoneyTransferPipe implements PipeTransform {
  transform(value: any, ...args): any {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + 'đ';
  }
}
