import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySysDetailsComponent } from './policy-sys-details.component';

describe('PolicySysDetailsComponent', () => {
  let component: PolicySysDetailsComponent;
  let fixture: ComponentFixture<PolicySysDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicySysDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicySysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
