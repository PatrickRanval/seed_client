import { Component, OnInit } from '@angular/core';

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
  gridValues: number[][] = [];

  ngOnInit() {
    this.initializeGrid();
  }

  initializeGrid(): void {
    for (let i = 0; i < this.gridRows; i++) {
      // Initialize a new row
      this.gridValues[i] = [];

      for (let j = 0; j < this.gridCols; j++) {
        // Set each value to 0
        this.gridValues[i][j] = 0;
      }
    }
  }

  setGridValue(row: number, col: number, value: number) {
    this.gridValues[row][col] = value;
  }

}
