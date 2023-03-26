import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent {
  @Output() addProjectEvent = new EventEmitter<Project>();
  projectForm = new FormGroup({
    name: new FormControl('')
  });
  constructor(private srvc: ProjectsService) {}
  onSubmit() {
    const name = this.projectForm.get("name")?.value as string;
    const uid = Date.now.toString();
    const tasks: any[] = [];
    const project = this.srvc.save({uid, name, tasks});
    this.addProjectEvent.emit(project);
  }
}
