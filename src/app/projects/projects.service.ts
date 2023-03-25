import { Injectable } from '@angular/core';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  getAll(): Project[] {
    return [
      {
        uid: Date.now().toString(),
        name: "pre-configured"
      }
    ]
  }
}
