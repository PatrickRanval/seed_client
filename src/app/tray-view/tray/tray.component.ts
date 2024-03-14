import { Component, OnInit } from '@angular/core';
import { Seed } from '../../shared/models/seed.model';
import { Tray } from '../../shared/models/tray.model';
import { SeedService } from '../../shared/services/seed.service';
import { Subscription } from 'rxjs';
import { TrayService } from '../../shared/services/tray.service';

@Component({
  selector: 'app-tray',
  standalone: true,
  imports: [],
  templateUrl: './tray.component.html',
  styleUrl: './tray.component.scss'
})
export class TrayComponent implements OnInit {
  cellSize: string = '2rem'; // Default width

  seedSelected!: Seed;
  private seedSelectedSubscription!: Subscription;

  traySelected!: Tray | null;
  private traySelectedSubscription!: Subscription;

  constructor(private seedService: SeedService, private trayService:TrayService) {}

  ngOnInit() {
    this.traySelectedSubscription = this.trayService.traySelected.subscribe((tray) => {
      // Check if tray is not null before assigning
      if (tray) {
        this.traySelected = tray;

        //Sophisticated Method to procedurally render trays:
        const totalCells = this.traySelected.cellsShort * this.traySelected.cellsLong;
        const containerWidth = 24; // in rem
        const containerHeight = 12; // in rem
        const cellArea = containerWidth * containerHeight / totalCells;
        const cellSize = Math.sqrt(cellArea);
        this.cellSize = `${cellSize}rem`;
      }
    });

    this.seedSelectedSubscription = this.seedService.seedSelected.subscribe((seed) => {
      this.seedSelected = seed;
    });
  }

  ngOnDestroy() {
    this.traySelectedSubscription.unsubscribe();
    this.seedSelectedSubscription.unsubscribe();
  }


  setGridValue(row: number, col: number) {
    if (this.traySelected) {
    this.traySelected.gridValues[row][col] = this.seedSelected;
    }
  }


}
