import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeursListComponent } from './acteurs-list.component';

describe('ActeursListComponent', () => {
  let component: ActeursListComponent;
  let fixture: ComponentFixture<ActeursListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActeursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
