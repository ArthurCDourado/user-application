import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddEditComponent } from './users-add-edit/users-add-edit.component';

const routes: Routes = [
  { path: 'list', component: UsersListComponent },
  { path: 'edit/:id', component: UsersAddEditComponent },
  { path: 'add', component: UsersAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
