import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/students';

  constructor(private http: HttpClient) {}

  getStudents(search?: string, sortBy?: string, sortOrder?: string, page: number = 1): Observable<any> {
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

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}