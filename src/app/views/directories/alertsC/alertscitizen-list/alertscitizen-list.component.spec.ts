import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertscitizenListComponent } from './alertscitizen-list.component';

describe('AlertscitizenListComponent', () => {
  let component: AlertscitizenListComponent;
  let fixture: ComponentFixture<AlertscitizenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertscitizenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertscitizenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
