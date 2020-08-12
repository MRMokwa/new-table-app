import { Component } from '@angular/core';

import { DataViewStateService } from './data-view/data-view-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataViewStateService],
})
export class AppComponent {}
