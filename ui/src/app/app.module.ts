import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { UsernameComponent } from './username/username.component';
import { HobbyService} from './hobby.service';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AppComponent, UsernameComponent, ModalComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [HobbyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
