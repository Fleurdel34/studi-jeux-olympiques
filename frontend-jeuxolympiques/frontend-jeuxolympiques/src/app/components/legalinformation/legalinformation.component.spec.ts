import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalinformationComponent } from './legalinformation.component';

describe('LegalinformationComponent', () => {
  let component: LegalinformationComponent;
  let fixture: ComponentFixture<LegalinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
