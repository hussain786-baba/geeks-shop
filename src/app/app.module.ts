// import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

import { AuthInterceptorInterceptor } from './_services/auth-interceptor.interceptor';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/dialog/signin-signup-dialog/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { BlogArticleComponent } from './components/blog/blog-article/blog-article.component'
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MaterialuiModule } from './_models_and_interface/materialui.module';
import { SigninSignupDialogComponent } from './components/dialog/signin-signup-dialog/signin-signup-dialog.component';
import { SignupComponent } from './components/dialog/signin-signup-dialog/signup/signup.component';
import { UILoader } from './_models_and_interface/UILoader.module';
import { BlogModel } from './appModel/blog';
import { ChangepasswordComponent } from './components/user-profile/changepassword/changepassword.component';
import { AlertComponent } from './components/dialog/alert/alert.component';
import { NzZorroModule } from './_models_and_interface/nz-zorro.module';
import { NotpagefoundComponent } from './components/notpagefound/notpagefound.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    UserProfileComponent,
    SigninSignupDialogComponent,
    ChangepasswordComponent,
    AlertComponent,
    NotpagefoundComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    UILoader,
    MaterialuiModule,
    MatIconModule,
    // SharedModule
    NzZorroModule,
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true
    },
    BlogModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
