import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSysSwitchComponent } from './role-sys-switch.component';

describe('RoleSysSwitchComponent', () => {
  let component: RoleSysSwitchComponent;
  let fixture: ComponentFixture<RoleSysSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSysSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSysSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
