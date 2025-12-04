import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../core/services/service.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  services: Service[] = [];
  loading = true;

  constructor(
    private serviceService: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.loading = false;
        // Fallback services if API fails
        this.services = [
          {
            id: 1,
            name: '24/7 Medical Care',
            description: 'Round-the-clock medical supervision and care for elderly residents',
            icon: '🏥',
            category: 'Medical'
          },
          {
            id: 2,
            name: 'Rehabilitation Services',
            description: 'Physical and occupational therapy to maintain mobility and independence',
            icon: '💪',
            category: 'Therapy'
          },
          {
            id: 3,
            name: 'Nutritional Meals',
            description: 'Healthy, balanced meals prepared by professional nutritionists',
            icon: '🍽️',
            category: 'Nutrition'
          },
          {
            id: 4,
            name: 'Social Activities',
            description: 'Engaging activities and social events to keep residents active',
            icon: '🎭',
            category: 'Activities'
          },
          {
            id: 5,
            name: 'Personal Care',
            description: 'Assistance with daily living activities and personal hygiene',
            icon: '👤',
            category: 'Care'
          },
          {
            id: 6,
            name: 'Family Support',
            description: 'Regular updates and communication with family members',
            icon: '👨‍👩‍👧‍👦',
            category: 'Support'
          }
        ];
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
