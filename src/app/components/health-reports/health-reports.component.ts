import { Component, OnInit } from '@angular/core';
import { HealthReport } from '../../models/health-report.model';
import { HealthReportService } from '../../core/services/health-report.service';
import { ElderlyService } from '../../core/services/elderly.service';
import { Elderly } from '../../models/elderly.model';

@Component({
  selector: 'app-health-reports',
  templateUrl: './health-reports.component.html',
  styleUrl: './health-reports.component.css',
  standalone: false
})
export class HealthReportsComponent implements OnInit {
  reports: HealthReport[] = [];
  elderly: Elderly[] = [];
  showForm = false;
  editingReport: HealthReport | null = null;
  reportForm: HealthReport = {
    elderly_id: 0,
    report_date: '',
    blood_pressure: '',
    heart_rate: 0,
    sugar_level: 0,
    weight: 0,
    notes: ''
  };

  constructor(
    private healthReportService: HealthReportService,
    private elderlyService: ElderlyService
  ) { }

  ngOnInit() {
    this.loadReports();
    this.loadElderly();
  }

  loadReports() {
    this.healthReportService.getAll().subscribe({
      next: (data: any) => {
        this.reports = data.data || data;
        console.log('Health reports data:', this.reports);
      },
      error: (err) => console.error('Error loading health reports:', err)
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
    this.editingReport = null;
    this.reportForm = {
      elderly_id: 0,
      report_date: '',
      blood_pressure: '',
      heart_rate: 0,
      sugar_level: 0,
      weight: 0,
      notes: ''
    };
    this.showForm = true;
  }

  openEditForm(report: HealthReport) {
    this.editingReport = report;
    this.reportForm = { ...report };
    this.showForm = true;
  }

  saveReport() {
    console.log('Current reportForm:', this.reportForm);
    
    if (!this.reportForm.elderly_id || this.reportForm.elderly_id === 0 || !this.reportForm.report_date || !this.reportForm.blood_pressure) {
      alert('Please fill out all required fields');
      return;
    }

    const reportData: HealthReport = {
      elderly_id: Number(this.reportForm.elderly_id),
      report_date: this.reportForm.report_date,
      blood_pressure: this.reportForm.blood_pressure.trim(),
      heart_rate: Number(this.reportForm.heart_rate),
      sugar_level: Number(this.reportForm.sugar_level),
      weight: Number(this.reportForm.weight),
      notes: this.reportForm.notes ? this.reportForm.notes.trim() : ''
    };

    console.log('Sending health report data:', JSON.stringify(reportData));

    if (this.editingReport) {
      this.healthReportService.update(this.editingReport.report_id!, reportData).subscribe({
        next: (response: any) => {
          console.log('Health report updated successfully:', response);
          this.loadReports();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error updating health report:', err);
          alert('An error occurred while updating the report: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.healthReportService.create(reportData).subscribe({
        next: (response: any) => {
          console.log('Health report created successfully:', response);
          this.loadReports();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating health report:', err);
          alert('An error occurred while creating the report: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  deleteReport(id: number) {
    if (confirm('Are you sure you want to delete this report?')) {
      this.healthReportService.delete(id).subscribe({
        next: () => this.loadReports(),
        error: (err) => console.error('Error deleting health report:', err)
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editingReport = null;
  }

  getElderlyName(id: number): string {
    const e = this.elderly.find(el => el.elderly_id === id);
    return e ? e.full_name : 'Unknown';
  }
}

