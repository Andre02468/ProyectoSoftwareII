import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Inyectamos FormBuilder
  private formBuilder = inject(FormBuilder);
  
  // Ahora podemos declarar el formulario después
  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['']
  });

  constructor(private authService: AuthService) {
    // Cargar datos del usuario
    this.authService.getCurrentUser().subscribe(user => {
      this.profileForm.patchValue(user);
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      // Lógica para actualizar perfil
      console.log('Perfil actualizado:', this.profileForm.value);
    }
  }
}