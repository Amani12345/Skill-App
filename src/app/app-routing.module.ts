import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import { SkillComponent } from '../components/skill/skill.component';
import { TaskComponent } from '../components/task/task.component';
import { OfferComponent } from '../components/offer/offer.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'skills', component: SkillComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'offers', component: OfferComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
