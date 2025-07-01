import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import { SkillComponent } from '../components/skill/skill.component';
import { TaskComponent } from '../components/task/task.component';
import { OfferComponent } from '../components/offer/offer.component';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SkillComponent,
    TaskComponent,
    OfferComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
