import { Injectable } from '@angular/core';
import { Tray } from '../models/tray.model';
import { Seed } from '../models/seed.model';
import { SeedApiService } from './seed-api.service';
import { Observable, map, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrayService {

  traySelected = new BehaviorSubject<Tray | null>(null);
  trayShelf = new BehaviorSubject<Tray[] | null>(null);

  private availableTrays:Tray[] = [];

  constructor(private seedApiService:SeedApiService) {

  this.fetchTrays().subscribe({
    next: (tray) => this.addTraysToShelf(tray),
    error: (error) => console.error('Error fetching trays:', error)
  });

  }

  fetchTrays(): Observable<Tray[]> {
    console.log('tray.service has called fetchTray()');
    return this.seedApiService.getTrays().pipe(
      map((data: any[]) => {
        // Map the array of data to an array of Tray objects
        const trays: Tray[] = data.map(trayData => {
          return new Tray(
            null,
            trayData.name,
            trayData.cells_short,
            trayData.cells_long,
            null
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
