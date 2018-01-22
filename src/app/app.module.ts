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
import { PolicySysListComponent, DialogPolicyExampleDialog } from './policy-sys-list/policy-sys-list.component';
import { PolicySysNewPolicyComponent, PolicySysNewPolicyDialog } from './policy-sys-new-policy/policy-sys-new-policy.component';
import { PolicySysDetailsComponent } from './policy-sys-details/policy-sys-details.component';
import { RoleSysListComponent, DialogRoleExampleDialog, DialogRolePolicyListDialog } from './role-sys-list/role-sys-list.component';
import { RoleSysSwitchComponent } from './role-sys-switch/role-sys-switch.component';
import { RoleSysNewRoleComponent, RoleSysNewRoleDialog } from './role-sys-new-role/role-sys-new-role.component';
import { RoleSysUserListComponent, DialogRoleUserChangelogDialog, DialogRoleUserChangeDialog } from './role-sys-user-list/role-sys-user-list.component';

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
      { path: 'policy/new_policy', component: PolicySysNewPolicyComponent, canActivate: [AuthGuard] },
      {
        path: 'role', component: RoleSysSwitchComponent, children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          { path: 'list', component: RoleSysListComponent },
          { path: 'list/new_role', component: RoleSysNewRoleComponent },
          { path: 'users', component: RoleSysUserListComponent },
        ], canActivate: [AuthGuard]
      },
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
    DialogPolicyExampleDialog,
    DialogRoleExampleDialog,
    DialogRolePolicyListDialog,
    DialogRoleUserChangelogDialog,
    DialogRoleUserChangeDialog,
    ParentContainerComponent,
    PolicySysListComponent,
    PolicySysNewPolicyComponent,
    PolicySysDetailsComponent,
    RoleSysListComponent,
    RoleSysSwitchComponent,
    RoleSysNewRoleComponent,
    RoleSysUserListComponent,
    RoleSysNewRoleDialog,
    PolicySysNewPolicyDialog
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
  entryComponents: [
    DetailsComponent,
    RoleSysListComponent,
    DialogOverviewExampleDialog,
    DialogRolePolicyListDialog,
    DialogRoleUserChangelogDialog,
    DialogRoleUserChangeDialog,
    PolicySysListComponent,
    DialogPolicyExampleDialog,
    PolicySysDetailsComponent,
    DialogRoleExampleDialog,
    RoleSysNewRoleComponent,
    RoleSysNewRoleDialog,
    PolicySysNewPolicyComponent,
    PolicySysNewPolicyDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
