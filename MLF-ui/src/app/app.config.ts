import {ApplicationConfig} from '@angular/core';

import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(),withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    }, provideAnimationsAsync(),
  ],
};
