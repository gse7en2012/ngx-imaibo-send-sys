import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-policy-sys-new-policy',
  templateUrl: './policy-sys-new-policy.component.html',
  styleUrls: ['./policy-sys-new-policy.component.scss']
})
export class PolicySysNewPolicyComponent implements OnInit {

  leader;
  roleList;
  code;
  policyHolder;
  aFirstPrize;
  aOtherPrize;
  aSecondPrize;
  bFirstPrize;
  bOtherPrize;
  bSecondPrize;
  businessCode = { name: 'etoro', code: '' };
  description;
  policyCode;
  policyName;
  remark;

  partnerRoleList = [];
  otherRoleList = [];


  policyType;
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router,public dialog: MatDialog,) { }

  ngOnInit() {

    this.getRoleList();
    this.getPolicyLeader();

    this.route.queryParams.subscribe((qs) => {
      this.policyType=qs.policyType;
      this.appService.generatePolicyCode(qs.policyType).then((data) => {
        this.code = data.code;
      })
    })

    this.appService.getBusinessCode().then((codeList) => {
      this.businessCode = codeList.business[0]
    })
  }

  changeEmp(list, i) {
    list[i]['is_choose'] = !list[i]['is_choose'];
  }

  getRoleList() {
    return this.appService.findRoleType().then((data) => {
      this.roleList = data.roleType;
      this.roleList.forEach(element => {
        if (element.isPartner == 1) this.partnerRoleList.push(element);
        if (element.isPartner == 0) this.otherRoleList.push(element);
      });
    })
  }

  getPolicyLeader() {
    return this.appService.getPolicyLeader().then((data) => {
      this.leader = data.leader;
    })
  }

  // addNewPolicy() {
  //   this.appService.addPolicy({
    
  //     aFirstPrize: this.aFirstPrize || '',
  //     aOtherPrize: this.aOtherPrize || '',
  //     aSecondPrize: this.aSecondPrize || '',
  //     bFirstPrize: this.bFirstPrize || '',
  //     bOtherPrize: this.bOtherPrize || '',
  //     bSecondPrize: this.bSecondPrize || '',
  //     businessCode: this.businessCode.code,
  //     description: this.description,
  //     leader: this.policyHolder,
  //     policyCode: this.code,
  //     policyName: this.policyName,
  //     remark: this.remark,
  //     roleCodes: this.partnerRoleList
  //       .filter(item => item.is_choose)
  //       .map(item => item.code)
  //       .concat(this.otherRoleList.filter(item => item.is_choose).map(item => item.code)).join(',')
  //   }).then(() => {
  //     alert('添加成功！');
  //     this.router.navigate(['../'], { relativeTo: this.route })
  //   }).catch((e) => {
  //     alert(e)
  //   })
  // }

  openDialog(): void {
    let dialogRef = this.dialog.open(PolicySysNewPolicyDialog, {
      width: '550px',
      data: {
        policyType:this.policyType=='0'?'其他政策':'代理商政策',
        aFirstPrize: this.aFirstPrize || '',
        aOtherPrize: this.aOtherPrize || '',
        aSecondPrize: this.aSecondPrize || '',
        bFirstPrize: this.bFirstPrize || '',
        bOtherPrize: this.bOtherPrize || '',
        bSecondPrize: this.bSecondPrize || '',
        businessCode: this.businessCode.code,
        businessName:this.businessCode.name,
        description: this.description,
        leader: this.policyHolder,
        policyCode: this.code,
        policyName: this.policyName,
        remark: this.remark,
        roleCodes: this.partnerRoleList
          .filter(item => item.is_choose)
          .map(item => item.code)
          .concat(this.otherRoleList.filter(item => item.is_choose).map(item => item.code)).join(',')
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
    });
  }

}





@Component({
  selector: 'policy-sys-new-policy-dialog',
  templateUrl: './policy-sys-new-policy-dialog.component.html',
  styleUrls: ['./policy-sys-new-policy.component.scss']
})
export class PolicySysNewPolicyDialog {

  constructor(
    public dialogRef: MatDialogRef<PolicySysNewPolicyDialog>,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  addNewPolicy() {
    this.appService.addPolicy({
      aFirstPrize: this.data.aFirstPrize || '',
      aOtherPrize: this.data.aOtherPrize || '',
      aSecondPrize: this.data.aSecondPrize || '',
      bFirstPrize: this.data.bFirstPrize || '',
      bOtherPrize: this.data.bOtherPrize || '',
      bSecondPrize: this.data.bSecondPrize || '',
      businessCode: this.data.businessCode,
      description: this.data.description,
      leader: this.data.leader,
      businessName:this.data.businessName,
      policyCode: this.data.policyCode,
      policyName: this.data.policyName,
      remark: this.data.remark,
      roleCodes: this.data.roleCodes
    }).then(() => {
      alert('添加成功！');
      this.dialogRef.close();
      this.router.navigate(['../'], { relativeTo: this.route })
    }).catch((e) => {
      alert(e)
    })
  }
}
