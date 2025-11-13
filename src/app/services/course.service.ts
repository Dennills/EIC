import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CourseService {
    getCourses() { return Promise.resolve([
        { id: 1, name: 'Desarrollo Web' },
        { id: 2, name: 'IA y ML' }
    ]); }
}

