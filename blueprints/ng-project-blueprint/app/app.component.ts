import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/repeatWhen';
import 'rxjs/add/operator/retryWhen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private jqueryUtilsService: JqueryUtilsService,
    private translateService: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('he');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('he');
    // translateService.
  }
}
