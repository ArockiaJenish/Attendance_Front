import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SessionComponent } from './components/session/session.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"session", component: SessionComponent},
  {path:"home", component: AppComponent},
  {path:"login", component: LoginComponent},
  {path:"forgotPass", component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
