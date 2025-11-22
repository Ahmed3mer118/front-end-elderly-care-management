import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: false
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showForm = false;
  editingUser: User | null = null;
  readonly roleLabels: Record<string, string> = {
    admin: 'Admin',
    caregiver: 'Caregiver',
    family_member: 'Family Member'
  };
  userForm: User = {
    username: '',
    email: '',
    role: 'family_member',
    password: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (data:any) => {this.users = data.data , console.log(data.data)},
      error: (err) => console.error('Error loading users:', err)
    });
  }

  openAddForm() {
    this.editingUser = null;
    this.userForm = {
      username: '',
      email: '',
      role: 'family_member',
      password: ''
    };
    this.showForm = true;
  }

  openEditForm(user: User) {
    this.editingUser = user;
    this.userForm = { ...user };
    this.showForm = true;
  }

  saveUser() {
    console.log('Current userForm:', this.userForm);
    // Validate form data
    if (!this.userForm.username || !this.userForm.email) {
      alert('Please fill out all required fields');
      return;
    }

    const userData: User = {
      username: this.userForm.username.trim(),
      email: this.userForm.email.trim(),
      role: this.userForm.role,
      password: this.userForm.password ? this.userForm.password.trim() : undefined
    };

    // Remove password if it's undefined to avoid sending empty values
    if (!userData.password) {
      delete (userData as any).password;
    }

    console.log('Sending user data:', JSON.stringify(userData));

    if (this.editingUser) {
      this.userService.update(this.editingUser.user_id!, userData).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.loadUsers();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error updating user:', err);
          alert('An error occurred while updating the user: ' + (err.error?.message || err.message));
        }
      });
    } else {
      if (!userData.password) {
        alert('Password is required for new users');
        return;
      }
      this.userService.create(userData).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.loadUsers();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating user:', err);
          alert('An error occurred while creating the user: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editingUser = null;
  }

  getRoleLabel(role: string): string {
    return this.roleLabels[role] || role;
  }
}

