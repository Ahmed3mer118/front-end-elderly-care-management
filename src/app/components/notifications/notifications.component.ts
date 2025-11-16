import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { NotificationService } from '../../core/services/notification.service';
import { ElderlyService } from '../../core/services/elderly.service';
import { Elderly } from '../../models/elderly.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  standalone: false
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  elderly: Elderly[] = [];
  showForm = false;
  editingNotification: Notification | null = null;
  notificationForm: Notification = {
    elderly_id: 0,
    type: 'info',
    message: '',
    status: 'unread'
  };

  constructor(
    private notificationService: NotificationService,
    private elderlyService: ElderlyService
  ) { }

  ngOnInit() {
    this.loadNotifications();
    this.loadElderly();
  }

  loadNotifications() {
    this.notificationService.getAll().subscribe({
      next: (data: any) => {
        this.notifications = data.data || data;
        console.log('Notifications data:', this.notifications);
      },
      error: (err) => console.error('Error loading notifications:', err)
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
    this.editingNotification = null;
    this.notificationForm = {
      elderly_id: 0,
      type: 'info',
      message: '',
      status: 'unread'
    };
    this.showForm = true;
  }

  openEditForm(notification: Notification) {
    this.editingNotification = notification;
    this.notificationForm = { ...notification };
    this.showForm = true;
  }

  saveNotification() {
    console.log('Current notificationForm:', this.notificationForm);
    
    if (!this.notificationForm.elderly_id || this.notificationForm.elderly_id === 0 || !this.notificationForm.message) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const notificationData: Notification = {
      elderly_id: Number(this.notificationForm.elderly_id),
      type: this.notificationForm.type,
      message: this.notificationForm.message.trim(),
      status: this.notificationForm.status
    };

    console.log('Sending notification data:', JSON.stringify(notificationData));

    if (this.editingNotification) {
      this.notificationService.update(this.editingNotification.notification_id!, notificationData).subscribe({
        next: (response: any) => {
          console.log('Notification updated successfully:', response);
          this.loadNotifications();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error updating notification:', err);
          alert('حدث خطأ أثناء تحديث الإشعار: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.notificationService.create(notificationData).subscribe({
        next: (response: any) => {
          console.log('Notification created successfully:', response);
          this.loadNotifications();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating notification:', err);
          alert('حدث خطأ أثناء إنشاء الإشعار: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteNotification(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا الإشعار؟')) {
      this.notificationService.delete(id).subscribe({
        next: () => this.loadNotifications(),
        error: (err) => console.error('Error deleting notification:', err)
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editingNotification = null;
  }

  getElderlyName(id: number): string {
    const e = this.elderly.find(el => el.elderly_id === id);
    return e ? e.full_name : 'غير معروف';
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'alert': 'تنبيه',
      'reminder': 'تذكير',
      'info': 'معلومة'
    };
    return labels[type] || type;
  }

  getStatusLabel(status: string): string {
    return status === 'read' ? 'مقروء' : 'غير مقروء';
  }
}

