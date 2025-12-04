import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      // Simulate login (not connected to database as per requirements)
      setTimeout(() => {
        this.isLoading = false;
        // For now, just navigate to dashboard
        // In real implementation, you would call auth service here
        console.log('Login attempt:', this.loginForm.value);
        this.router.navigate(['/']);
      }, 1000);
    } else {
      this.errorMessage = 'Please fill in all fields correctly';
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToLanding(): void {
    this.router.navigate(['/landing']);
  }
}
