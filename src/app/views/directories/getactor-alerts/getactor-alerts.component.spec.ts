import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetactorAlertsComponent } from './getactor-alerts.component';

describe('GetactorAlertsComponent', () => {
  let component: GetactorAlertsComponent;
  let fixture: ComponentFixture<GetactorAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetactorAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetactorAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
