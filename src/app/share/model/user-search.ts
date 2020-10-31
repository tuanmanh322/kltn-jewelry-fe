import {BaseSearch} from './base-search';

export interface UserSearch extends BaseSearch {
  username: string;
  phone: string;
}
