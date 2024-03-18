import { Injectable } from '@angular/core';
import { SeedApiService } from './seed-api.service';
import { Tray } from '../models/tray.model';
import { Seed } from '../models/seed.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTraysService {

  constructor(private seedApiService:SeedApiService) { }

  userTraySelected = new BehaviorSubject<Tray | null>(null);
  userTrayShelf = new BehaviorSubject<Tray[] | null>(null);

  private availableUserTrays:Tray[] = [];


  //SCOPE:

  //user-trays needs to be able to map generic trays and populate their gridValues
  //user-trays will save these mapped generic trays as unique objects associated with the user
  //user-trays will be invoked within the tray component

  fetchUserTrays(){
    //This method gets all the user_trays and sets userTraySelected to the .last value of the array
    this.seedApiService.getUserTrays();
  }

  unpackUserTray(){
    //This method takes the gridValues from userTraySelected and maps it to the display
  }

  packUserTray() {
    //this method logically exists, but is likely unnecessary
  }

  saveUserTray(){
    //this method takes the userTraySelected in its current state and sends it to the database.
    //This method should prevent saving empty trays.
    this.seedApiService.postUserTrays();
  }

  //I think it is possible or even likely that all tray rendering logic winds up in user-tray.service (which would move initialize grid from tray.service to user_tray.service)


}
