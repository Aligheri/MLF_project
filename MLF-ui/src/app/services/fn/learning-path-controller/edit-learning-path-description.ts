/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface EditLearningPathDescription$Params {
  id: number;
  newDescription: string;
}

export function editLearningPathDescription(http: HttpClient, rootUrl: string, params: EditLearningPathDescription$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, editLearningPathDescription.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('newDescription', params.newDescription, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

editLearningPathDescription.PATH = '/api/learning-paths/{id}/description';
