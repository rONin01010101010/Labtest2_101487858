import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SpaceXApiService } from '../network/spacexapi';
import { Mission } from '../models/mission';

const PAGE_SIZE = 20;

@Component({
  selector: 'app-missionlist',
  imports: [RouterLink, MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './missionlist.html',
  styleUrl: './missionlist.css',
})
export class Missionlist implements OnInit {
  missions: Mission[] = [];
  loading = true;
  loadingMore = false;
  error = '';
  hasMore = true;
  private offset = 0;

  constructor(private spaceXApi: SpaceXApiService) {}

  ngOnInit(): void {
    this.fetchPage();
  }

  fetchPage(): void {
    this.spaceXApi.getLaunches(PAGE_SIZE, this.offset).subscribe({
      next: (data) => {
        this.missions = [...this.missions, ...data];
        this.offset += data.length;
        this.hasMore = data.length === PAGE_SIZE;
        this.loading = false;
        this.loadingMore = false;
      },
      error: () => {
        this.error = 'Failed to load missions.';
        this.loading = false;
        this.loadingMore = false;
      }
    });
  }

  loadMore(): void {
    this.loadingMore = true;
    this.fetchPage();
  }
}
