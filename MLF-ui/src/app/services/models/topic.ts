/* tslint:disable */
/* eslint-disable */
import { Article } from '../models/article';
import { LearningPath } from '../models/learning-path';
export interface Topic {
  articles?: Array<Article>;
  children?: Array<Topic>;
  id?: number;
  learningPath?: LearningPath;
  name?: string;
  parent?: Topic;
}
