import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DashboardStats } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8000/api';
  private statsSubject = new BehaviorSubject<DashboardStats>({
    total_courses: 0,
    active_courses: 0,
    completed_courses: 0
  });
  public stats$ = this.statsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`).pipe(
      tap(stats => this.statsSubject.next(stats))
    );
  }

  updateStats(stats: DashboardStats) {
    this.statsSubject.next(stats);
  }
}