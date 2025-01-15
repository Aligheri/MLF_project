/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createLearningPath } from '../fn/learning-path-controller/create-learning-path';
import { CreateLearningPath$Params } from '../fn/learning-path-controller/create-learning-path';
import { deleteLearningPath } from '../fn/learning-path-controller/delete-learning-path';
import { DeleteLearningPath$Params } from '../fn/learning-path-controller/delete-learning-path';
import { editLearningPathDescription } from '../fn/learning-path-controller/edit-learning-path-description';
import { EditLearningPathDescription$Params } from '../fn/learning-path-controller/edit-learning-path-description';
import { editLearningPathTitle } from '../fn/learning-path-controller/edit-learning-path-title';
import { EditLearningPathTitle$Params } from '../fn/learning-path-controller/edit-learning-path-title';
import { getAllLearningPaths } from '../fn/learning-path-controller/get-all-learning-paths';
import { GetAllLearningPaths$Params } from '../fn/learning-path-controller/get-all-learning-paths';
import { LearningPath } from '../models/learning-path';
import { LearningPathResponse } from '../models/learning-path-response';

@Injectable({ providedIn: 'root' })
export class LearningPathControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllLearningPaths()` */
  static readonly GetAllLearningPathsPath = '/api/learning-paths';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllLearningPaths()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLearningPaths$Response(params?: GetAllLearningPaths$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LearningPath>>> {
    return getAllLearningPaths(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllLearningPaths$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLearningPaths(params?: GetAllLearningPaths$Params, context?: HttpContext): Observable<Array<LearningPath>> {
    return this.getAllLearningPaths$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LearningPath>>): Array<LearningPath> => r.body)
    );
  }

  /** Path part for operation `createLearningPath()` */
  static readonly CreateLearningPathPath = '/api/learning-paths';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createLearningPath()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createLearningPath$Response(params: CreateLearningPath$Params, context?: HttpContext): Observable<StrictHttpResponse<LearningPathResponse>> {
    return createLearningPath(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createLearningPath$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createLearningPath(params: CreateLearningPath$Params, context?: HttpContext): Observable<LearningPathResponse> {
    return this.createLearningPath$Response(params, context).pipe(
      map((r: StrictHttpResponse<LearningPathResponse>): LearningPathResponse => r.body)
    );
  }

  /** Path part for operation `editLearningPathTitle()` */
  static readonly EditLearningPathTitlePath = '/api/learning-paths/{id}/title';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editLearningPathTitle()` instead.
   *
   * This method doesn't expect any request body.
   */
  editLearningPathTitle$Response(params: EditLearningPathTitle$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return editLearningPathTitle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editLearningPathTitle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  editLearningPathTitle(params: EditLearningPathTitle$Params, context?: HttpContext): Observable<void> {
    return this.editLearningPathTitle$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `editLearningPathDescription()` */
  static readonly EditLearningPathDescriptionPath = '/api/learning-paths/{id}/description';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editLearningPathDescription()` instead.
   *
   * This method doesn't expect any request body.
   */
  editLearningPathDescription$Response(params: EditLearningPathDescription$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return editLearningPathDescription(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editLearningPathDescription$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  editLearningPathDescription(params: EditLearningPathDescription$Params, context?: HttpContext): Observable<void> {
    return this.editLearningPathDescription$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteLearningPath()` */
  static readonly DeleteLearningPathPath = '/api/learning-paths/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLearningPath()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLearningPath$Response(params: DeleteLearningPath$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteLearningPath(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLearningPath$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLearningPath(params: DeleteLearningPath$Params, context?: HttpContext): Observable<void> {
    return this.deleteLearningPath$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
