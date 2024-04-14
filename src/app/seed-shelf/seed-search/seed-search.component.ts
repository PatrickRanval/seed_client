import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { SeedService } from '../../shared/services/seed.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Seed } from '../../shared/models/seed.model';

@Component({
  selector: 'app-seed-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seed-search.component.html',
  styleUrl: './seed-search.component.scss'
})
export class SeedSearchComponent {
  seedSearchResults!: Seed[];

  constructor(private seedService: SeedService, private userService:UserService) {}

  //Not sure about this:
  queryTerm:string = '';
  message:string = '';

  onSearch(search:string){
      this.seedService.searchSeedVariety(search).subscribe({
          next: (results) => this.seedSearchResults = results,
          error: (error) => console.error('Error fetching seed:', error)
        });
  }

  onAddThisSeed(seed:Seed){
    if (!this.compareRecord(seed)) {
      // So we check if we have this seed
      this.seedService.addSeedToShelf(seed);
      //Then we send it to the database if we don't
      //Then rails matches it to the right variety record
      this.seedService.sendSeedToDB(seed);
      //And then repopulates the shelf.
      //Honestly this is kind of lazy but we got deadlines.
    } else {
      this.message = "We already have that seed at home."
      setTimeout(() =>
      this.message = '' , 2500)
    }
  }

  compareRecord(seedToCheck:Seed) {
    if (this.seedService.seedShelf.value) {
      return this.seedService.seedShelf.value.some(seed => seed.type === seedToCheck.type) &&
        this.seedService.seedShelf.value.some(seed => seed.variety === seedToCheck.variety);
    } else {
      return false
    }
  }
}
