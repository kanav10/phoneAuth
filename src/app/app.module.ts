import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {WindowService} from '../services/window.service';
import { PhoneLoginComponent } from './phone-login/phone-login.component';


@NgModule({
  declarations: [
    AppComponent,
    PhoneLoginComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule
    
  ],
  providers: [WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
