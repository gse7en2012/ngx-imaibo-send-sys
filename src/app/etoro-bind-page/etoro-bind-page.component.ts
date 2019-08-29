import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AppService } from '../service/app.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'etoro-bind',
  templateUrl: './etoro-bind-page.component.html',
  styleUrls: ['./etoro-bind-page.component.scss']
})
export class EtoroBindComponent implements OnInit {

  policyCode;
  iUid;
  maiboUid;
  maiboNickname;
  etoroName;
  maiboType = 0;
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, ) { }

  ngOnInit() {


  }

  bindBps(confirmFlag = 0) {
    if (!this.etoroName || !this.policyCode || !this.iUid) return alert('请把信息填写完整！');
    if (this.maiboType == 0) {
      if (!this.maiboUid) return alert('请填写脉搏uid')
    }
    return this.appService.postBindBps({
      confirm: confirmFlag,
      invi️teUid: this.iUid,
      mbUid: this.maiboUid,
      policyCode: this.policyCode,
      type: this.maiboType,
      username: this.etoroName
    }).then((data) => {
      if (data.statusCode == 200) {
        alert('新增成功');
        this.router.navigate(['/admin/open/']);
      } else if (data.statusCode == 1025) {
        if (confirm('该脉搏账号uid已绑定过etoro用户名，确定要替代原绑定？')) {
          this.bindBps(1);
        }
      } else {
        alert(data.msg)
      }
    })
  }

  getNickname() {
    return this.appService.getNickNameViaUid(this.maiboUid).then((data) => {
      if (data.statusCode == 200) {
        this.maiboNickname = data.data.uname;
      } else {
        alert(data.msg)
      }
    })
  }


}




