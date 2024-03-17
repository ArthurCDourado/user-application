import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosListComponent } from './contatos-list/contatos-list.component';
import { ContatosAddEditComponent } from './contatos-add-edit/contatos-add-edit.component';

const routes: Routes = [
  { path: 'list', component: ContatosListComponent },
  { path: 'edit/:id', component: ContatosAddEditComponent },
  { path: 'add', component: ContatosAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
