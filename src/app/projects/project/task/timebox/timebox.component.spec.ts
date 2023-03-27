import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeboxComponent } from './timebox.component';

describe('TimeboxComponent', () => {
  let component: TimeboxComponent;
  let fixture: ComponentFixture<TimeboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
