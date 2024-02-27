import { Injectable } from '@angular/core';
import { Seed } from '../models/seed.model';

@Injectable({
  providedIn: 'root'
})
export class SeedApiService {

  constructor() { }

  getSeeds(id: number) {
    // DUMMY METHOD STAND-IN
    return {
      id: 0,
      type: 'Cucumber',
      name: 'Piccolo'
    };
  }

  // deriveDisplayColor(name:string){
  //   let h = 0
  //   let s = 70
  //   let l = 50

  //   h = ((name.charCodeAt(0)%12)*30)+name.length

  //   if (name.length%2 == 0 && name.length <= 30) {
  //     l = 50 + name.length
  //   } else if (name.length%2 != 0 && name.length <= 30) {
  //     l = 50 - name.length
  //   } else {
  //     l
  //   }

  //   return `hsl(${h}, ${s}%, ${l}%)`;
  // }
}
