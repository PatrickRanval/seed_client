import { Component } from '@angular/core';
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

}
