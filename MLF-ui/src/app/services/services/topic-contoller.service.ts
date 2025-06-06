/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { assignArticlesToTopics } from '../fn/topic-contoller/assign-articles-to-topics';
import { AssignArticlesToTopics$Params } from '../fn/topic-contoller/assign-articles-to-topics';
import { createOrUpdateTopic } from '../fn/topic-contoller/create-or-update-topic';
import { CreateOrUpdateTopic$Params } from '../fn/topic-contoller/create-or-update-topic';
import { getAllattachedTopics } from '../fn/topic-contoller/get-allattached-topics';
import { GetAllattachedTopics$Params } from '../fn/topic-contoller/get-allattached-topics';
import { getAllTopics } from '../fn/topic-contoller/get-all-topics';
import { GetAllTopics$Params } from '../fn/topic-contoller/get-all-topics';
import { getTopicTree } from '../fn/topic-contoller/get-topic-tree';
import { GetTopicTree$Params } from '../fn/topic-contoller/get-topic-tree';
import { Topic } from '../models/topic';
import { TopicResponse } from '../models/topic-response';

@Injectable({ providedIn: 'root' })
export class TopicContollerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createOrUpdateTopic()` */
  static readonly CreateOrUpdateTopicPath = '/api/topics/{learningPathId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrUpdateTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  createOrUpdateTopic$Response(params: CreateOrUpdateTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<Topic>> {
    return createOrUpdateTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrUpdateTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createOrUpdateTopic(params: CreateOrUpdateTopic$Params, context?: HttpContext): Observable<Topic> {
    return this.createOrUpdateTopic$Response(params, context).pipe(
      map((r: StrictHttpResponse<Topic>): Topic => r.body)
    );
  }

  /** Path part for operation `assignArticlesToTopics()` */
  static readonly AssignArticlesToTopicsPath = '/api/topics/assign-articles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignArticlesToTopics()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  assignArticlesToTopics$Response(params: AssignArticlesToTopics$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return assignArticlesToTopics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `assignArticlesToTopics$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  assignArticlesToTopics(params: AssignArticlesToTopics$Params, context?: HttpContext): Observable<void> {
    return this.assignArticlesToTopics$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllattachedTopics()` */
  static readonly GetAllattachedTopicsPath = '/api/topics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllattachedTopics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllattachedTopics$Response(params: GetAllattachedTopics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TopicResponse>>> {
    return getAllattachedTopics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllattachedTopics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllattachedTopics(params: GetAllattachedTopics$Params, context?: HttpContext): Observable<Array<TopicResponse>> {
    return this.getAllattachedTopics$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TopicResponse>>): Array<TopicResponse> => r.body)
    );
  }

  /** Path part for operation `getAllTopics()` */
  static readonly GetAllTopicsPath = '/api/topics/topics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTopics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTopics$Response(params?: GetAllTopics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TopicResponse>>> {
    return getAllTopics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTopics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTopics(params?: GetAllTopics$Params, context?: HttpContext): Observable<Array<TopicResponse>> {
    return this.getAllTopics$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TopicResponse>>): Array<TopicResponse> => r.body)
    );
  }

  /** Path part for operation `getTopicTree()` */
  static readonly GetTopicTreePath = '/api/topics/learning-path/{id}/topics/tree';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTopicTree()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicTree$Response(params: GetTopicTree$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: {
};
}>> {
    return getTopicTree(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTopicTree$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicTree(params: GetTopicTree$Params, context?: HttpContext): Observable<{
[key: string]: {
};
}> {
    return this.getTopicTree$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: {
};
}>): {
[key: string]: {
};
} => r.body)
    );
  }

}
