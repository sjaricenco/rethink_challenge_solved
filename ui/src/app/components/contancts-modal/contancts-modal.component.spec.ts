import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContanctsModalComponent } from './contancts-modal.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ContactsGridComponent } from '../contacts-grid/contacts-grid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ContanctsModalComponent', () => {
  let component: ContanctsModalComponent;
  let fixture: ComponentFixture<ContanctsModalComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContanctsModalComponent,
        DashboardComponent,
        NavbarComponent,
        ContactsGridComponent,],
        imports: [
          HttpClientTestingModule,
          FormsModule,
          ReactiveFormsModule
        ]
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(ContanctsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be valid if form value is valid', () => {
    component.formValue.setValue({
      "lastName": "Bobby", 
      "firstName": "Fisher", 
      "email": "bobby@bobby.com", 
      
    }); 

    expect(component.formValue.valid).toEqual(true);
  });
});
