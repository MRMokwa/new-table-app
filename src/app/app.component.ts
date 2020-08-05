import { Component } from '@angular/core';

import { DataViewService } from './data-view/data-view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataViewService],
})
export class AppComponent {}
