import { Injectable } from '@angular/core';
import { Seed } from '../models/seed.model';
import { SeedApiService } from './seed-api.service';
import { Observable, map, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  seedSelected = new BehaviorSubject<Seed | null>(null);
  seedShelf = new BehaviorSubject<Seed[] | null>(null);

  private mySeeds:Seed[] = [];


  constructor(private seedApiService: SeedApiService) {


    this.fetchSeeds().subscribe({
      next: (seeds) => this.populateShelf(seeds),
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
            //seedData.id is the user_variety reference
            seedData.id,
            seedData.variety.type.name,
            seedData.variety.name
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
  let seedUid = seed.uid || 0;
  this.seedApiService.removeSeed(seedUid).subscribe(() => {
    this.fetchSeeds().subscribe({
      next: (seed) => this.populateShelf(seed),
      error: (error) => console.error('Error fetching seed:', error)
    });
    });
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

searchSeedVariety(queryString:string): Observable<Seed[]> {

  return this.seedApiService.searchVariety(queryString).pipe(
    map((data: any[]) => {
      const searchedSeeds: Seed[] = data.map(seedData => {
        return new Seed(
          seedData.id,
          seedData.type.name,
          seedData.name
        );
      });
      return searchedSeeds; // Return the array of seeds to the subscriber
    }),
    catchError((error) => {
      console.error('Error fetching seeds:', error);
      return throwError(() => error); // Re-throw the error
    })
  );

}

}



