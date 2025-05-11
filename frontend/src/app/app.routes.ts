import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { BookingsComponent } from './pages/account/bookings/bookings.component';
import { ReviewsComponent } from './pages/account/reviews/reviews.component';
import { authGuard } from './guards/auth.guard';

// Exportamos las rutas para que puedan ser importadas
export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'account',
    canActivate: [authGuard], // Protegemos esta ruta
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } // Manejo de rutas no encontradas
];