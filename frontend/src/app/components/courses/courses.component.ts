import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CourseService } from './course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  searchTerm$ = new Subject<string>();
  courseForm: FormGroup;
  isEditing = false;
  currentCourseId: number;

  constructor(private courseService: CourseService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.loadCourses();
    this.setupSearch();
    this.setupWebSocket();
  }

  initializeForm() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  loadCourses() {
    this.courses$ = this.courseService.getCourses();
  }

  setupSearch() {
    this.searchTerm$.pipe(debounceTime(300)).subscribe(term => {
      this.courses$ = this.courseService.searchCourses(term);
    });
  }

  onSearch(term: string) {
    this.searchTerm$.next(term);
  }

  createOrUpdateCourse() {
    if (this.courseForm.invalid) return;
    const course = this.courseForm.value;

    if (this.isEditing) {
      this.courseService.updateCourse(this.currentCourseId, course).subscribe(() => {
        this.loadCourses();
        this.resetForm();
      });
    } else {
      this.courseService.createCourse(course).subscribe(() => {
        this.loadCourses();
        this.resetForm();
      });
    }
  }

  editCourse(course: Course) {
    this.isEditing = true;
    this.currentCourseId = course.id;
    this.courseForm.patchValue(course);
  }

  resetForm() {
    this.isEditing = false;
    this.currentCourseId = null;
    this.courseForm.reset();
  }

  setupWebSocket() {
    this.courseService.listenForUpdates().subscribe(course => {
      this.loadCourses(); // Reload courses on update
    });
  }
}

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  status: string;
}