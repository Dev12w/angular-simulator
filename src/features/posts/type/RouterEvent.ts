import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';

export type RouterEvent = NavigationStart | NavigationEnd | NavigationCancel | NavigationError;
