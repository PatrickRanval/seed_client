import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tray',
  standalone: true,
  imports: [],
  templateUrl: './tray.component.html',
  styleUrl: './tray.component.scss'
})
export class TrayComponent implements OnInit {
  gridRows = 2
  gridCols = 3
  gridValues: number[][] = [];

  ngOnInit() {
    this.initializeGrid();
  }

  initializeGrid() {
    // Initialize gridRows
    for (let i = 0; i < this.gridCols; i++) {
      this.gridValues[i] = []
      for (let j = 0; j < this.gridRows; j++)
        this.gridValues[i][j] = i,j,1
    }
  }

  setGridValue(row: number, col: number, value: number) {
    this.gridValues[row][col] = value;
  }
}
