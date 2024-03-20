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
  cellSize: string = '2rem'; // Default width

  seedSelected!: Seed | null;
  private seedSelectedSubscription!: Subscription;

  traySelected!: Tray | null;
  private traySelectedSubscription!: Subscription;

  constructor(private seedService: SeedService, private trayService:TrayService, private userTrayService:UserTraysService) {}

  ngOnInit() {

    //To quote Kanye "This s*** kray!" Here we subscribe to the traySelected in the trayService
    this.traySelectedSubscription = this.trayService.traySelected.subscribe((tray) => {
      this.traySelected = tray;
      this.calculateCSS()
    });
    //But hold up, because here we also subscribe to the userTraySelected in the userTrayService
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

  setGridValue(row: number, col: number) {
    if (this.traySelected && this.seedSelected) {
    this.traySelected.gridValues[row][col] = this.seedSelected;
    }
  }


}
