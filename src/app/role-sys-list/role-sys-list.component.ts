import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-role-sys-list',
  templateUrl: './role-sys-list.component.html',
  styleUrls: ['./role-sys-list.component.scss']
})
export class RoleSysListComponent implements OnInit {


  dataSource = new MatTableDataSource<SingleData>();
  data;
  leader;


  public loading: boolean = false;
  public status = '0';

  public roleType: any = '0';
  public keyWord: any = '';
  public page = 0;
  public pageSize = 10;
  public type = '0';
  public dataLength = 0;
  public info: any = {};
  public exportQs: any;
  public policyHolder: any;

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
    this.queryData();
    this.getPolicyLeader();
  }

  openDaySelect() {
    // if(!this.month) return alert('请先选择月份')
  }

  getPolicyLeader() {
    return this.appService.getPolicyLeader().then((data) => {
      this.leader = data.leader;
    })
  }

  renderData(result) {
    this.loading = false;
    this.data = result.roles;
    this.dataLength = result.totalRows;

  }

  queryData() {
    this.data = [];
    this.loading = true;
    const query: any = {
      keyWord: this.keyWord,
      page: this.page,
      pageSize: this.pageSize,
      type: this.type,
      roleType: this.roleType,
    };
    if (this.policyHolder != '-1') query.leader = this.policyHolder;
    this.appService.getRoleList(query).then((result) => {
      this.renderData(result)
    });
  }
  queryDataViaLeaderAndRoleType() {
    this.data = [];
    this.loading = true;
    const query: any = {
      page: this.page,
      pageSize: this.pageSize,
      roleType: this.roleType,
    };
    if (this.policyHolder != '-1') query.leader = this.policyHolder;
    this.appService.getRoleList(query).then((result) => {
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


  addNewPolicy() {

  }


  openDialog(type?, policy?, flag?): void {
    let dialogRef = this.dialog.open(DialogRoleExampleDialog, {
      width: '400px',
      data: { policy: policy, type: type, flag: flag }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  viewMore(item): void {
    let dialogRefMore = this.dialog.open(DialogRolePolicyListDialog, {
      width: '500px',
      data: {roleId:item.id,roleName:item.name}
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
  selector: 'dialog-role-example-dialog',
  template: `
    <h1 mat-dialog-title>选择角色类型</h1>
    <div mat-dialog-content>
      <form class="dialog-form" [formGroup]="options">
        <mat-radio-group formControlName="roleType">
          <mat-radio-button value="1">代理商角色</mat-radio-button>
          <mat-radio-button value="0">其他角色</mat-radio-button>
        </mat-radio-group>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button (click)="onSureClick()" color="primary">确定</button>

      <button mat-button  [mat-dialog-close]>取消</button>
    </div>
  `,
  styleUrls: ['./role-sys-list.component.scss']
})
export class DialogRoleExampleDialog {
  options: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogRoleExampleDialog>,
    private appSerivce: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder) {
    this.options = fb.group({
      roleType: '1',
    });
  }

  onSureClick(): void {
    console.log(this.options.value.policyType);
    this.dialogRef.close();
    this.router.navigate(['/admin/role/list/new_role'],
      {
        queryParams: { roleType: this.options.value.roleType }
      }
    )
  }
}






@Component({
  selector: 'dialog-role-policy-list-dialog',
  template: `
    <h1 mat-dialog-title>角色政策查询</h1>
    <div mat-dialog-content>
      <p>{{data.roleName}}:</p>
      <mat-progress-bar mode="indeterminate" class="progress" *ngIf="loading"></mat-progress-bar>
       <table class="table" *ngIf="!loading&&list&&list.length>0">
          <tr class="header">
            <td>序号</td>
            <td>政策编号</td>
            <td>政策名称</td>
          </tr>
          <tr *ngFor="let item of list">
            <td>{{item.id}}</td>
            <td>{{item.policyCode}}</td>
            <td>{{item.policyName}}</td>
          </tr>
       </table>
       <p *ngIf="!loading&&(!list||list.length==0)" style="text-align:center;">暂无政策</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]>关闭</button>
    </div>
  `,
  styleUrls: ['./role-sys-list.component.scss']
})
export class DialogRolePolicyListDialog {

  list;
  loading:boolean=true;

  constructor(
    public dialogRef: MatDialogRef<DialogRolePolicyListDialog>,
    private appSerivce: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.appSerivce.getPolicyListViaRoleId(this.data.roleId).then((data) => {
      this.list = data.rolePolicy;
      this.loading=false;
    })
  }


}