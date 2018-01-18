import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';

import { PolicySysDetailsComponent } from '../policy-sys-details/policy-sys-details.component';

@Component({
  selector: 'app-policy-sys-list',
  templateUrl: './policy-sys-list.component.html',
  styleUrls: ['./policy-sys-list.component.scss']
})
export class PolicySysListComponent implements OnInit {


  dataSource = new MatTableDataSource<SingleData>();
  data;
  leader;


  public loading: boolean = false;
  public status = '0';

  public policyType: any = '0';
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
    this.data = result.policy;
    this.dataLength = result.totalRows;

  }

  queryData() {
    this.data = [];
    this.loading = true;
    this.appService.getPolicyList({
      keyWord: this.keyWord,
      page: this.page,
      pageSize: this.pageSize,
      type: this.type,
      policyType: this.policyType,
      leader: this.policyHolder
    }).then((result) => {
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
    let dialogRef = this.dialog.open(DialogPolicyExampleDialog, {
      width: '400px',
      data: { policy: policy, type: type, flag: flag }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  viewMore(item): void {
    let dialogRefMore = this.dialog.open(PolicySysDetailsComponent, {
      width: '700px',
      data: item
    })

    dialogRefMore.afterClosed().subscribe(result => {
      console.log('The dialog2v was closed');
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
  selector: 'dialog-policy-example-dialog',
  template: `
    <h1 mat-dialog-title>选择新增政策类型</h1>
    <div mat-dialog-content>
      <form class="dialog-form" [formGroup]="options">
        <mat-radio-group formControlName="policyType">
          <mat-radio-button value="1">代理商政策</mat-radio-button>
          <mat-radio-button value="0">其他类型政策</mat-radio-button>
        </mat-radio-group>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button (click)="onSureClick()" color="primary">确定</button>

      <button mat-button  [mat-dialog-close]>取消</button>
    </div>
  `,
  styleUrls: ['./policy-sys-list.component.scss']
})
export class DialogPolicyExampleDialog {
  options: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogPolicyExampleDialog>,
    private appSerivce: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder) {
    this.options = fb.group({
      policyType: '1',
    });
  }


  onSureClick(): void {
    console.log(this.options.value.policyType);
    this.dialogRef.close();
    this.router.navigate(['/admin/policy/new_policy'],
      {
        queryParams: { policyType: this.options.value.policyType }
      }
    )
  }


}