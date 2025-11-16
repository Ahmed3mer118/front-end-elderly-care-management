import { Component, OnInit } from '@angular/core';
import { Elderly } from '../../models/elderly.model';
import { ElderlyService } from '../../core/services/elderly.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-elderly',
  templateUrl: './elderly.component.html',
  styleUrl: './elderly.component.css',
  standalone: false
})
export class ElderlyComponent implements OnInit {
  elderly: Elderly[] = [];
  users: User[] = [];
  showForm = false;
  editingElderly: Elderly | null = null;
  elderlyForm: Elderly = {
    full_name: '',
    birth_date: '',
    gender: 'male',
    health_condition: '',
    blood_type: 'O+',
    address: '',
    emergency_contact: '',
    users_user_id: 0
  };

  constructor(
    private elderlyService: ElderlyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadElderly();
    this.loadUsers();
  }

  loadElderly() {
    this.elderlyService.getAll().subscribe({
      next: (data: any) => {
        this.elderly = data.data || data;
        console.log('Elderly data:', this.elderly);
      },
      error: (err) => console.error('Error loading elderly:', err)
    });
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (data: any) => {
        this.users = data.data || data;
        console.log('Users data:', this.users);
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  openAddForm() {
    this.editingElderly = null;
    this.elderlyForm = {
      full_name: '',
      birth_date: '',
      gender: 'male',
      health_condition: '',
      blood_type: 'O+',
      address: '',
      emergency_contact: '',
      users_user_id: 0
    };
    this.showForm = true;
  }

  openEditForm(elderly: Elderly) {
    this.editingElderly = elderly;
    this.elderlyForm = { ...elderly };
    this.showForm = true;
  }

  saveElderly() {
    console.log('Current elderlyForm:', this.elderlyForm);
    
    // التحقق من صحة البيانات
    if (!this.elderlyForm.full_name || !this.elderlyForm.birth_date || !this.elderlyForm.users_user_id || this.elderlyForm.users_user_id === 0) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // إنشاء نسخة من البيانات مع تنظيفها
    const elderlyData: Elderly = {
      full_name: this.elderlyForm.full_name.trim(),
      birth_date: this.elderlyForm.birth_date,
      gender: this.elderlyForm.gender,
      health_condition: this.elderlyForm.health_condition ? this.elderlyForm.health_condition.trim() : '',
      blood_type: this.elderlyForm.blood_type,
      address: this.elderlyForm.address.trim(),
      emergency_contact: this.elderlyForm.emergency_contact.trim(),
      users_user_id: Number(this.elderlyForm.users_user_id)
    };

    console.log('Sending elderly data:', JSON.stringify(elderlyData));

    if (this.editingElderly) {
      this.elderlyService.update(this.editingElderly.elderly_id!, elderlyData).subscribe({
        next: (response: any) => {
          console.log('Elderly updated successfully:', response);
          this.loadElderly();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error updating elderly:', err);
          alert('حدث خطأ أثناء تحديث المسن: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.elderlyService.create(elderlyData).subscribe({
        next: (response: any) => {
          console.log('Elderly created successfully:', response);
          this.loadElderly();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating elderly:', err);
          alert('حدث خطأ أثناء إنشاء المسن: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteElderly(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا المسن؟')) {
      this.elderlyService.delete(id).subscribe({
        next: () => this.loadElderly(),
        error: (err) => console.error('Error deleting elderly:', err)
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editingElderly = null;
  }
}

