import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  providers: [ UsersService ],
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class CoreModule { }
