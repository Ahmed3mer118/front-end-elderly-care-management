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
    // التحقق من صحة البيانات
    if (!this.userForm.username || !this.userForm.email) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const userData: User = {
      username: this.userForm.username.trim(),
      email: this.userForm.email.trim(),
      role: this.userForm.role,
      password: this.userForm.password ? this.userForm.password.trim() : undefined
    };

    // إزالة password إذا كان undefined لتجنب إرسالها فارغة
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
          alert('حدث خطأ أثناء تحديث المستخدم: ' + (err.error?.message || err.message));
        }
      });
    } else {
      if (!userData.password) {
        alert('كلمة المرور مطلوبة للمستخدمين الجدد');
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
          alert('حدث خطأ أثناء إنشاء المستخدم: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
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
}

