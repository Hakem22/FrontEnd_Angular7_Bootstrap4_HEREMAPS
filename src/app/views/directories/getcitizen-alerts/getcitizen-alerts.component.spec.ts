import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcitizenAlertsComponent } from './getcitizen-alerts.component';

describe('GetcitizenAlertsComponent', () => {
  let component: GetcitizenAlertsComponent;
  let fixture: ComponentFixture<GetcitizenAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcitizenAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcitizenAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
