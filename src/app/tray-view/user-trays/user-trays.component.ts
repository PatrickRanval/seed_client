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
    this.userTraySubscription = this.userTrayService.userTrayShelf.subscribe(trays => {
      this.availableUserTrays = trays;
    });
    this.userTraySelectedSubscription = this.userTrayService.userTraySelected.subscribe(tray => {
      this.selectedUserTray = tray;
    });
  }

  onSelectTray(tray:Tray) {
    this.userTrayService.setSelectedUserTray(tray)
  }

  onFetchUserTrays() {
    this.userTrayService.fetchUserTrays().subscribe({
      next: (userTrays) => this.userTrayService.populateShelf(userTrays),
      error: (error) => console.error('Error fetching seed:', error)
    });
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
