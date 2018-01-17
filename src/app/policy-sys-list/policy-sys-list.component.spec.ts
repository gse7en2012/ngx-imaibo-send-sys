import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySysListComponent } from './policy-sys-list.component';

describe('PolicySysListComponent', () => {
  let component: PolicySysListComponent;
  let fixture: ComponentFixture<PolicySysListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicySysListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicySysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
