import { Component } from '@angular/core';
import { NewProjectComponent } from './new-project/new-project.component';
import { Project, timeEstimated, timeSpent } from './project';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: Project[] = [];
  newProjectActive = false;
  constructor(private srvc: ProjectsService) {
    this.projects = srvc.getAll();
  }

  newProject() {
    console.log("newProject");
    this.newProjectActive = true
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.newProjectActive = false;
  }

  projectProgress(projectUid: string): number {
    const project = this.projects.find((p) => p.uid === projectUid) as Project;
    const percentage = timeSpent(project) / timeEstimated(project);
    return percentage;
  }
}
