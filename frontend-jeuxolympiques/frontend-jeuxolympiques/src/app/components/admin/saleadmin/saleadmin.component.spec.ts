import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleadminComponent } from './saleadmin.component';

describe('SaleadminComponent', () => {
  let component: SaleadminComponent;
  let fixture: ComponentFixture<SaleadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
