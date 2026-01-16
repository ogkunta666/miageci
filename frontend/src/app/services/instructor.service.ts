import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instructor } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = 'http://localhost:8000/api/instructors';

  constructor(private http: HttpClient) {}

  getInstructors(search?: string, sortBy?: string, sortOrder?: string, page: number = 1): Observable<any> {
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

    return this.http.get<any>(this.apiUrl, { params });
  }

  getInstructor(id: number): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`);
  }

  createInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl, instructor);
  }

  updateInstructor(id: number, instructor: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.apiUrl}/${id}`, instructor);
  }

  deleteInstructor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}