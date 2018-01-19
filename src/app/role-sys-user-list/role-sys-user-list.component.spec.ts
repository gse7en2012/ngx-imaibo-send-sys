import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSysUserListComponent } from './role-sys-user-list.component';

describe('RoleSysUserListComponent', () => {
  let component: RoleSysUserListComponent;
  let fixture: ComponentFixture<RoleSysUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSysUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSysUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
