import { Injectable } from '@angular/core';
import { Tray } from '../models/tray.model';
import { Seed } from '../models/seed.model';
import { SeedApiService } from './seed-api.service';

@Injectable({
  providedIn: 'root'
})
export class TrayService {

  constructor(private seedApiService:SeedApiService) { }

  fetchSeed(): Observable<Seed[]> {
    console.log('seed.service has called fetchSeed()');
    return this.seedApiService.getSeeds().pipe(
      map((data: any[]) => {
        console.log(data);

        // Map the array of data to an array of Seed objects
        const seeds: Seed[] = data.map(seedData => {
          return new Seed(
            seedData.variety.id,
            // You may need to adjust these properties based on the actual structure of your data
            seedData.variety.name,
            seedData.variety.type.name
          );
        });
        return seeds; // Return the array of seeds to the subscriber
      }),
      catchError((error) => {
        console.error('Error fetching seeds:', error);
        return throwError(() => error); // Re-throw the error
      })
    );
  }

  initializeGrid(tray:Tray): void {
    for (let i = 0; i < tray.cellsShort; i++) {
      // Initialize a new row
      tray.gridValues[i] = [];

      for (let j = 0; j < tray.cellsLong; j++) {
        // Uhhh... Maybe lots of bugs around this new Seed init
        tray.gridValues[i][j] = new Seed(0, '', '');
      }
    }
  }
}
