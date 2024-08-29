import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";
import {importProvidersFrom} from "@angular/core";
import {FormsModule} from "@angular/forms";

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    importProvidersFrom(FormsModule)
  ]
}).catch((err) => console.error(err));

