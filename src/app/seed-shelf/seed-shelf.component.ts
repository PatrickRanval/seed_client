import { Component } from '@angular/core';
import { Seed } from '../shared/models/seed.model';
import { SeedService } from '../shared/services/seed.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seed-shelf',
  standalone: true,
  imports: [],
  templateUrl: './seed-shelf.component.html',
  styleUrl: './seed-shelf.component.scss'
})
export class SeedShelfComponent {
  seedCollection!: Seed[];
  seedSelected!: Seed;
  private seedShelfSubscription!: Subscription;
  private seedSelectedSubscription!: Subscription;

  constructor(private seedService: SeedService) {}

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

  onGetSpecificSeed(i:number) {
    this.seedService.setSelectedSeedById(i);
  }

  onRemoveSeed(uid:number) {
   console.log("You should build the remove seed method");
  }
}
