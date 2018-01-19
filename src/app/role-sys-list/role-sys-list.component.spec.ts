import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSysListComponent } from './role-sys-list.component';

describe('RoleSysListComponent', () => {
  let component: RoleSysListComponent;
  let fixture: ComponentFixture<RoleSysListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSysListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
