/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface UserStatus {
  accountLocked?: boolean;
  enabled?: boolean;
  id?: number;
  user?: User;
}
