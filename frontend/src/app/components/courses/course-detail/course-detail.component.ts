import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/models';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="course-detail" *ngIf="course">
      <div class="card">
        <div class="detail-header">
          <h1>{{ course.title }}</h1>
          <span class="badge badge-{{ course.status }}">{{ course.status }}</span>
        </div>
        
        <div class="detail-section">
          <h3>Description</h3>
          <p>{{ course.description }}</p>
        </div>
        
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">Difficulty</span>
            <span class="difficulty-badge difficulty-{{ course.difficulty }}">
              {{ course.difficulty }}
            </span>
          </div>
          
          <div class="detail-item">
            <span class="label">Instructor</span>
            <span class="value">{{ course.instructor?.name || 'Not assigned' }}</span>
          </div>
          
          <div class="detail-item">
            <span class="label">Created At</span>
            <span class="value">{{ course.created_at | date:'medium' }}</span>
          </div>
          
          <div class="detail-item" *ngIf="course.updated_at">
            <span class="label">Last Updated</span>
            <span class="value">{{ course.updated_at | date:'medium' }}</span>
          </div>
        </div>
        
        <div class="actions">
          <a routerLink="/courses" class="btn btn-secondary">
            <span class="material-icons">arrow_back</span>
            Back to Courses
          </a>
          <button class="btn btn-primary">
            <span class="material-icons">edit</span>
            Edit Course
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .course-detail {
      padding: 24px 0;
    }
    
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid var(--color-background);
    }
    
    .detail-section {
      margin-bottom: 24px;
    }
    
    .detail-section h3 {
      color: var(--color-secondary);
      margin-bottom: 8px;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .detail-item .label {
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
    }
    
    .detail-item .value {
      font-size: 16px;
      color: var(--color-text);
    }
    
    .badge {
      padding: 6px 16px;
      border-radius: 12px;
      font-size: 14px;
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
    
    .difficulty-badge {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      text-transform: capitalize;
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
    
    .actions {
      display: flex;
      gap: 12px;
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getCourse(+id).subscribe(course => {
        this.course = course;
      });
    }
  }
}