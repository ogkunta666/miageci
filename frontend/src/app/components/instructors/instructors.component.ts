import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Instructor } from './instructor.model';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css'],
})
export class InstructorsComponent {
  instructors: Instructor[] = [];
  instructorForm: FormGroup;
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private fb: FormBuilder) {
    this.instructorForm = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  addInstructor() {
    const instructor: Instructor = this.instructorForm.value;
    this.instructors.push(instructor);
    this.instructorForm.reset();
  }

  editInstructor(index: number) {
    this.instructorForm.patchValue(this.instructors[index]);
    this.instructors.splice(index, 1);
  }

  deleteInstructor(index: number) {
    this.instructors.splice(index, 1);
  }

  get filteredInstructors() {
    return this.instructors.filter(instructor =>
      instructor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  sortInstructors() {
    this.instructors.sort((a, b) => a.name.localeCompare(b.name));
  }

  paginate() {
    return this.filteredInstructors.length / this.itemsPerPage;
  }
}