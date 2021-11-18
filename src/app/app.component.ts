import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'cmpnt-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslocoService, private title: Title) {
    title.setTitle('CMPNT UI|UX examples');
  }
  ngOnInit(): void {
    this.translate.setActiveLang('en');
  }
}
