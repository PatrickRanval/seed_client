import { Component } from '@angular/core';
import { Tray } from '../../shared/models/tray.model';
import { Subscription } from 'rxjs';
import { UserTraysService } from '../../shared/services/user-trays.service';

@Component({
  selector: 'app-user-trays',
  standalone: true,
  imports: [],
  templateUrl: './user-trays.component.html',
  styleUrl: './user-trays.component.scss'
})
export class UserTraysComponent {

  availableUserTrays:Tray[] | null = [];
  selectedUserTray:Tray | null = null;
  private userTraySubscription!: Subscription;
  private userTraySelectedSubscription!: Subscription;

  constructor(private userTrayService:UserTraysService) {}

  ngOnInit(): void {
    this.userTraySubscription = this.userTrayService.trayShelf.subscribe(trays => {
      this.availableTrays = trays;
    });
    this.userTraySelectedSubscription = this.userTrayService.traySelected.subscribe(tray => {
      this.selectedTray = tray;
    });
  }

  onSelectTray(tray:Tray) {
    this.userTrayService.setSelectedTray(tray)
  }

  toggleHide(){
    this.hide = !this.hide;
  }

  ngOnDestroy(): void {
    if (this.userTraySubscription) {
      this.userTraySubscription.unsubscribe();
    }
    if (this.userTraySelectedSubscription) {
      this.userTraySelectedSubscription.unsubscribe();
    }
  }

}
