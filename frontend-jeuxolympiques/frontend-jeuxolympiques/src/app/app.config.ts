import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptors} from "./interceptors/auth.interceptors";
import {dataInterceptors} from "./interceptors/data.interceptors";



export let appConfig: ApplicationConfig;
appConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptors, dataInterceptors]),),
    {provide: LOCALE_ID, useValue: 'fr-FR'}]
};
