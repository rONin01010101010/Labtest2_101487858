import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SpaceXApiService } from '../network/spacexapi';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './missiondetails.html',
  styleUrl: './missiondetails.css',
})
export class Missiondetails implements OnInit {
  mission: Mission | null = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private spaceXApi: SpaceXApiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spaceXApi.getMissionDetails(id).subscribe({
      next: (data) => {
        this.mission = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load mission details.';
        this.loading = false;
      }
    });
  }
}
