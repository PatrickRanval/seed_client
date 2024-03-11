import { Injectable } from '@angular/core';
import { Seed } from '../models/seed.model';
import { SeedApiService } from './seed-api.service';
import { Subject, Observable, map, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  public defaultSeed:Seed = new Seed(
    0,
    'Pepper',
    "Habanero"
  )

  seedSelected = new BehaviorSubject<Seed>(this.defaultSeed);
  seedShelf = new Subject<Seed[]>();

  private mySeeds:Seed[] = [this.defaultSeed];


  constructor(private seedApiService: SeedApiService) {
    //MORE DEBUG METHOD
    this.fetchSeed().subscribe({
      next: (seed) => this.addSeedsToShelf(seed),
      error: (error) => console.error('Error fetching seed:', error)
    });
  }

  fetchSeed(): Observable<Seed[]> {
    console.log('seed.service has called fetchSeed()');
    return this.seedApiService.getSeeds().pipe(
      map((data: any[]) => {
        console.log(data);

        // Map the array of data to an array of Seed objects
        const seeds: Seed[] = data.map(seedData => {
          return new Seed(
            seedData.id,
            // You may need to adjust these properties based on the actual structure of your data
            seedData.variety.name,
            seedData.variety.type.name
          );
        });
        return seeds; // Return the array of seeds to the subscriber
      }),
      catchError((error) => {
        console.error('Error fetching seeds:', error);
        return throwError(() => error); // Re-throw the error
      })
    );
  }
  //Debugging method

 returnDefault() {
      return this.defaultSeed;
 }

 addSeedsToShelf (seeds:Seed[]) {
  this.mySeeds.push(...seeds);
  this.seedShelf.next([...this.mySeeds]);
  console.log(this.mySeeds);
 }

  // addSeedToShelf (seed:Seed) {
  //     this.mySeeds.push(seed);
  //     this.seedShelf.next([...this.mySeeds]);
  //     console.log(this.mySeeds);
  // }

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

  getSeedShelf() {
    return [...this.mySeeds];
  }

  setSelectedSeedById(id:number){                          //this method is used a lot
    let selectedSeed = this.mySeeds.slice()[id];
    this.seedSelected.next(selectedSeed);
  }

  // setSelectedSeed(seed: Seed) {
  //   this.seedSelected.next(seed);
  // }
}
