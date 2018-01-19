import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSysNewRoleComponent } from './role-sys-new-role.component';

describe('RoleSysNewRoleComponent', () => {
  let component: RoleSysNewRoleComponent;
  let fixture: ComponentFixture<RoleSysNewRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSysNewRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSysNewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
