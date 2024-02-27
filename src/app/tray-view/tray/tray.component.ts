import { Component, OnInit } from '@angular/core';
import { Seed } from '../../shared/models/seed.model';
import { SeedService } from '../../shared/services/seed.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tray',
  standalone: true,
  imports: [],
  templateUrl: './tray.component.html',
  styleUrl: './tray.component.scss'
})
export class TrayComponent implements OnInit {
  gridRows = 8
  gridCols = 16
  gridValues: Seed[][] = [];

  seedSelected!: Seed;
  private seedSelectedSubscription!: Subscription;

  constructor(private seedService: SeedService) {}

  ngOnInit() {
    this.initializeGrid();

    this.seedSelectedSubscription = this.seedService.seedSelected.subscribe((seed) => {
      this.seedSelected = seed;
    });
  }

  ngOnDestroy() {
    this.seedSelectedSubscription.unsubscribe();
  }

  initializeGrid(): void {
    for (let i = 0; i < this.gridRows; i++) {
      // Initialize a new row
      this.gridValues[i] = [];

      for (let j = 0; j < this.gridCols; j++) {
        // Uhhh... Maybe lots of bugs around this new Seed init
        this.gridValues[i][j] = new Seed(0, '', '');
      }
    }
  }

  setGridValue(row: number, col: number) {
    this.gridValues[row][col] = this.seedSelected;
  }

}
