import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './service/auth.service';
import { BatchService } from './service/batch.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    BatchService,
    // PicService
  ],
})

export class CoreModule { }
