import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservationModalComponent } from './view-reservation-modal.component';

describe('ViewReservationModalComponent', () => {
  let component: ViewReservationModalComponent;
  let fixture: ComponentFixture<ViewReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReservationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
