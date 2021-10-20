import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppointsmentsComponent } from './my-appointsments.component';

describe('MyAppointsmentsComponent', () => {
  let component: MyAppointsmentsComponent;
  let fixture: ComponentFixture<MyAppointsmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAppointsmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppointsmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
