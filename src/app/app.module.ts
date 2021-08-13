import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'Login', component: LoginPageComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
