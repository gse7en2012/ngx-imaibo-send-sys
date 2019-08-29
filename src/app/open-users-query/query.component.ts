import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../service/app.service';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-open-user-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})





export class QueryComponent implements OnInit {


  dataSource = new MatTableDataSource<SingleData>();
  data = [];


  // public year = (new Date()).getFullYear();
  public start = new Date(moment().add(-7, 'days').unix() * 1000);
  public end = new Date();
  public reUid;
  public year;
  public loading: boolean = false;
  // public month=((new Date()).getMonth()+1)<10?'0'+((new Date()).getMonth()+1):''+((new Date()).getMonth()+1);
  public month;
  public day;
  public isLeapYear: boolean = false;
  public status = '0';
  public isExecute: any = '0';
  public policyType: any = '0';
  public keyWord: any = '';
  public page = 0;
  public pageSize = 10;
  public userType = '0';
  public dataLength = 0;
  public info: any = {};

  public exportQs: any;

  public yearList: number[] = [];
  public monthList: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public dayList: string[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private appService: AppService, private router: Router, ) { }

  ngOnInit() {
    console.log(moment().add(-7, 'days').unix())
    this.queryData();
  }

  bindEtoro() {
    this.router.navigate(['/admin/open/bind'],
      {
        queryParams: { newf: 1 }
      }
    )
  }


  renderData(result) {
    this.loading = false;
    this.data = result.data.list;
    this.dataLength = result.data.totalRows;
    this.data.forEach((item, index) => {
      item.id = (this.page) * this.pageSize + index + 1;
    })
    // this.info = {
    //   aDenominator: result.aDenominator,
    //   aMolecule: result.aMolecule,
    //   bDenominator: result.bDenominator,
    //   bMolecule: result.bMolecule,
    //   cDenominator: result.cDenominator,
    //   cMolecule: result.cMolecule
    // }
  }
  queryUserData() {
    this.data = [];
    this.loading = true;
    const qs: any = {
      type: 2
    };
    const key = ['mbUid', 'phone', 'username'][this.userType];
    qs[key] = this.keyWord;
    this.appService.getAccountOpenList(qs).then((result) => {

      this.renderData(result);
      this.exportQs = Object.keys(qs).map((k) => {
        if (qs[k])
          return k + '=' + qs[k]
        else
          return ''
      }).join('&');
    });
  }
  queryData() {
    this.data = [];
    this.loading = true;
    const qs = {
      page: this.page,
      pageSize: this.pageSize,
      policyType: this.policyType,
      type: 1,
    };
    if (this.reUid) qs['invi️teUid'] = this.reUid;
    if (this.start) qs['startDate'] = moment(this.start).format('YYYY-MM-DD')
    if (this.end) qs['endDate'] = moment(this.end).format('YYYY-MM-DD')

    this.appService.getAccountOpenList(qs).then((result) => {

      this.renderData(result);
      this.exportQs = Object.keys(qs).map((k) => {
        if (qs[k])
          return k + '=' + qs[k]
        else
          return ''
      }).join('&');

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
  id: number;
  bMbUid: number;
  mbNickName: string;
  policy: string;
  firstPositionDate: any;
  tendollarsQuotaDate: any;
  bFirstPrizeStatus: number;
  bSecondPrizeStatus: number;
  bOtherPrizeStatus: number;
  aFirstPrizeStatus: number;
  aSecondPrizeStatus: number;
  aOtherPrizeStatus: number;
}


