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
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './send-sys-search/search.component';
import { DetailsComponent, DialogOverviewExampleDialog } from './send-sys-details/details.component';

import { AuthGuard } from './auth-guard';
import { ParentContainerComponent } from './parent-container/parent-container.component';
import { PolicySysListComponent } from './policy-sys-list/policy-sys-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

const adminRoutes: Routes = [
  {
    path: 'admin', component: ParentContainerComponent, children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
      { path: 'search/details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
      { path: 'policy', component: PolicySysListComponent, canActivate: [AuthGuard] },
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    DetailsComponent,
    DialogOverviewExampleDialog,
    ParentContainerComponent,
    PolicySysListComponent
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
    RouterModule.forRoot(routes),
    RouterModule.forChild(adminRoutes),
  ],
  providers: [AppService, AuthGuard],
  entryComponents: [DetailsComponent, DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
