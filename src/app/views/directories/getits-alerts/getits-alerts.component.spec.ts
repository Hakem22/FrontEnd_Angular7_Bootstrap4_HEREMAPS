import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetitsAlertsComponent } from './getits-alerts.component';

describe('GetitsAlertsComponent', () => {
  let component: GetitsAlertsComponent;
  let fixture: ComponentFixture<GetitsAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetitsAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetitsAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
