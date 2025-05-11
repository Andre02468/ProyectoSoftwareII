import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Inyectamos el FormBuilder con la nueva sintaxis de Angular 14+
  private formBuilder = inject(FormBuilder);
  
  // Ahora podemos declarar el formulario después de la inyección
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = null;
    
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.isLoading = true;
    
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/account/profile']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al iniciar sesión';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}