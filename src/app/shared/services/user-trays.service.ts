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

  defaultTray = new Tray(null, "Default 128", 8, 16)
  private availableUserTrays:Tray[] = [this.defaultTray];

  userTraySelected = new BehaviorSubject<Tray | null>(this.defaultTray);
  userTrayShelf = new BehaviorSubject<Tray[] | null>(this.availableUserTrays);



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


  saveUserTray(tray: Tray) {
    // This method takes the userTraySelected in its current state and sends it to the database.
    // This method should prevent saving empty trays.

    // Check if the tray already exists in availableUserTrays
    const index = this.availableUserTrays.indexOf(tray)

    if (index !== -1) {
        // Tray already exists, update it
        this.availableUserTrays[index] = tray;
    } else {
        // Tray doesn't exist, add it to the array
        this.availableUserTrays.push(tray);
    }
    //broadcast updated array
    this.userTrayShelf.next(this.availableUserTrays);

    // Now that availableUserTrays is updated, you may want to send it to the database
    this.sendTrayToDB(tray);
}

sendTrayToDB(tray:Tray) {

  let userTrayObject = {
    //tray.uid is referring to :user_tray_id
    user_tray_id: tray.uid,
    //appending tray_name to match to tray_id in database
    tray_name: tray.trayName,
    //seed map to be a TEXT representing Seed[]
    seed_map: tray.gridValues.flatMap(row => row.map(seed => JSON.stringify(seed))).join(',')
  };
  console.log(userTrayObject);
  this.seedApiService.createOrUpdateUserTray(userTrayObject, tray.uid).subscribe(() => {
    // this.fetchUserTrays().subscribe({
    //   next: (tray) => this.populateShelf(tray),
    //   error: (error) => console.error('Error fetching seed:', error)
    // });
    console.log('SUCCESS user-tray.service sendSeedToDB')
    });
  //MORE WORK HERE???:
}


  //I think it is possible or even likely that all tray rendering logic winds up in user-tray.service (which would move initialize grid from tray.service to user_tray.service)

  setSelectedUserTray(tray:any){
    this.populateGrid(tray);
    this.userTraySelected.next(tray);
  }

  populateGrid(tray: Tray): void {
    for (let i = 0; i < tray.cellsShort; i++) {
      if (!tray.gridValues[i]) {
            tray.gridValues[i] = []; // Initialize the row only if it hasn't been initialized yet
        }

        for (let j = 0; j < tray.cellsLong; j++) {
            if (!tray.gridValues[i][j]) {
                tray.gridValues[i][j] = new Seed(0, '', ''); // Initialize a new seed only if the cell is empty
            }
        }
    }
}
}
