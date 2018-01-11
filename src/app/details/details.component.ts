import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public id;
  public details:any = {};

  animal: string;
  name: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private _location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    })

    this.getDetails();
  }

  goBack() {
    this._location.back();
  }

  saveRemark() {
    this.appService.saveRemark(this.id, this.details['remark']).then((r) => {
      alert('备注保存成功！')
    });
  }

  openDialog(type?, policy?, flag?): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: { policy: policy, type: type, flag: flag, id:this.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getDetails();
    });
  }


  getDetails() {
    return this.appService.getSendDetails(this.id).then((details) => {
      this.details = details.detail;
    }).catch((e) => {
      alert(e);
      this.router.navigate(['/login'])
    })
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>{{title}}</h1>
    <div mat-dialog-content>
      <p>{{data.type}}{{data.policy}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button (click)="onSureClick()" *ngIf="step==1" color="primary">执行奖励</button>
      <button mat-raised-button (click)="onNoClick()" *ngIf="step==1" color="warn">取消奖励</button>
      
      <button mat-raised-button   *ngIf="step==2" color="primary" (click)="confirmPost()">确定</button>
      <button mat-button  *ngIf="step==2"  [mat-dialog-close]>取消</button>
    </div>
  `,
  styleUrls: ['./details.component.scss']
})
export class DialogOverviewExampleDialog {

  step = 1;
  title = '操作选择';
  isExecute = 1;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private appSerivce: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    // this.dialogRef.close();
    this.step = 2;
    this.isExecute = 2;
    this.title = "即将执行取消奖励操作"
  }
  onSureClick(): void {
    this.step = 2;
    this.title = "即将执行发送奖励操作"
  }
  confirmPost() {
    this.executeAward().then((r)=>{
      this.dialogRef.close();
      alert('操作成功！')
    })
    
  }

  executeAward() {
    return this.appSerivce.postExecuteAward({
      id: this.data.id,
      isExecute: this.isExecute,
      operationOption: this.data.flag
    })
  }


}