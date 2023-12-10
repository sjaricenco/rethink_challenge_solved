import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactModel } from '../../models/dashboard.model';
import { ApiService } from '../../service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { NotificationStatus } from '../../models/notificationStatus';

@Component({
  selector: 'app-contacts-grid',
  templateUrl: './contacts-grid.component.html',
  styleUrl: './contacts-grid.component.css'
})
export class ContactsGridComponent implements OnInit {
  contactModelObj : ContactModel = new ContactModel();
  contactData :any;
  showAdd : boolean = false;
  showUpdate !: boolean;

  constructor(private api : ApiService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.getAllContacts();
  }

  clickAddContact() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  getAllContacts(){
    this.api.getContacts()
    .subscribe(res =>{
     this.contactData = res;
    })
  }

  deleteContact(row : any){ 
   this.api.deleteContact(row.id)
   .subscribe(res => 
    {
      this.showNotificationSuccess("Contact deleted successfully");
      this.getAllContacts();
    },
    (error) => {
      console.log(error.error.Message);
      this.showNotificationError(error.Message);
    })
  }

  handleCreateContactEvent(contactModelObj : ContactModel){

    this.api.postContact(contactModelObj)
    .subscribe(res => {
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllContacts();
      this.showNotificationSuccess("New contact added successfully");
    },
    (error) => {
      console.log(error.error.Message);
      this.showNotificationError(error.Message);
    })
  }

  editContact(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.updateContactObjectModel(row);
  }
  
  handleUpdateContactEvent(contactModelObj : ContactModel){

    this.api.updateContact(contactModelObj, contactModelObj.id)
    .subscribe(res =>
      {
        this.showNotificationSuccess("Existing contact updated successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.getAllContacts();
      },
      (error) => {
        console.log(error.error.Message);
        this.showNotificationError(error.error.Message);
      })  
  }

  handleresetContactDataEvent() {
    this.showAdd = false;
    this.showUpdate = false;
  }

  updateContactObjectModel(row: any) {
    this.contactModelObj.id = row.id;
    this.contactModelObj.firstName = row.firstName;
    this.contactModelObj.lastName = row.lastName;
    this.contactModelObj.email = row.email;
  }

  showNotificationSuccess(message: string) {
    this.showNotification(NotificationStatus.success, message);
  }

  showNotificationError(message: string) {
    this.showNotification(NotificationStatus.error, message);
  }

  showNotification(status: NotificationStatus, message: string) {
    if (status === NotificationStatus.success)
      this.toast.success({detail: "Success", summary: message, duration: 2500, position: 'bottomRight'});
    else if (status === NotificationStatus.error)
      this.toast.error({detail: "Error", summary: message, duration: 5000, position: 'bottomRight'});
    else
      this.toast.info({detail: "Info", summary: message, duration: 2500, position: 'bottomRight'});
  }
}
