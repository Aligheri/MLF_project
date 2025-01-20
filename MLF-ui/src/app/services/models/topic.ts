/* tslint:disable */
/* eslint-disable */
import { Article } from '../models/article';
import { LearningPath } from '../models/learning-path';
import { User } from '../models/user';
export interface Topic {
  articles?: Array<Article>;
  children?: Array<Topic>;
  id?: number;
  learningPath?: LearningPath;
  name?: string;
  owner?: User;
  parent?: Topic;
}
