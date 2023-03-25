import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'project-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class ProjectFormComponent {
  @Input() uid = '';
  @Input() name = '';
  projectForm = this.fb.group({
    uid: new FormControl(this.uid),
    name: new FormControl(this.name),
  });
  constructor(private srvc: ProjectsService, private fb: FormBuilder) {}
  onSubmit() {
    console.log(this.projectForm);
    let uid = this.projectForm.get("uid")?.value as string;
    let name = this.projectForm.get("name")?.value as string;
    let project = this.srvc.save({uid, name});
    this.uid = project.uid;
    this.name = project.name;
  }
}
