import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-sample',
  templateUrl: './flex-sample.component.html',
  styleUrls: ['./flex-sample.component.scss']
})
export class FlexSampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  title = 'app';
  calc2Cols = '2 2 calc(10em + 10px);';
  /** 10px is the missing margin of the missing box */
  calc3Cols = '3 3 calc(15em + 20px)';
}
