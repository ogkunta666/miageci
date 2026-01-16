import { Component } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  template: `
    <div class="course-detail">
      <h2>{{ course.title }}</h2>
      <p><strong>Status:</strong> {{ course.status }}</p>
      <p><strong>Difficulty:</strong> {{ course.difficulty }}</p>
      <p><strong>Instructor:</strong> {{ course.instructor }}</p>
      <p><strong>Created Date:</strong> {{ course.createdDate | date }}</p>
      <p><strong>Description:</strong> {{ course.description }}</p>
    </div>
  `,
  styles: [`
    .course-detail {
      border: 1px solid #ccc;
      padding: 15px;
      margin: 10px;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    .course-detail h2 {
      color: #333;
    }
  `]
})
export class CourseDetailComponent {
  course = {
    title: 'Introduction to Angular',
    status: 'Active',
    difficulty: 'Intermediate',
    instructor: 'John Doe',
    createdDate: new Date('2023-03-15'),
    description: 'Learn the fundamentals of Angular framework.'
  };
}