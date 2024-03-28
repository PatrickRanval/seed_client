import { Injectable } from '@angular/core';
import { Seed } from '../models/seed.model';
import { SeedApiService } from './seed-api.service';
import { Subject, Observable, map, BehaviorSubject, catchError, throwError, tap, pipe, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  seedSelected = new BehaviorSubject<Seed | null>(null);
  seedShelf = new Subject<Seed[]>();

  private mySeeds:Seed[] = [];


  constructor(private seedApiService: SeedApiService) {

    //Does this need ngOnInit? No problems yet... unsubscribe...???

    this.fetchSeeds().subscribe({
      next: (seed) => this.populateShelf(seed),
      error: (error) => console.error('Error fetching seed:', error)
    });

  }

  fetchSeeds(): Observable<Seed[]> {
    this.mySeeds = [];
    console.log('seed.service has called fetchSeed()');
    return this.seedApiService.getSeeds().pipe(
      map((data: any[]) => {
        console.log("From fetchSeeds in seed.service.ts", data);

        // Map the array of data to an array of Seed objects
        const seeds: Seed[] = data.map(seedData => {
          return new Seed(
            seedData.variety.id,
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

populateShelf (seeds:Seed[]) {
  this.mySeeds.push(...seeds);
  this.seedShelf.next([...this.mySeeds]);
  console.log(this.mySeeds);
}

getSeedShelf() {
  return [...this.mySeeds];
}

setSelectedSeed(seed:any){
  this.seedSelected.next(seed);
}

addSeedToShelf (seed:Seed) {
      this.mySeeds.push(seed);
      this.seedShelf.next([...this.mySeeds]);
  }

removeSeedFromShelf(seed:Seed) {
  const index = this.mySeeds.findIndex(item => item === seed);
  // If the seed is found, remove it from the array
  if (index !== -1) {
    this.mySeeds.splice(index, 1);
    // Emit the updated array using the BehaviorSubject
    this.seedShelf.next([...this.mySeeds]);
  }
}

sendSeedToDB(seed: Seed) {
  const seedDataToRails = {
    type_name: seed.type,
    variety_name: seed.variety
  };

  this.seedApiService.sendSeed(seedDataToRails).subscribe(() => {
  this.fetchSeeds().subscribe({
    next: (seed) => this.populateShelf(seed),
    error: (error) => console.error('Error fetching seed:', error)
  });
  });
}

}

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
  //Debugging method

  // returnDefault() {
  //   console.log("Debug returnDefault() triggered from seed.service.ts")
  //     // return this.defaultSeed;
  // }



