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
  // gridRows = 8
  // gridCols = 16
  // gridValues: Seed[][] = [];

  seedSelected!: Seed;
  private seedSelectedSubscription!: Subscription;

  traySelected!: Tray;
  private traySelectedSubscription!: Subscription;

  constructor(private seedService: SeedService, private trayService:TrayService) {}

  ngOnInit() {
    // this.initializeGrid();
    this.traySelectedSubscription = this.trayService.traySelected.subscribe((tray) => {
      this.traySelected = tray;
    })

    this.seedSelectedSubscription = this.seedService.seedSelected.subscribe((seed) => {
      this.seedSelected = seed;
    });
  }

  ngOnDestroy() {
    this.traySelectedSubscription.unsubscribe();
    this.seedSelectedSubscription.unsubscribe();
  }

  // initializeGrid(): void {
  //   for (let i = 0; i < this.gridRows; i++) {
  //     // Initialize a new row
  //     this.gridValues[i] = [];

  //     for (let j = 0; j < this.gridCols; j++) {
  //       // Uhhh... Maybe lots of bugs around this new Seed init
  //       this.gridValues[i][j] = new Seed(0, '', '');
  //     }
  //   }
  // }

  setGridValue(row: number, col: number) {
    this.traySelected.gridValues[row][col] = this.seedSelected;
  }

}
