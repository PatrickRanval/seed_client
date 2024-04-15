import { Component, OnInit } from '@angular/core';
import { Seed } from '../../shared/models/seed.model';
import { Tray } from '../../shared/models/tray.model';
import { SeedService } from '../../shared/services/seed.service';
import { Subscription } from 'rxjs';
import { TrayService } from '../../shared/services/tray.service';
import { UserTraysService } from '../../shared/services/user-trays.service';

@Component({
  selector: 'app-tray',
  standalone: true,
  imports: [],
  templateUrl: './tray.component.html',
  styleUrl: './tray.component.scss'
})
export class TrayComponent implements OnInit {
  cellSize:string = '2rem'; // Default width
  saveSuccess:boolean = false;

  seedSelected: Seed | null = null;
  private seedSelectedSubscription!: Subscription;

  traySelected: Tray | null = null;
  private traySelectedSubscription!: Subscription;

  constructor(private seedService: SeedService, private trayService:TrayService, private userTrayService:UserTraysService) {}

  ngOnInit() {

    //This is cool, dual subscriptions to one variable
    this.traySelectedSubscription = this.trayService.traySelected.subscribe((tray) => {
      this.traySelected = tray;
      this.calculateCSS()
    });
    //We also subscribe to the userTraySelected in the userTrayService
    this.traySelectedSubscription = this.userTrayService.userTraySelected.subscribe((userTray) => {
      this.traySelected = userTray;
      this.calculateCSS()
    })

    this.seedSelectedSubscription = this.seedService.seedSelected.subscribe((seed) => {
      this.seedSelected = seed;
    });
  }

  ngOnDestroy() {
    this.traySelectedSubscription.unsubscribe();
    this.seedSelectedSubscription.unsubscribe();
  }

  saveAsUserTray(tray: Tray) {

    //The use of structured clone is interesting/important because of a genuine memory address issue here
    let updatedTray = structuredClone(tray);

    //We check if that value is non-null and already includes the tray being passed
    //If so, simply save the tray which is identical to its current state
    if (this.userTrayService.userTrayShelf.value && this.userTrayService.userTrayShelf.value.includes(tray)) {
        this.userTrayService.saveUserTray(tray);
        //But if we don't have that tray, we save our structuredClone, updatedTray
        //This was necessary to allow duplicates of generic trays
    } else {
        this.userTrayService.saveUserTray(updatedTray);
    }
    this.summonSuccess();
  }

  calculateCSS(){
    if(this.traySelected) {
      const totalCells = this.traySelected.cellsShort * this.traySelected.cellsLong;
      const containerWidth = 24; // in rem
      const containerHeight = 12; // in rem
      const cellArea = containerWidth * containerHeight / totalCells;
      const cellSize = Math.sqrt(cellArea);
      this.cellSize = `${cellSize}rem`;
    }
  }

  setSelectedFromTray(seed:Seed){
    this.seedService.seedSelected.next(seed);
  }

  setGridValue(row: number, col: number) {
    if (this.traySelected && this.seedSelected) {
    this.traySelected.gridValues[row][col] = this.seedSelected;
    }
  }

  setGridRow(row: number){
    if (this.traySelected && this.seedSelected) {
        for (let j = 0; j < this.traySelected.cellsLong; j++) {
        // Initialize a seed in each cell, overwrites any value there
          this.traySelected.gridValues[row][j] = this.seedSelected;
          }
      }
  }

  setGridCol(col: number){
    if (this.traySelected && this.seedSelected) {
      for (let i = 0; i < this.traySelected.cellsShort; i++) {
      // Initialize a seed in each cell, overwrites any value there
        this.traySelected.gridValues[i][col] = this.seedSelected;
        }
    }
  }

  setGridAll(){
    if (this.traySelected && this.seedSelected) {
      for (let i = 0; i < this.traySelected.cellsShort; i++) {

          this.traySelected.gridValues[i] = []; // Initialize the row only if it hasn't been initialized yet


        for (let j = 0; j < this.traySelected.cellsLong; j++) {
            this.traySelected.gridValues[i][j] = this.seedSelected;
          }
        }

      }
    }

  summonSuccess() {
    this.saveSuccess = true;

    setTimeout(() => {
        this.saveSuccess = false;
    }, 800);
  }

  getIterable(length: number): any[] {
    return new Array(length);
  }


}
