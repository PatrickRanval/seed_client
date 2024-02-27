import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeedApiService {

  constructor() { }

  getSeeds(id: number): Observable<any> {
    // DUMMY METHOD STAND-IN
    const dummyData = {
      id: 1,
      type: 'Tomato',
      name: 'Black Pineapple'
    };

    // Use of to create an observable that emits the dummy data
    return of(dummyData);
  }
}
