import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';


let GLOBALROLE=[];

@Component({
  selector: 'app-role-sys-user-list',
  templateUrl: './role-sys-user-list.component.html',
  styleUrls: ['./role-sys-user-list.component.scss']
})
export class RoleSysUserListComponent implements OnInit {

  dataSource = new MatTableDataSource<SingleData>();
  data=[];
  roleList;
  roleCode;
  firstSearch=true;

  public loading: boolean = false;
  public status = '0';

  public roleType: any = '0';
  public keyWord: any = '';
  public page = 0;
  public pageSize = 20;
  public type = '0';
  public dataLength = 0;
  public info: any = {};
  public exportQs: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private appService: AppService,
    private _location: Location,
    public dialog: MatDialog,
    private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() {
    //this.queryData();
    this.getRoleList();
  }

  getRoleList(){
    return this.appService.getRoleList({
      pageSize:1000
    }).then((data)=>{
      this.roleList=data.roles;
      GLOBALROLE=data.roles;
    })
  }


  renderData(result) {
    this.loading = false;
    this.data = result.roleUsers;
    this.dataLength = result.totalRows;

  }

  queryData() {
    this.firstSearch=false;
    this.data = [];
    this.loading = true;
    const query: any = {
      keyWord: this.keyWord,
      page: this.page,
      pageSize: this.pageSize,
      type: this.type,
    };
    this.appService.getRoleUserList(query).then((result) => {
      this.renderData(result)
    });
  }


  queryDataViaRoleCode() {
    this.data = [];
    this.loading = true;
    const query: any = {
      page: this.page,
      pageSize: this.pageSize,
      roleCode: this.roleCode,
    };
    this.appService.getUserRoleList(query).then((result) => {
      this.renderData(result)
    });
  }
  queryDataViaTypeAndKeyword() {
    this.data = [];
    this.loading = true;
    const query: any = {
      keyWord: this.keyWord,
      page: this.page,
      pageSize: this.pageSize,
      type: this.type,
    };
    this.appService.getRoleList(query).then((result) => {
      this.renderData(result)
    });
  }

  pageEvent(event) {
    console.log(event);
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.queryData();
  }


  openDialog(user): void {
    let dialogRef = this.dialog.open(DialogRoleUserChangeDialog, {
      width: '400px',
      data: Object.assign({},user,{
        roleList:this.roleList,
        current:`${user.roleName}（${user.roleCode}）`
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.data.forEach(item=>{
        if(item.mbUid==result.mbUid){
          item.roleCode=result.rr.code;
          item.roleName=result.rr.name;
        }
      })
    });
  }


  viewMore(item): void {
    let dialogRefMore = this.dialog.open(DialogRoleUserChangelogDialog, {
      width: '500px',
      data: item
    })

    dialogRefMore.afterClosed().subscribe(result => {
      console.log('The dialog233 was closed');
    });
  }

}

export interface SingleData {
  code: string;
  name: string;
  businessName: string;
  roles: any;
  bFirstPrize: string;
  bSecondPrize: string;
  bOtherPrize: string;
  aFirstPrize: string;
  aSecondPrize: string;
  aOtherPrize: string;
  leaderName: string;
}



@Component({
  selector: 'dialog-role-user-change-dialog',
  template: `
    <h1 mat-dialog-title>修改角色</h1>
    <div mat-dialog-content>
      <div class="dialog-fbox">
        <mat-form-field>
          <input matInput placeholder="当前选中用户" [value]="data.mbUid+' - '+data.mbNickName" disabled>
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="当前角色" [(ngModel)]="data.current" disabled>
        </mat-form-field>
        <mat-form-field class="field-item">
          <mat-select placeholder="修改角色" [(value)]="roleCode">
            <mat-option *ngFor="let item of data.roleList" [value]="item.code" [disabled]="item.code==data.roleCode">{{item.name}}（{{item.code}}）</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </div>
    <div mat-dialog-actions *ngIf="!loading">
      <button mat-raised-button (click)="onSureClick()" color="primary">确定</button>
      <button mat-button  [mat-dialog-close]>取消</button>
    </div>
    <div mat-dialog-actions *ngIf="loading">
      <mat-progress-bar mode="indeterminate" class="progress" *ngIf="loading"></mat-progress-bar>
    </div>
  `,
  styleUrls: ['./role-sys-user-list.component.scss']
})
export class DialogRoleUserChangeDialog {
  options: FormGroup;
  loading:boolean=false;
  roleCode;


  constructor(
    public dialogRef: MatDialogRef<DialogRoleUserChangeDialog>,
    private appSerivce: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

  }

  onSureClick(): void {
    this.loading=true;
    this.appSerivce.editUserRole({
      mbUid:this.data.mbUid,
      roleCode:this.roleCode
    }).then(()=>{
      this.loading=false;
      alert('修改成功！');
      const rrName=this.data.roleList.filter((item)=>item.code==this.roleCode).pop();
      this.dialogRef.close(Object.assign({},this.data,{rr:rrName}));
    })

  }
}






@Component({
  selector: 'dialog-role-user-changelog-dialog',
  template: `
    <h1 mat-dialog-title>角色修改记录</h1>
    <div mat-dialog-content>
      <p>{{data.mbUid}} - {{data.mbNickName}}:</p>
      <mat-progress-bar mode="indeterminate" class="progress" *ngIf="loading"></mat-progress-bar>
       <table class="table" *ngIf="!loading&&list&&list.length>0">
          <tr class="header">
            <td>时间</td>
            <td>描述</td>
          </tr>
          <tr *ngFor="let item of list">
            <td>{{item.cTimeStr}}</td>
            <td>{{item.operatorName}}修改角色为{{item.newRoleName}}（{{item.newRoleCode}}）</td>
          </tr>
       </table>
       <p *ngIf="!loading&&(!list||list.length==0)" style="text-align:center;">暂无记录</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]>关闭</button>
    </div>
  `,
  styleUrls: ['./role-sys-user-list.component.scss']
})
export class DialogRoleUserChangelogDialog {

  list;
  loading:boolean=true;

  constructor(
    public dialogRef: MatDialogRef<DialogRoleUserChangelogDialog>,
    private appSerivce: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.appSerivce.getUserRoleChangeLog(this.data.mbUid).then((data) => {
      this.list = data.record;
      this.loading=false;
    })
  }


}