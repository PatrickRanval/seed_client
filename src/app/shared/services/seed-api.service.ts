import { Injectable } from '@angular/core';
import { of, Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Seed } from '../models/seed.model';


@Injectable({
  providedIn: 'root'
})
export class SeedApiService {

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  getAuth(email: string, password: string) {
		return this.http.post<{ token: string }>(`${environment.apiUrl}/login`, {
			email,
			password,
		});
	}

  getSeeds(): Observable<any> {
    const id = this.route.snapshot.paramMap.get('id');

    // HARD CODING URL FOR DEBUG
    let res = this.http.get<any>(`${environment.apiUrl}/users/8/user_varieties`)
      .pipe(
        catchError(this.handleError)
      );
    console.log(`Response Data:`, res);
    return res;
  }

  private handleError(error: any) {

    console.error('FAIL, client side', error);

    // Rethrow the error or return a custom error message
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}

  // getSeeds(id: number): Observable<any> {
  //   // DUMMY METHOD STAND-IN
  //   const dummyData = {
  //     id: 1,
  //     type: 'Tomato',
  //     name: 'Black Pineapple'
  //   };

  //   // Use of to create an observable that emits the dummy data
  //   return of(dummyData);
  // }

