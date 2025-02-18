import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withInterceptorsFromDi(),withFetch())
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
