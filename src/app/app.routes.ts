import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ProfessorLayoutComponent } from './professor/professor-layout/professor-layout.component';
import { CourseListComponent } from './professor/courses/course-list/course-list.component';
import { CourseViewComponent } from './professor/courses/course-view/course-view.component';
import { ProfileComponent } from './professor/profile/profile.component';
import { AuthGuard } from './core/auth.guard';

export const appRoutes: Routes = [
  // 🔹 Ruta por defecto → Login
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // 🔹 Login
    { path: 'login', component: LoginComponent },

    // 🔹 Rutas del profesor protegidas por AuthGuard
    {
        path: 'professor',
        component: ProfessorLayoutComponent,
        canActivate: [AuthGuard],
        children: [
        { path: 'courses', component: CourseListComponent },
        { path: 'course/:id', component: CourseViewComponent },
        { path: 'profile', component: ProfileComponent },
        { path: '', redirectTo: 'courses', pathMatch: 'full' }
        ]
    },

    // 🔹 Rutas adicionales
    { path: 'perfil', component: ProfileComponent },
    { path: 'professor/courses', component: CourseListComponent },
    { path: 'professor/course/:id', component: CourseViewComponent },

    // 🔹 Si no encuentra la ruta, redirige al login
    { path: '', redirectTo: 'login' }
];