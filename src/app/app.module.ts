import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from "./shared/services/auth-service.service";
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RecetasComponent } from './generators/recetas/recetas.component';
import { RecetasPdfGenComponent } from './generators/recetas/recetas-pdf-gen/recetas-pdf-gen.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonsPopupModule } from 'ngx-sharebuttons/popup';
import { OverlayModule } from '@angular/cdk/overlay';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserPageComponent } from './user-page/user-page.component';
import {MatMenuModule} from '@angular/material/menu'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RestorePasswordComponent,
    NavBarComponent,
    RecetasComponent,
    RecetasPdfGenComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginPageComponent, pathMatch: 'full' },
      {path: 'User', component: UserPageComponent},
      { path: 'Login', component: LoginPageComponent },
      { path: 'Register', component: RegisterPageComponent },
      { path: 'Restore', component: RestorePasswordComponent },
      { path: 'Receta', component: RecetasComponent }
    ]),
    BrowserAnimationsModule,
    OverlayModule,
    ShareButtonsModule,
    ShareButtonsPopupModule,
    ShareIconsModule
  ], 
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
