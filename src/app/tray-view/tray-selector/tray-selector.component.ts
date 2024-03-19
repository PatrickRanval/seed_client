import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tray } from '../../shared/models/tray.model';
import { TrayService } from '../../shared/services/tray.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tray-selector',
  standalone: true,
  imports: [],
  templateUrl: './tray-selector.component.html',
  styleUrl: './tray-selector.component.scss'
})

export class TraySelectorComponent implements OnInit, OnDestroy {
  hide:boolean = false;

  availableTrays:Tray[] | null = [];
  selectedTray:Tray | null = null;
  private traySubscription!: Subscription;
  private traySelectedSubscription!: Subscription;

  constructor(private trayService:TrayService) {}

  ngOnInit(): void {
    this.traySubscription = this.trayService.trayShelf.subscribe(trays => {
      this.availableTrays = trays;
    });
    this.traySelectedSubscription = this.trayService.traySelected.subscribe(tray => {
      this.selectedTray = tray;
    });
  }

  onSelectTray(tray:Tray) {
    this.trayService.setSelectedTray(tray)
  }
  
  toggleHide(){
    this.hide = !this.hide;
  }

  ngOnDestroy(): void {
    if (this.traySubscription) {
      this.traySubscription.unsubscribe();
    }
    if (this.traySelectedSubscription) {
      this.traySelectedSubscription.unsubscribe();
    }
  }
}
