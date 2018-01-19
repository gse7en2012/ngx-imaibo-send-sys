import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-sys-switch',
  templateUrl: './role-sys-switch.component.html',
  styleUrls: ['./role-sys-switch.component.scss']
})
export class RoleSysSwitchComponent implements OnInit {

  navLinks=[
    {path:'users',label:'用户角色列表'},
    {path:'list',label:'角色类型列表'}
   
  ]


  constructor() { }

  ngOnInit() {
  }

}
