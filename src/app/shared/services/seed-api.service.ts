import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeedApiService {

  constructor(private http:HttpClient, private router:Router) { }

  getAuth(email: string, password: string) {
		return this.http.post<{ token: string }>('http://localhost:3000/login', {
			email,
			password,
		});
	}

  getSeeds(id: number): Observable<any> {
    // DUMMY METHOD STAND-IN
    const dummyData = {
      id: 1,
      type: 'Tomato',
      name: 'Black Pineapple'
    };

    // Use of to create an observable that emits the dummy data
    return of(dummyData);
  }
}
