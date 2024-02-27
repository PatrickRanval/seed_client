import { Injectable } from '@angular/core';
import { Seed } from '../models/seed.model';
import { SeedApiService } from './seed-api.service';
import { Subject, Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  seedSelected = new BehaviorSubject<Seed>(null);
  seedShelf = new Subject<Seed[]>();

  private mySeeds:Seed[] = [];

  public defaultSeed:Seed = new Seed(
    0,
    'Cucumber',
    'Piccolo',
    "hsl(247, 70%, 43%)"
  )

  constructor(private seedApiService: SeedApiService) { }

  fetchSeed(id: number): Observable<Seed> {
    return this.seedApiService.getSeeds(id).pipe(
      map((data: any) => {
        return new Seed(
          data.id,
          data.type,
          data.name,
          data.name)
        })
    );
  }

    //Debugging method

  //   returnDefault() {
  //     return this.defaultSeed;
  //   }

  //   addSeedToShelf (seed:Seed) {
  //     this.mySeeds.push(seed);
  //     this.seedShelf.next([...this.mySeeds]);
  //     console.log(this.mySeeds);
  //   }

  //   editSeedOnShelf(editedSeed:Seed, id) {
  //     this.mySeeds.splice(id, 1, editedSeed);
  //     this.seedShelf.next([...this.mySeeds]);
  //     this.seedSelected.next(editedSeed);
  //   }

  //   removeSeedFromShelf (idx:number) {
  //     if (idx !== -1) {
  //       this.mySeeds.splice(idx, 1)
  //       this.seedShelf.next([...this.mySeeds]);
  //       this.setSelectedSeedById(idx);
  //       // this.seedSelected.next(this.defaultSeed);
  //     }
  //   }

  //   getSeedShelf() {
  //   return [...this.mySeeds];
  // }

  // setSelectedSeedById(id){                          //this method is used a lot
  //   let selectedSeed = this.mySeeds.slice()[id];
  //   this.seedSelected.next(selectedSeed);
  // }

  // setSelectedSeed(seed: Seed) {
  //   this.seedSelected.next(seed);
  // }
}
