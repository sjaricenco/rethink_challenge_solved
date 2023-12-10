import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContanctsModalComponent } from './contancts-modal.component';

describe('ContanctsModalComponent', () => {
  let component: ContanctsModalComponent;
  let fixture: ComponentFixture<ContanctsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContanctsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContanctsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
