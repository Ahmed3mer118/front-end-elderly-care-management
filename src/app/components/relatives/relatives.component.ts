import { Component, OnInit } from '@angular/core';
import { Relative } from '../../models/relative.model';
import { RelativeService } from '../../core/services/relative.service';
import { ElderlyService } from '../../core/services/elderly.service';
import { Elderly } from '../../models/elderly.model';

@Component({
  selector: 'app-relatives',
  templateUrl: './relatives.component.html',
  styleUrl: './relatives.component.css',
  standalone: false
})
export class RelativesComponent implements OnInit {
  relatives: Relative[] = [];
  elderly: Elderly[] = [];
  showForm = false;
  editingRelative: Relative | null = null;
  relativeForm: Relative = {
    elderly_id: 0,
    full_name: '',
    relation: '',
    phone: '',
    email: ''
  };

  constructor(
    private relativeService: RelativeService,
    private elderlyService: ElderlyService
  ) { }

  ngOnInit() {
    this.loadRelatives();
    this.loadElderly();
  }

  loadRelatives() {
    this.relativeService.getAll().subscribe({
      next: (data: any) => {
        this.relatives = data.data || data;
        console.log('Relatives data:', this.relatives);
      },
      error: (err) => console.error('Error loading relatives:', err)
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
    this.editingRelative = null;
    this.relativeForm = {
      elderly_id: 0,
      full_name: '',
      relation: '',
      phone: '',
      email: ''
    };
    this.showForm = true;
  }

  openEditForm(relative: Relative) {
    this.editingRelative = relative;
    this.relativeForm = { ...relative };
    this.showForm = true;
  }

  saveRelative() {
    console.log('Current relativeForm:', this.relativeForm);
    
    if (!this.relativeForm.elderly_id || this.relativeForm.elderly_id === 0 || !this.relativeForm.full_name || !this.relativeForm.relation || !this.relativeForm.phone || !this.relativeForm.email) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const relativeData: Relative = {
      elderly_id: Number(this.relativeForm.elderly_id),
      full_name: this.relativeForm.full_name.trim(),
      relation: this.relativeForm.relation.trim(),
      phone: this.relativeForm.phone.trim(),
      email: this.relativeForm.email.trim()
    };

    console.log('Sending relative data:', JSON.stringify(relativeData));

    if (this.editingRelative) {
      this.relativeService.update(this.editingRelative.relative_id!, relativeData).subscribe({
        next: (response: any) => {
          console.log('Relative updated successfully:', response);
          this.loadRelatives();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error updating relative:', err);
          alert('حدث خطأ أثناء تحديث القريب: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.relativeService.create(relativeData).subscribe({
        next: (response: any) => {
          console.log('Relative created successfully:', response);
          this.loadRelatives();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating relative:', err);
          alert('حدث خطأ أثناء إنشاء القريب: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteRelative(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا القريب؟')) {
      this.relativeService.delete(id).subscribe({
        next: () => this.loadRelatives(),
        error: (err) => console.error('Error deleting relative:', err)
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editingRelative = null;
  }

  getElderlyName(id: number): string {
    const e = this.elderly.find(el => el.elderly_id === id);
    return e ? e.full_name : 'غير معروف';
  }
}

