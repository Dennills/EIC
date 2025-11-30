import { Injectable } from '@angular/core';

export interface Attendance {
  studentId: number;
  studentName: string;
  date: string;
  present: boolean;
  courseId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceKey = 'attendance_records';

  constructor() {}

  /**
   * Obtiene todos los registros de asistencia
   */
  getAllAttendance(): Attendance[] {
    const data = localStorage.getItem(this.attendanceKey);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Obtiene asistencia por curso y fecha
   */
  getAttendanceByCourseAndDate(courseId: number, date: string): Attendance[] {
    const all = this.getAllAttendance();
    return all.filter(a => a.courseId === courseId && a.date === date);
  }

  /**
   * Verifica si ya existe registro para un curso en una fecha
   */
  hasAttendanceForDate(courseId: number, date: string): boolean {
    const records = this.getAttendanceByCourseAndDate(courseId, date);
    return records.length > 0;
  }

  /**
   * Guarda asistencia de múltiples estudiantes
   */
  saveAttendance(records: Attendance[]): void {
    const all = this.getAllAttendance();
    
    // Filtrar registros existentes de la misma fecha y curso
    const filtered = all.filter(a => 
      !(a.courseId === records[0]?.courseId && a.date === records[0]?.date)
    );
    
    // Agregar nuevos registros
    const updated = [...filtered, ...records];
    localStorage.setItem(this.attendanceKey, JSON.stringify(updated));
  }

  /**
   * Obtiene asistencia de un estudiante específico en un curso
   */
  getStudentAttendance(courseId: number, studentId: number): Attendance[] {
    const all = this.getAllAttendance();
    return all.filter(a => a.courseId === courseId && a.studentId === studentId);
  }

  /**
   * Obtiene estadísticas de asistencia de un estudiante
   */
  getStudentStats(courseId: number, studentId: number): { total: number, present: number, absent: number, percentage: number } {
    const records = this.getStudentAttendance(courseId, studentId);
    const present = records.filter(r => r.present).length;
    const absent = records.filter(r => !r.present).length;
    const total = records.length;
    const percentage = total > 0 ? (present / total) * 100 : 0;

    return { total, present, absent, percentage };
  }
}