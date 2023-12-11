import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardComponent } from './dashboard.component';
import { ContactsGridComponent } from '../contacts-grid/contacts-grid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContanctsModalComponent } from '../contancts-modal/contancts-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
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
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
