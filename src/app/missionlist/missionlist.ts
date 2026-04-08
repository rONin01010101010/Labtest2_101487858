import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpaceXApiService } from '../network/spacexapi';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  imports: [CommonModule, RouterLink, MatCardModule, MatListModule, MatProgressSpinnerModule],
  templateUrl: './missionlist.html',
  styleUrl: './missionlist.css',
})
export class Missionlist implements OnInit {
  missions: Mission[] = [];
  loading = true;
  error = '';

  constructor(private spaceXApi: SpaceXApiService) {}

  ngOnInit(): void {
    this.spaceXApi.getAllLaunches().subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load missions.';
        this.loading = false;
      }
    });
  }
}
