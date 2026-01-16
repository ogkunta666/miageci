import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { WebsocketService } from '../../services/websocket.service';
import { DashboardStats } from '../../models/models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <span class="material-icons">school</span>
          </div>
          <div class="stat-content">
            <h3>Total Courses</h3>
            <p class="stat-value">{{ stats.total_courses }}</p>
          </div>
        </div>
        
        <div class="stat-card active">
          <div class="stat-icon">
            <span class="material-icons">play_circle</span>
          </div>
          <div class="stat-content">
            <h3>Active Courses</h3>
            <p class="stat-value">{{ stats.active_courses }}</p>
          </div>
        </div>
        
        <div class="stat-card completed">
          <div class="stat-icon">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="stat-content">
            <h3>Completed Courses</h3>
            <p class="stat-value">{{ stats.completed_courses }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: DashboardStats = {
    total_courses: 0,
    active_courses: 0,
    completed_courses: 0
  };
  
  private destroy$ = new Subject<void>();

  constructor(
    private dashboardService: DashboardService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.listenToWebSocket();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStats() {
    this.dashboardService.stats$
      .pipe(takeUntil(this.destroy$))
      .subscribe(stats => {
        this.stats = stats;
      });
    
    this.dashboardService.getStats().subscribe();
  }

  listenToWebSocket() {
    this.websocketService.listen('CourseCreated')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.dashboardService.getStats().subscribe();
      });
  }
}