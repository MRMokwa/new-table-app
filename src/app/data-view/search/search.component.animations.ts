import {
  trigger,
  state,
  style,
  transition,
  animate,
  AUTO_STYLE,
} from '@angular/animations';

export const SEARCH_ANIMATIONS = [
  trigger('inputState', [
    state(
      '0',
      style({
        width: '0',
        margin: '0px',
      })
    ),
    state(
      '1',
      style({
        width: '100%',
        margin: AUTO_STYLE,
      })
    ),
    transition('0 => 1', animate('200ms ease-in')),
    transition('1 => 0', animate('200ms ease-out')),
  ]),
];
