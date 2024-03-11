import { Component } from '@angular/core';
import { SeedService } from '../../shared/services/seed.service';
import { Subscription } from 'rxjs';
import { Seed } from '../../shared/models/seed.model';

@Component({
  selector: 'app-variety-selector',
  standalone: true,
  imports: [],
  templateUrl: './variety-selector.component.html',
  styleUrl: './variety-selector.component.scss'
})

export class VarietySelectorComponent {
  // ! is disabling strict, which causes an initilization error to be thrown on these declarations
  // Dunno if this is best practice but it make red line go away

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

  onGetSpecificSeed(seed:any) {
    this.seedService.setSelectedSeed(seed);
  }
}
