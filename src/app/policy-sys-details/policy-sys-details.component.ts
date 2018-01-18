import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-policy-sys-details',
  templateUrl: './policy-sys-details.component.html',
  styleUrls: ['./policy-sys-details.component.scss']
})
export class PolicySysDetailsComponent {



  constructor(
    public dialogRef: MatDialogRef<PolicySysDetailsComponent>,
    private appSerivce: AppService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      
    }


  

}
