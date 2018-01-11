import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})





export class SearchComponent implements OnInit {

  displayedColumns = ['id', 'bMbUid', 'mbNickName', 'policy', 'firstPositionDate', 'tendollarsQuotaDate',
    'bFirstPrizeStatus',
    'bSecondPrizeStatus',
    'bOtherPrizeStatus',
    'aFirstPrizeStatus',
    'aSecondPrizeStatus',
    'aOtherPrizeStatus',
    'op',
    'remark'
  ];
  dataSource = new MatTableDataSource<SingleData>();
  data;

  public year = (new Date()).getFullYear();
  public loading:boolean=false;
  public month;
  public day;
  public isLeapYear: boolean = false;
  public status = '0';
  public isExecute: any = '0';
  public policyType: any = '0';
  public keyWord;
  public page = 0;
  public pageSize = 10;
  public type = '0';
  public dataLength=0;
  public info:any={};

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

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.generateDateList();
    this.queryData();
  }

  openDaySelect() {
    // if(!this.month) return alert('请先选择月份')
  }
  generateDateList() {
    const maxYear = (new Date()).getFullYear();
    const minYear = 2016;
    for (let i = minYear; i <= maxYear; i++) { this.yearList.push(i) }
    //this.generateDayList(31);
  }

  generateDayList(max) {
    this.dayList = [];
    for (let i = 1; i <= max; i++) {
      if (i < 10) {
        this.dayList.push(`0${i}`);
      } else {
        this.dayList.push(`${i}`);
      }
    }
  }

  changeYear() {
    this.isLeapYear = ((this.year % 4) == 0) && ((this.year % 100) != 0) || ((this.year % 400) == 0);

  }

  changeMonth() {
    this.generateDayList(30);
    console.log(this.month, Number(this.month))
    if (Number(this.month) <= 7) {
      if (Number(this.month) % 2 == 1) this.generateDayList(31);
      if (Number(this.month) == 2 && this.isLeapYear == true) this.generateDayList(29);
      if (Number(this.month) == 2 && this.isLeapYear == false) this.generateDayList(28);
    } else {
      if (Number(this.month) % 2 == 0) this.generateDayList(31);
    }
  }
  renderData(result){
    this.loading=false;
    this.data = result.record;
    this.dataLength=result.totalRows;
    this.info={
      aDenominator:result.aDenominator,
      aMolecule:result.aMolecule,
      bDenominator:result.aMolecule,
      bMolecule:result.aMolecule,
      cDenominator:result.aMolecule,
      cMolecule:result.aMolecule
    }
  }
  queryUserData(){
    this.data=[];
    this.loading=true;
    this.appService.queryData({
      keyWord: this.keyWord,
      page: this.page,
      pageSize: this.pageSize,
      type: this.type
    }).then((result)=>{
      this.renderData(result)
    });
  }
  queryData() {
    this.data=[];
    this.loading=true;
    this.appService.queryData({
      date: [this.year,this.month,this.day].join(''),
      isExecute: this.isExecute,
      keyWord: this.keyWord,
      page: this.page,
      pageSize: this.pageSize,
      policyType: this.policyType,
      status: this.status,
      type: this.type
    }).then((result)=>{
      this.renderData(result)
    });

  }

  pageEvent(event){
    console.log(event);
    this.page=event.pageIndex;
    this.pageSize=event.pageSize;
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


const MOCK_DATA = { "record": [{ "id": 125, "bMbUid": 4325653, "remark": null, "aFirstPrizeStatus": 0, "aSecondPrizeStatus": 0, "aOtherPrizeStatus": 0, "bFirstPrizeStatus": 0, "bSecondPrizeStatus": 0, "bOtherPrizeStatus": 0, "aFirstPrizeStatusStr": null, "aSecondPrizeStatusStr": null, "aOtherPrizeStatusStr": null, "bFirstPrizeStatusStr": null, "bSecondPrizeStatusStr": null, "bOtherPrizeStatusStr": null, "mbNickName": "游客4231409", "policy": "自然户600", "firstPositionDate": null, "tendollarsQuotaDate": null, "totalDeposits": null, "totalTrades": null }, { "id": 130, "bMbUid": 276065, "remark": null, "aFirstPrizeStatus": 0, "aSecondPrizeStatus": 0, "aOtherPrizeStatus": 0, "bFirstPrizeStatus": 0, "bSecondPrizeStatus": 0, "bOtherPrizeStatus": 0, "aFirstPrizeStatusStr": null, "aSecondPrizeStatusStr": null, "aOtherPrizeStatusStr": null, "bFirstPrizeStatusStr": null, "bSecondPrizeStatusStr": null, "bOtherPrizeStatusStr": null, "mbNickName": "波比", "policy": "自然户600", "firstPositionDate": null, "tendollarsQuotaDate": null, "totalDeposits": null, "totalTrades": null }, { "id": 128, "bMbUid": 708065, "remark": null, "aFirstPrizeStatus": 0, "aSecondPrizeStatus": 0, "aOtherPrizeStatus": 0, "bFirstPrizeStatus": 0, "bSecondPrizeStatus": 0, "bOtherPrizeStatus": 0, "aFirstPrizeStatusStr": null, "aSecondPrizeStatusStr": null, "aOtherPrizeStatusStr": null, "bFirstPrizeStatusStr": null, "bSecondPrizeStatusStr": null, "bOtherPrizeStatusStr": null, "mbNickName": "MaDDaxchann", "policy": "好友邀请600", "firstPositionDate": null, "tendollarsQuotaDate": null, "totalDeposits": null, "totalTrades": null }], "totalRows": 3, "totalPages": 1, "page": 0, "pageSize": 10, "aMolecule": 0, "aDenominator": 3, "bMolecule": 0, "bDenominator": 18, "cMolecule": 0.0, "cDenominator": 1800.0, "statusCode": "200", "token": null, "sid": null, "msg": null };

