import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControlOrderComponent } from './admin-control-order.component';

describe('AdminControlOrderComponent', () => {
  let component: AdminControlOrderComponent;
  let fixture: ComponentFixture<AdminControlOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminControlOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminControlOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
