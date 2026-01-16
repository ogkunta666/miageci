import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Course } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8000/api/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCourses(search?: string, sortBy?: string, sortOrder?: string, page: number = 1): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    
    if (search) {
      params = params.set('search', search);
    }
    if (sortBy) {
      params = params.set('sort_by', sortBy);
    }
    if (sortOrder) {
      params = params.set('sort_order', sortOrder);
    }

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      tap(response => this.coursesSubject.next(response.data))
    );
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(() => this.getCourses().subscribe())
    );
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap(() => this.getCourses().subscribe())
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getCourses().subscribe())
    );
  }

  addCourse(course: Course) {
    const currentCourses = this.coursesSubject.value;
    this.coursesSubject.next([course, ...currentCourses]);
  }
}