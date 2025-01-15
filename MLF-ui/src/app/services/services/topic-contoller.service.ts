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
import { getTopicTreeJson } from '../fn/topic-contoller/get-topic-tree-json';
import { GetTopicTreeJson$Params } from '../fn/topic-contoller/get-topic-tree-json';
import { Topic } from '../models/topic';

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

  /** Path part for operation `getTopicTreeJson()` */
  static readonly GetTopicTreeJsonPath = '/api/topics/{learningPathId}/tree';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTopicTreeJson()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicTreeJson$Response(params: GetTopicTreeJson$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getTopicTreeJson(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTopicTreeJson$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicTreeJson(params: GetTopicTreeJson$Params, context?: HttpContext): Observable<string> {
    return this.getTopicTreeJson$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
