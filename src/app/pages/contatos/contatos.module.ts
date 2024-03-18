import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatosListComponent } from './contatos-list/contatos-list.component';
import { ContatosRoutingModule } from './contatos-routing.module';
import { CoreModule } from '../../core/core.module';
import { ContatosAddEditComponent } from './contatos-add-edit/contatos-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContatosListComponent,
    ContatosAddEditComponent
  ],
  imports: [
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ContatosRoutingModule
  ]
})
export class ContatosModule { }
