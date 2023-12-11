import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsGridComponent } from './contacts-grid.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ContanctsModalComponent } from '../contancts-modal/contancts-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ContactsGridComponent', () => {
  let component: ContactsGridComponent;
  let fixture: ComponentFixture<ContactsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsGridComponent,
        DashboardComponent,
        NavbarComponent,
        ContactsGridComponent,
        ContanctsModalComponent
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
