import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactModel } from '../../models/dashboard.model';

@Component({
  selector: 'app-contancts-modal',
  templateUrl: './contancts-modal.component.html',
  styleUrl: './contancts-modal.component.css'
})
export class ContanctsModalComponent implements OnInit{
  
  @Input() contactModelObj : ContactModel = new ContactModel();

  @Input() showAdd: boolean = false;
  @Input() showUpdate: boolean = false;

  @Output() createContactEvent = new EventEmitter<ContactModel>();
  @Output() updateContactEvent = new EventEmitter<ContactModel>();
  @Output() resetContactDataEvent = new EventEmitter<ContactModel>();

  formValue !: FormGroup;

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : new FormControl('', [Validators.required]),
      lastName : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email])
    })
  }

  postContactDetails() {
    this.populateContactModel();
    this.createContactEvent.emit(this.contactModelObj);
    this.formValue.reset();
  }

    
  updateContact() {
    this.populateContactModel();    
    this.updateContactEvent.emit(this.contactModelObj);
    this.formValue.reset();
  }

  populateContactModel() {
    this.contactModelObj.firstName = this.formValue.value.firstName;
    this.contactModelObj.lastName = this.formValue.value.lastName;
    this.contactModelObj.email = this.formValue.value.email;
  }

  ngOnChanges(changes: SimpleChanges) {
        
    if (changes["showUpdate"] !== undefined && changes["showUpdate"].currentValue != changes["showUpdate"].previousValue) {
      this.formValue.controls['firstName'].setValue(this.contactModelObj.firstName);
      this.formValue.controls['lastName'].setValue(this.contactModelObj.lastName);
      this.formValue.controls['email'].setValue(this.contactModelObj.email);
    }

    if (changes["showAdd"] !== undefined && changes["showAdd"].currentValue) {
      this.formValue.controls['firstName'].setValue('');
      this.formValue.controls['lastName'].setValue('');
      this.formValue.controls['email'].setValue('');
    }
  }

  reverseShowUpdate() {
    this.formValue.reset();
    this.resetContactDataEvent.emit();
  }

  onSubmit() {
    console.log(this.formValue.value);
  }

  get firstName() {
    return this.formValue.get('firstName');
  }

  get lastName() {
    return this.formValue.get('lastName');
  }

  get email() {
    return this.formValue.get('email');
  }
}
