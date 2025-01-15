/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface EditLearningPathTitle$Params {
  id: number;
  newTitle: string;
}

export function editLearningPathTitle(http: HttpClient, rootUrl: string, params: EditLearningPathTitle$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, editLearningPathTitle.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('newTitle', params.newTitle, {});
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

editLearningPathTitle.PATH = '/api/learning-paths/{id}/title';
