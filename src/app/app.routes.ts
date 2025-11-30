import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CourseListComponent } from './admin/courses/course-list/course-list.component';
import { CourseCreateComponent } from './admin/courses/course-create/course-create.component';
import { CourseEditComponent } from './admin/courses/course-edit/course-edit.component';
import { StudentsListComponent } from './admin/students/students-list/students-list.component';
import { StudentCreateComponent } from './admin/students/students-create/student-create.component';
import { StudentEditComponent } from './admin/students/students-edit/student-edit.component';
import { ProfessorsListComponent } from './admin/professors/professors-list/professors-list.component';
import { ProfessorCreateComponent } from './admin/professors/professor-create/professor-create.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { ProfessorLayoutComponent } from './professor/professor-layout/professor-layout.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  // Rutas de Admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'courses', component: CourseListComponent },
      { path: 'courses/create', component: CourseCreateComponent },
      { path: 'courses/edit/:id', component: CourseEditComponent },
      { path: 'students', component: StudentsListComponent },
      { path: 'students/create', component: StudentCreateComponent },
      { path: 'students/edit/:id', component: StudentEditComponent },
      { path: 'professors', component: ProfessorsListComponent },
      { path: 'professors/create', component: ProfessorCreateComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'profile', component: AdminProfileComponent }
    ]
  },

  // Rutas de Profesor
  {
    path: 'professor',
    component: ProfessorLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      { 
        path: 'courses',
        loadComponent: () => import('./professor/courses/course-list/course-list.component').then(m => m.CourseListComponent)
      },
      { 
        path: 'courses/:id',
        loadComponent: () => import('./professor/courses/course-view/course-view.component').then(m => m.CourseViewComponent)
      },
      { 
        path: 'courses/:id/students',
        loadComponent: () => import('./professor/students/student-list/student-list.component').then(m => m.StudentListComponent)
      },
      { 
        path: 'evaluation/:courseId/:studentId',
        loadComponent: () => import('./professor/evaluation-panel/evaluation-panel/evaluation-panel.component').then(m => m.EvaluationPanelComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./professor/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];
