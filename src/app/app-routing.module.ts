import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './projects/list/list.component';

const routes: Routes = [
  {path: "projects", component: ProjectsListComponent},
  {path: "", redirectTo: "projects", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
