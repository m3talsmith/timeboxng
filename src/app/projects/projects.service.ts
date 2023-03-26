import { Injectable } from '@angular/core';
import { DefaultProject, Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  getAll(): Project[] {
    const storedProjects = localStorage.getItem("projects");
    let projects = storedProjects ? JSON.parse(storedProjects) : [];
    return projects;
  }

  find(uid: string): Project {
    return this.getAll().find((p) => p.uid === uid) || DefaultProject;
  }

  save(project: Project): Project {
    let projects = this.getAll();
    if (project.uid === '') {
      project.uid = Date.now().toString();
    }
    let i = projects.findIndex((p) => p.uid === project.uid);
    if (i >= 0) {
      projects[i] = project;
    } else {
      projects.push(project);
    }
    localStorage.setItem("projects", JSON.stringify(projects));
    return project;
  }
}
