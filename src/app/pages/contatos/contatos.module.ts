import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatosListComponent } from './contatos-list/contatos-list.component';
import { ContatosRoutingModule } from './contatos-routing.module';
import { CoreModule } from '../../core/core.module';
import { ContatosAddEditComponent } from './contatos-add-edit/contatos-add-edit.component';



@NgModule({
  declarations: [
    ContatosListComponent,
    ContatosAddEditComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ContatosRoutingModule
  ]
})
export class ContatosModule { }
