import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-role-sys-new-role',
  templateUrl: './role-sys-new-role.component.html',
  styleUrls: ['./role-sys-new-role.component.scss']
})
export class RoleSysNewRoleComponent implements OnInit {


  leader;
  code;
  policyHolder;
  description;
  roleName;


  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.getPolicyLeader();

    this.route.queryParams.subscribe((qs) => {
      this.appService.generateRoleCode(qs.roleType).then((data) => {
        this.code = data.code;
      })
    })
  }

  getPolicyLeader() {
    return this.appService.getPolicyLeader().then((data) => {
      this.leader = data.leader;
    })
  }

  addNewRole() {

    this.appService.addNewRole({
      roleDes: this.description,
      leader: this.policyHolder,
      roleCode: this.code,
      roleName: this.roleName
    }).then(() => {
      alert('添加成功！');
      this.router.navigate(['../'], { relativeTo: this.route })
    }).catch((e) => {
      alert(e)
    })
  }


}
