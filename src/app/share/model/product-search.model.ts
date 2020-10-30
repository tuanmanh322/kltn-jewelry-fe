import {BaseSearch} from './base-search';

export interface ProductSearchModel extends BaseSearch {
  idColor?: number[];

  idMark?: number[];

  idSale?: number[];

  idCategory?: number[];

  priceFirst?: number;

  priceSecond?: number;

  name?: string;
}
