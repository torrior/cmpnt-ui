import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandler } from '@app/core/services';
import { catchError } from 'rxjs';

@Injectable()
export class TranslocoHttpLoader implements TranslocoLoader {
  private handleError: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('MessagesService');
  }

  getTranslation(langPath: string) {
    return this.http
      .get<Translation>(`./assets/i18n/${langPath}.json`)
      .pipe(
        catchError(this.handleError<Translation>('getTranslation', undefined))
      );
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'pl'],
        fallbackLang: ['en', 'pl'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
        flatten: {
          aot: environment.production,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
