export interface UserProfileModel {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  userImage?: string;
  userRole?: number;
  userRoleName?: string;
  phone?: string;
  createdDate?: Date;
  modifiedDate?: Date;
  address?: string;
  active?: boolean;
}
