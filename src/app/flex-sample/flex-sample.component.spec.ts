import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexSampleComponent } from './flex-sample.component';

describe('FlexSampleComponent', () => {
  let component: FlexSampleComponent;
  let fixture: ComponentFixture<FlexSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
