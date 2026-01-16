import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <h1>Course Statistics</h1>
      <div class="card-container">
        <mat-card class="stat-card">
          <mat-card-title>Total Courses</mat-card-title>
          <mat-card-content>{{ totalCourses$ | async }}</mat-card-content>
        </mat-card>
        <mat-card class="stat-card">
          <mat-card-title>Active Courses</mat-card-title>
          <mat-card-content>{{ activeCourses$ | async }}</mat-card-content>
        </mat-card>
        <mat-card class="stat-card">
          <mat-card-title>Completed Courses</mat-card-title>
          <mat-card-content>{{ completedCourses$ | async }}</mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`.dashboard-container { display: flex; flex-direction: column; align-items: center; } .card-container { display: flex; justify-content: space-around; width: 100%; } .stat-card { width: 30%; }`],
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalCourses$ = new BehaviorSubject<number>(0);
  activeCourses$ = new BehaviorSubject<number>(0);
  completedCourses$ = new BehaviorSubject<number>(0);
  private subscriptions: Subscription = new Subscription();

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.courseService.getCourseStatistics().subscribe(statistics => {
        this.totalCourses$.next(statistics.total);
        this.activeCourses$.next(statistics.active);
        this.completedCourses$.next(statistics.completed);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}