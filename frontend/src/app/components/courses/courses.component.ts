import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { WebsocketService } from '../../services/websocket.service';
import { Course } from '../../models/models';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="courses">
      <div class="header">
        <h1>Courses</h1>
        <button class="btn btn-primary" (click)="openCreateModal()">
          <span class="material-icons">add</span>
          Create Course
        </button>
      </div>

      <div class="filters card">
        <div class="search-box">
          <span class="material-icons">search</span>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search courses..."
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange($event)">
        </div>
        
        <div class="sort-controls">
          <select class="form-control" [(ngModel)]="sortBy" (ngModelChange)="onSortChange()">
            <option value="created_at">Created Date</option>
            <option value="title">Title</option>
            <option value="difficulty">Difficulty</option>
          </select>
          
          <button class="btn btn-secondary" (click)="toggleSortOrder()">
            <span class="material-icons">{{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}</span>
          </button>
        </div>
      </div>

      <div class="courses-grid">
        <div class="card course-card" *ngFor="let course of courses">
          <div class="course-header">
            <h3>{{ course.title }}</h3>
            <span class="badge badge-{{ course.status }}">{{ course.status }}</span>
          </div>
          <p class="course-description">{{ course.description }}</p>
          <div class="course-meta">
            <span class="difficulty-badge difficulty-{{ course.difficulty }}">
              {{ course.difficulty }}
            </span>
            <span class="instructor">
              <span class="material-icons">person</span>
              {{ course.instructor?.name || 'No instructor' }}
            </span>
          </div>
          <div class="course-actions">
            <a [routerLink]="['/courses', course.id]" class="btn btn-primary">
              <span class="material-icons">visibility</span>
              View
            </a>
            <button class="btn btn-success" (click)="editCourse(course)">
              <span class="material-icons">edit</span>
              Edit
            </button>
            <button class="btn btn-error" (click)="deleteCourse(course.id!)">
              <span class="material-icons">delete</span>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div class="pagination" *ngIf="totalPages > 1">
        <button class="btn" [disabled]="currentPage === 1" (click)="changePage(currentPage - 1)">
          <span class="material-icons">chevron_left</span>
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="btn" [disabled]="currentPage === totalPages" (click)="changePage(currentPage + 1)">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .courses {
      padding: 24px 0;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    
    .filters {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .search-box {
      flex: 1;
      position: relative;
    }
    
    .search-box .material-icons {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
    }
    
    .search-box input {
      padding-left: 44px;
    }
    
    .sort-controls {
      display: flex;
      gap: 8px;
    }
    
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }
    
    .course-card {
      display: flex;
      flex-direction: column;
      transition: transform 0.2s;
    }
    
    .course-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .course-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 12px;
    }
    
    .course-header h3 {
      margin: 0;
    }
    
    .badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .badge-planned {
      background: #e0e7ff;
      color: #3730a3;
    }
    
    .badge-active {
      background: #dcfce7;
      color: #166534;
    }
    
    .badge-completed {
      background: #e2e8f0;
      color: #334155;
    }
    
    .course-description {
      color: #64748b;
      margin-bottom: 16px;
      flex: 1;
    }
    
    .course-meta {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .difficulty-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .difficulty-beginner {
      background: #dcfce7;
      color: #166534;
    }
    
    .difficulty-intermediate {
      background: #fef3c7;
      color: #92400e;
    }
    
    .difficulty-advanced {
      background: #fee2e2;
      color: #991b1b;
    }
    
    .instructor {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #64748b;
      font-size: 14px;
    }
    
    .instructor .material-icons {
      font-size: 18px;
    }
    
    .course-actions {
      display: flex;
      gap: 8px;
    }
    
    .course-actions .btn {
      flex: 1;
      font-size: 14px;
      padding: 0 12px;
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }
    
    @media (max-width: 768px) {
      .filters {
        flex-direction: column;
      }
      
      .courses-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  searchQuery = '';
  sortBy = 'created_at';
  sortOrder: 'asc' | 'desc' = 'desc';
  currentPage = 1;
  totalPages = 1;
  
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.loadCourses();
    this.setupSearch();
    this.listenToWebSocket();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.currentPage = 1;
      this.loadCourses();
    });
  }

  loadCourses() {
    this.courseService.getCourses(
      this.searchQuery,
      this.sortBy,
      this.sortOrder,
      this.currentPage
    ).subscribe(response => {
      this.courses = response.data;
      this.totalPages = response.last_page;
    });
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  onSortChange() {
    this.loadCourses();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadCourses();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadCourses();
  }

  openCreateModal() {
    // TODO: Implement modal for creating course
    console.log('Open create modal');
  }

  editCourse(course: Course) {
    // TODO: Implement edit functionality
    console.log('Edit course:', course);
  }

  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  listenToWebSocket() {
    this.websocketService.listen('CourseCreated')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.loadCourses();
      });
  }
}