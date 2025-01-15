/* tslint:disable */
/* eslint-disable */
import { Role } from '../models/role';
import { UserStatus } from '../models/user-status';
export interface User {
  email: string;
  id?: number;
  password: string;
  roles?: Array<Role>;
  userStatus?: UserStatus;
  username: string;
}
