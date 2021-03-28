
import { Component, OnInit } from '@angular/core';
import { IContacts } from 'src/app/interfaces/i-contacts';
import { IReturn } from 'src/app/interfaces/i-return';
import { ContactService } from 'src/app/services/contact.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  ContactsList: Array<IContacts>;
  msgStatus;
  selectedContact: IContacts = undefined;
  selectedIndex: number = -1;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.readAllContacts();
  }

  readAllContacts() {
    this.contactService.readAllContacts().subscribe((respuesta: IReturn) => {
      if (respuesta.validRequest == false) {
        console.log('El servicio ha fallado, no tiene respuesta del backend');
        this.msgStatus = respuesta.msg;
        this.ContactsList = undefined;
        return;
      }
      this.ContactsList = respuesta.data;
      this.msgStatus = respuesta.msg;
    });
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe((respuesta: IReturn) => {
      _.remove(this.ContactsList, { _id: id });
      this.msgStatus = respuesta.msg;
    });
  }

  onCreateUpdateContact(contactDetails: IContacts) {
    this.contactService
      .createUpdate(contactDetails)
      .subscribe((respuesta: IReturn) => {
        if (contactDetails._id === '' || contactDetails._id === undefined) {
          this.ContactsList.push(respuesta.data);
          if (respuesta.status) {
            this.msgStatus = `Se ha ceado un registro para el contacto  ${contactDetails.name}`;
          }
        } else {
          this.ContactsList[this.selectedIndex] = respuesta.data;
          this.msgStatus = `Los datos del contacto ${contactDetails.name} han sido actualizados`;
        }
      });
  }

  setSelectedContact( contact: IContacts, position: number) {
    this.selectedIndex = position;
    this.selectedContact = contact;
  }

  setCreate() {
    this.selectedIndex = -1;
    this.selectedContact = {
      name: '',
      _id: '',
      surname: '',
      phone: 0
    }
  }
}



