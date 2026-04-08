import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpaceXApiService {
  private baseUrl = 'https://api.spacexdata.com/v3/launches';
  private detailsCache = new Map<number, Observable<Mission>>();

  constructor(private http: HttpClient) {}

  getLaunches(limit: number, offset: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }

  getLaunchesByYear(year: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}?launch_year=${year}`);
  }

  getMissionDetails(flightNumber: number): Observable<Mission> {
    if (!this.detailsCache.has(flightNumber)) {
      const req$ = this.http.get<Mission>(`${this.baseUrl}/${flightNumber}`).pipe(
        shareReplay(1)
      );
      this.detailsCache.set(flightNumber, req$);
    }
    return this.detailsCache.get(flightNumber)!;
  }
}
