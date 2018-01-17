import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../service/app.service';

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
  public policyHolder:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.queryData();
    this.getPolicyLeader();
  }

  openDaySelect() {
    // if(!this.month) return alert('请先选择月份')
  }

  getPolicyLeader(){
    return this.appService.getPolicyLeader().then((data)=>{
      this.leader=data.leader;
    })
  }

  renderData(result) {
    this.loading = false;
    this.data = result.policy;
    this.dataLength = result.totalRows;

  }
  queryUserData() {
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
