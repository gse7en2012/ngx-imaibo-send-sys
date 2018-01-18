import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySysNewPolicyComponent } from './policy-sys-new-policy.component';

describe('PolicySysNewPolicyComponent', () => {
  let component: PolicySysNewPolicyComponent;
  let fixture: ComponentFixture<PolicySysNewPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicySysNewPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicySysNewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
