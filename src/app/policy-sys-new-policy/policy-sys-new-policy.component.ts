import { Component, OnInit, ViewChild } from '@angular/core';
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
  businessCode={name:'etoro',code:''};
  description;
  policyCode;
  policyName;
  remark;


  constructor(private appService: AppService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.getRoleList();
    this.getPolicyLeader();

    this.route.queryParams.subscribe((qs)=>{
      this.appService.generatePolicyCode(qs.policyType).then((data)=>{
        this.code=data.code;
      })
    })

    this.appService.getBusinessCode().then((codeList)=>{
      this.businessCode=codeList.business[0]
    })
  }

  changeEmp(list, i) {
    list[i]['is_choose'] = !list[i]['is_choose'];
  }

  getRoleList(){
    return this.appService.getRoleList({
      pageSize:1000
    }).then((data)=>{
      this.roleList=data.roles;
    })
  }

  getPolicyLeader(){
    return this.appService.getPolicyLeader().then((data)=>{
      this.leader=data.leader;
    })
  }

  addNewPolicy(){

    this.appService.addPolicy({
      aFirstPrize:this.aFirstPrize,
      aOtherPrize:this.aOtherPrize,
      aSecondPrize:this.aSecondPrize,
      bFirstPrize:this.bFirstPrize,
      bOtherPrize:this.bOtherPrize,
      bSecondPrize:this.bSecondPrize,
      businessCode:this.businessCode.code,
      description:this.description,
      leader:this.policyHolder,
      policyCode:this.code,
      policyName:this.policyName,
      remark:this.remark,
      roleCodes:this.roleList.filter(item=>item.is_choose).map(item=>item.code).join(','),
    }).then(()=>{
      alert('添加成功！');
      this.router.navigate(['../'],{relativeTo:this.route})
    })
  }

}
