import { Component } from '@angular/core';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ProjectsListComponent {
  projects: Project[] = [];
  constructor(srvc: ProjectsService) {
    this.projects = srvc.getAll();
  }

}
