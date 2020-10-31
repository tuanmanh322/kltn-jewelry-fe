import {BaseSearch} from './base-search';

export interface ContactSearch extends BaseSearch {
  email: string;
  phone: string;
  name: string;
}
