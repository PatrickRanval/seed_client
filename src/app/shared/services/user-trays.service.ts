import { Injectable } from '@angular/core';
import { SeedApiService } from './seed-api.service';
import { Tray } from '../models/tray.model';
import { Seed } from '../models/seed.model';
import { BehaviorSubject, Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTraysService {

  defaultTray = new Tray(null, "Default 128", 8, 16, null);
  private myUserTrays: Tray[] = [this.defaultTray];

  userTraySelected = new BehaviorSubject<Tray | null>(this.defaultTray);
  userTrayShelf = new BehaviorSubject<Tray[] | null>(this.myUserTrays);

  constructor(private seedApiService: SeedApiService) {
    this.fetchUserTrays().subscribe({
      next: (userTrays) => this.populateShelf(userTrays),
      error: (error) => console.error('Error fetching seed:', error)
    });
  }

  // SCOPE:

  // user-trays needs to be able to map generic trays and populate their gridValues
  // user-trays will save these mapped generic trays as unique objects associated with the user
  // user-trays will be invoked within the tray component

  fetchUserTrays(): Observable<Tray[]> {
    this.myUserTrays = [];
    return this.seedApiService.getUserTrays().pipe(
      map((data: any[]) => {
        // Map the array of data to an array of Tray objects
        const trays: Tray[] = data.map(trayData => {
            return new Tray(
            // THIS NEEDS WORK
            // DATA FROM
            trayData.id,
            trayData.tray.name,
            trayData.tray.cells_short,
            trayData.tray.cells_long,
            new Date(trayData.created_at),
            this.parseGrid(trayData.seed_map, trayData.tray.cells_short, trayData.tray.cells_long)
          );
        });
        debugger
        return trays;
      }),
      catchError((error) => {
        console.error('Error fetching seeds:', error);
        return throwError(() => error); // Re-throw the error
      })
    );
    // This method gets all the user_trays
  }

  unpackUserTray() {
    // This method takes the gridValues from userTraySelected and maps it to the display
  }

  saveUserTray(tray: Tray) {
    // This method takes the userTraySelected in its current state and sends it to the database.
    // This method should prevent saving empty trays.

    // Check if the tray already exists in myUserTrays
    const index = this.myUserTrays.indexOf(tray)

    if (index !== -1) {
      // Tray already exists, update it
      this.myUserTrays[index] = tray;
    } else {
      // Tray doesn't exist, add it to the array
      this.myUserTrays.push(tray);
    }
    // Broadcast updated array
    this.userTrayShelf.next(this.myUserTrays);

    // Now that myUserTrays is updated, you may want to send it to the database
    this.sendTrayToDB(tray);
  }

  sendTrayToDB(tray: Tray) {

    let userTrayObject = {
      // tray.uid is referring to :user_tray_id
      user_tray_id: tray.uid,
      // appending tray_name to match to tray_id in database
      tray_name: tray.trayName,
      // seed map to be a TEXT representing Seed[]
      // square bracketing everything is an experimental solution
      seed_map: JSON.stringify(tray.gridValues.flatMap(row => row))
    };
    console.log(userTrayObject);
    this.seedApiService.createOrUpdateUserTray(userTrayObject, tray.uid).subscribe(() => {
      this.fetchUserTrays().subscribe({
        next: (tray) => this.populateShelf(tray),
        error: (error) => console.error('Error fetching seed:', error)
      });
    });
  }

  populateShelf(userTrays: Tray[]) {
    this.myUserTrays.push(...userTrays);
    this.userTrayShelf.next([...this.myUserTrays]);
  }

  // I think it is possible or even likely that all tray rendering logic winds up in user-tray.service (which would move initialize grid from tray.service to user_tray.service)

  setSelectedUserTray(tray: any) {
    this.populateGrid(tray);
    this.userTraySelected.next(tray);
  }

  populateGrid(tray: Tray): void {
    for (let i = 0; i < tray.cellsShort; i++) {
      if (!tray.gridValues[i]) {
        tray.gridValues[i] = []; // Initialize the row only if it hasn't been initialized yet
      }

      for (let j = 0; j < tray.cellsLong; j++) {
        if (!tray.gridValues[i][j]) {
          tray.gridValues[i][j] = new Seed(0, '', ''); // Initialize a new seed only if the cell is empty
        }
      }
    }
  }

  parseGrid(seedMapString: any, cellsShort: number, cellsLong: number): Seed[][] {
    // Initialize gridValues with correct type information
    let gridValues: Seed[][] = [];

    // Check if seedMapString is null
    if (seedMapString !== null) {
      //This was absolutely silly complicated
      const seedMap: Seed[] = JSON.parse(seedMapString, this.seedReviver);

      // Initialize index for accessing seeds from seedMap
      let seedIndex = 0;

      // Iterate over rows
      for (let i = 0; i < cellsShort; i++) {
        // Initialize row
        gridValues[i] = [];

        // Iterate over columns
        for (let j = 0; j < cellsLong; j++) {
          // Check if there are more seeds in the seedMap
          if (seedIndex < seedMap.length) {
            // Assign seed from seedMap to grid position
            gridValues[i][j] = seedMap[seedIndex];
            seedIndex++;
          } else {
            // If no more seeds, initialize with default seed
            gridValues[i][j] = new Seed(0, '', '');
          }
        }
      }
    } else {
      // If seedMapString is null, populate the grid with default seeds
      for (let i = 0; i < cellsShort; i++) {
        // Initialize row
        gridValues[i] = [];

        // Populate row with default seeds
        for (let j = 0; j < cellsLong; j++) {
          gridValues[i][j] = new Seed(0, '', '');
        }
      }
    }

    return gridValues;
  }

  seedReviver(key: any, value: any): any {
    // Check if the value is an array of objects with properties matching Seed class
    if (Array.isArray(value) && value.every(obj => typeof obj === 'object' && obj !== null && 'type' in obj && 'variety' in obj)) {
        // Reconstruct an array of Seed objects using the properties from the JSON data
        return value.map(obj => new Seed(obj.uid, obj.type, obj.variety));
    }
    // Return the original value if it doesn't match the expected format
    return value;
}

  onDeleteUserTray(tray:Tray) {
    this.seedApiService.removeUserTray(tray).subscribe(() => {
      this.fetchUserTrays().subscribe({
        next: (tray) => this.populateShelf(tray),
        error: (error) => console.error('Error fetching User Trays:', error)
    });
  })

}
}
