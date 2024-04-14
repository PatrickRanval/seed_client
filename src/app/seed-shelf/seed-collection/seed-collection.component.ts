import { Component } from '@angular/core';
import { Seed } from '../../shared/models/seed.model';
import { SeedService } from '../../shared/services/seed.service';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seed-collection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seed-collection.component.html',
  styleUrl: './seed-collection.component.scss'
})
export class SeedCollectionComponent {
  seedCollection: Seed[] | null = null;
  seedSelected: Seed | null = null;
  private seedShelfSubscription!: Subscription;
  private seedSelectedSubscription!: Subscription;

  constructor(private seedService: SeedService, private userService:UserService) {}

  //Not sure about this:
  type:string = '';
  variety:string = '';


  ngOnInit() {
    this.seedCollection = this.seedService.getSeedShelf();
      this.seedShelfSubscription = this.seedService.seedShelf.subscribe((collection) => {
      this.seedCollection = collection;
    });

    this.seedSelectedSubscription = this.seedService.seedSelected.subscribe((seed) => {
      this.seedSelected = seed;
    });
  }

  ngOnDestroy() {

    this.seedShelfSubscription.unsubscribe();
    this.seedSelectedSubscription.unsubscribe();
  }

  onGetSpecificSeed(seed:any) {
    this.seedService.setSelectedSeed(seed);
  }

  onCreateSeed() {
    const seed = new Seed(null, this.type, this.variety);

    this.seedService.sendSeedToDB(seed);
    this.type = '';
    this.variety = '';
}

  onRemoveSeed(seed:Seed) {
   this.seedService.removeSeedFromShelf(seed);
  }

  //DEBUG METHODS

}
