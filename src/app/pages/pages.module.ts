import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@pages/pages.module.material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MeComponent } from './me/me.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { TranslocoRootModule } from '@app/translate/transloco-root.module';
import { AppRoutingModule } from '@app/routing/app-routing.module';
import { AuthorizationService, HttpErrorHandler, LoggingService, RequestCache, RequestCacheWithMap } from '@app/core/services';
import { AppRoutingGuard, AppRoutingService } from '@app/routing';
@NgModule({
  declarations: [MainComponent, MeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslocoModule,
    TranslocoRootModule
  ],
  exports: [MainComponent],
  providers: [
    HttpErrorHandler,
    LoggingService,
    {
      provide: RequestCache,
      useClass: RequestCacheWithMap,
    },
    AuthorizationService,
    TranslocoService,
    AppRoutingService,
    AppRoutingGuard,
  ],
})
export class PagesModule {}
