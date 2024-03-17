import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { CoreModule } from '../../core/core.module';
import { UsersAddEditComponent } from './users-add-edit/users-add-edit.component';



@NgModule({
  declarations: [
    UsersListComponent,
    UsersAddEditComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
