import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../models/assignment.model';
import { AssignmentService } from '../../core/services/assignment.service';
import { ElderlyService } from '../../core/services/elderly.service';
import { Elderly } from '../../models/elderly.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  standalone: false
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  elderly: Elderly[] = [];
  showForm = false;
  editingAssignment: Assignment | null = null;
  assignmentForm: Assignment = {
    elderly_id: 0,
    nurse_id: 0,
    start_date: '',
    end_date: ''
  };

  constructor(
    private assignmentService: AssignmentService,
    private elderlyService: ElderlyService
  ) { }

  ngOnInit() {
    this.loadAssignments();
    this.loadElderly();
  }

  loadAssignments() {
    this.assignmentService.getAll().subscribe({
      next: (data: any) => {
        this.assignments = data.data || data;
        console.log('Assignments data:', this.assignments);
      },
      error: (err) => console.error('Error loading assignments:', err)
    });
  }

  loadElderly() {
    this.elderlyService.getAll().subscribe({
      next: (data: any) => {
        this.elderly = data.data || data;
      },
      error: (err) => console.error('Error loading elderly:', err)
    });
  }

  openAddForm() {
    this.editingAssignment = null;
    this.assignmentForm = {
      elderly_id: 0,
      nurse_id: 0,
      start_date: '',
      end_date: ''
    };
    this.showForm = true;
  }

  openEditForm(assignment: Assignment) {
    this.editingAssignment = assignment;
    this.assignmentForm = { ...assignment };
    this.showForm = true;
  }

  saveAssignment() {
    console.log('Current assignmentForm:', this.assignmentForm);
    
    if (!this.assignmentForm.elderly_id || this.assignmentForm.elderly_id === 0 || !this.assignmentForm.nurse_id || !this.assignmentForm.start_date) {
      alert('Please fill out all required fields');
      return;
    }

    const assignmentData: Assignment = {
      elderly_id: Number(this.assignmentForm.elderly_id),
      nurse_id: Number(this.assignmentForm.nurse_id),
      start_date: this.assignmentForm.start_date,
      end_date: this.assignmentForm.end_date || undefined
    };

    console.log('Sending assignment data:', JSON.stringify(assignmentData));

    if (this.editingAssignment) {
      this.assignmentService.update(this.editingAssignment.assignment_id!, assignmentData).subscribe({
        next: (response: any) => {
          console.log('Assignment updated successfully:', response);
          this.loadAssignments();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error updating assignment:', err);
          alert('An error occurred while updating the assignment: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.assignmentService.create(assignmentData).subscribe({
        next: (response: any) => {
          console.log('Assignment created successfully:', response);
          this.loadAssignments();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating assignment:', err);
          alert('An error occurred while creating the assignment: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteAssignment(id: number) {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.assignmentService.delete(id).subscribe({
        next: () => this.loadAssignments(),
        error: (err) => console.error('Error deleting assignment:', err)
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editingAssignment = null;
  }

  getElderlyName(id: number): string {
    const e = this.elderly.find(el => el.elderly_id === id);
    return e ? e.full_name : 'Unknown';
  }
}

