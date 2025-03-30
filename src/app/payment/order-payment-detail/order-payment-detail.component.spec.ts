import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentDetailComponent } from './order-payment-detail.component';

describe('OrderPaymentDetailComponent', () => {
  let component: OrderPaymentDetailComponent;
  let fixture: ComponentFixture<OrderPaymentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPaymentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
