import { Component } from '@angular/core';
import { Seed } from '../shared/models/seed.model';
import { SeedService } from '../shared/services/seed.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seed-shelf',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seed-shelf.component.html',
  styleUrl: './seed-shelf.component.scss'
})
export class SeedShelfComponent {
  seedCollection!: Seed[];
  seedSelected: Seed | null = null;
  private seedShelfSubscription!: Subscription;
  private seedSelectedSubscription!: Subscription;

  constructor(private seedService: SeedService) {}

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

  onCreateSeed(){
    //We need some thinky work on how to implement this. The null solution is lazy.
    let seed = new Seed(null, this.type, this.variety)
    this.seedService.addSeedToShelf(seed)
    this.type = '';
    this.variety = '';
  }

  onRemoveSeed(seed:Seed) {
   this.seedService.removeSeedFromShelf(seed);
  }

  //DEBUG METHODS

}
