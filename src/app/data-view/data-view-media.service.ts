import { Injectable } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataViewMediaService {
  constructor(private mediaObserver: MediaObserver) {}

  media$ = this.mediaObserver.asObservable().pipe(
    distinctUntilChanged((prev, curr) => prev[0].mqAlias === curr[0].mqAlias),
    map((arr: MediaChange[]) =>
      arr.map((change: MediaChange) => change.mqAlias)
    )
  );
}
