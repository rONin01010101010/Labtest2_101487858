import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { SpaceXApiService } from '../network/spacexapi';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionfilter',
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatButtonToggleModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './missionfilter.html',
  styleUrl: './missionfilter.css',
})
export class Missionfilter {
  years: string[] = ['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'];
  selectedYear = '';
  missions: Mission[] = [];
  loading = false;
  error = '';

  constructor(private spaceXApi: SpaceXApiService) {}

  filterByYear(year: string): void {
    this.selectedYear = year;
    this.loading = true;
    this.error = '';
    this.spaceXApi.getLaunchesByYear(year).subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load missions.';
        this.loading = false;
      }
    });
  }
}
