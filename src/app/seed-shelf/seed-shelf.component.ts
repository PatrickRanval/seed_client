import { Component } from '@angular/core';
import { Seed } from '../shared/models/seed.model';
import { SeedService } from '../shared/services/seed.service';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeedCollectionComponent } from './seed-collection/seed-collection.component';
import { SeedSearchComponent } from './seed-search/seed-search.component';

@Component({
  selector: 'app-seed-shelf',
  standalone: true,
  imports: [CommonModule, FormsModule, SeedCollectionComponent, SeedSearchComponent],
  templateUrl: './seed-shelf.component.html',
  styleUrl: './seed-shelf.component.scss'
})
export class SeedShelfComponent {

  constructor() {}



  //DEBUG METHODS

}
