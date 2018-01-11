import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { CookieModule } from 'ngx-cookie';


import { FlexLayoutModule } from '@angular/flex-layout';
import { MyOwnCustomMaterialModuleModule } from './my-own-custom-material-module/my-own-custom-material-module.module';

import { AppService } from './service/app.service';

import { AppComponent } from './app.component';
import { FlexSampleComponent } from './flex-sample/flex-sample.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent, DialogOverviewExampleDialog } from './details/details.component';

import { AuthGuard } from './auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];



@NgModule({
  declarations: [
    AppComponent,
    FlexSampleComponent,
    LoginComponent,
    SearchComponent,
    DetailsComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModuleModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AppService, AuthGuard],
  entryComponents: [DetailsComponent, DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
