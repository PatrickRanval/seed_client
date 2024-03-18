import { Injectable } from '@angular/core';
import { Tray } from '../models/tray.model';
import { Seed } from '../models/seed.model';
import { SeedApiService } from './seed-api.service';
import { Subject, Observable, map, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrayService {

  traySelected = new BehaviorSubject<Tray | null>(null);

  //START HERE TOMORROW:
  //Blind changed trayShelf from Subject to BehaviorSubject and initiated on hunch that this might fix an issue.
  //Possibly unwise. Too tired to chase it down and verify whether that fixes things tonight.

  trayShelf = new BehaviorSubject<Tray[] | null>(null);

  private availableTrays:Tray[] = [];

  constructor(private seedApiService:SeedApiService) {

  //Fix to initialize with ngOnInit and unsubscribe ngOnDestroy
  
  this.fetchTrays().subscribe({
    next: (tray) => this.addTraysToShelf(tray),
    error: (error) => console.error('Error fetching trays:', error)
  });

  }

  fetchTrays(): Observable<Tray[]> {
    console.log('tray.service has called fetchTray()');
    return this.seedApiService.getTrays().pipe(
      map((data: any[]) => {
        console.log(data);

        // Map the array of data to an array of Tray objects
        const trays: Tray[] = data.map(trayData => {
          return new Tray(
            trayData.name,
            trayData.cells_short,
            trayData.cells_long
          );
        });
        return trays; // Return the array of trays to the subscriber
      }),
      catchError((error) => {
        console.error('Error fetching trays:', error);
        return throwError(() => error); // Re-throw the error
      })
    );
  }

  addTraysToShelf (trays:Tray[]) {
    this.availableTrays.push(...trays);
    this.trayShelf.next([...this.availableTrays]);
    console.log(this.availableTrays);
  }

  getTrayShelf() {
    return [...this.availableTrays];
  }

  //These may move to user_tray.service:

  setSelectedTray(tray:any){
    this.initializeGrid(tray);
    this.traySelected.next(tray);
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
