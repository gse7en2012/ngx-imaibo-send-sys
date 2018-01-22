import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
  roleType;


  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, ) { }

  ngOnInit() {

    this.getPolicyLeader();

    this.route.queryParams.subscribe((qs) => {
      this.roleType = qs.roleType == '0' ? '其他角色' : '代理商角色'
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

  openDialog(): void {
    let dialogRef = this.dialog.open(RoleSysNewRoleDialog, {
      width: '440px',
      data: {
        roleDes: this.description || '',
        leader: this.policyHolder,
        roleCode: this.code,
        roleName: this.roleName,
        roleType: this.roleType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (result.nav) this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}



@Component({
  selector: 'role-sys-new-role-dialog',
  templateUrl: './role-sys-new-role-dialog.component.html',
  styleUrls: ['./role-sys-new-role.component.scss']
})
export class RoleSysNewRoleDialog {

  constructor(
    public dialogRef: MatDialogRef<RoleSysNewRoleDialog>,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  addNewRole() {
    this.appService.addNewRole({
      roleDes: this.data.roleDes,
      leader: this.data.leader,
      roleCode: this.data.roleCode,
      roleName: this.data.roleName
    }).then(() => {
      alert('添加成功！');
      this.dialogRef.close({ nav: true });

    }).catch((e) => {
      alert(e)
    })
  }
}
