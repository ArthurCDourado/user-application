import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    CoreModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
