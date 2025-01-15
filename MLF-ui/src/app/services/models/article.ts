/* tslint:disable */
/* eslint-disable */
import { Topic } from '../models/topic';
import { User } from '../models/user';
export interface Article {
  archived?: boolean;
  createdAt?: string;
  id?: number;
  owner?: User;
  priority?: number;
  title?: string;
  topic?: Topic;
  url?: string;
}
