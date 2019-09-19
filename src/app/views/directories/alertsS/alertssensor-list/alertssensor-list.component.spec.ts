import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertssensorListComponent } from './alertssensor-list.component';

describe('AlertssensorListComponent', () => {
  let component: AlertssensorListComponent;
  let fixture: ComponentFixture<AlertssensorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertssensorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertssensorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
