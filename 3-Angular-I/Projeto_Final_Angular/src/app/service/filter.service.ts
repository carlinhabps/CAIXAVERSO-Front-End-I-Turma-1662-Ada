import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _filterSource = new BehaviorSubject<any>(null);
  filters$ = this._filterSource.asObservable();

  updateFilter(filter: any) {
    this._filterSource.next(filter);
  }
}
