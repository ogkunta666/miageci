import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students: Student[] = [];
  studentForm: FormGroup;
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      name: [''],
      email: [''],
    });
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  addStudent() {
    if (this.studentForm.valid) {
      this.studentService.addStudent(this.studentForm.value).subscribe(() => {
        this.loadStudents();
        this.studentForm.reset();
      });
    }
  }

  editStudent(student: Student) {
    this.studentForm.patchValue(student);
  }

  updateStudent() {
    // Logic to update the student
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  search() {
    // Logic for search functionality
    this.students = this.students.filter(student => 
      student.name.includes(this.searchTerm) || 
      student.email.includes(this.searchTerm)
    );
  }

  sortBy(field: string) {
    this.students.sort((a, b) => a[field].localeCompare(b[field]));
  }

  paginate() {
    // Logic for pagination
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.students.slice(start, start + this.itemsPerPage);
  }
}