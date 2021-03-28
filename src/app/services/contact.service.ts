import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUpdatecontact } from '../interfaces/i-create-updatecontact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private createContactURL = 'http://localhost:3000/api/agendaEdibo/v0/contactos/create';
  private readAllContactsURL = 'http://localhost:3000/api/agendaEdibo/v0/contactos/readAll'
  private updateContactsURL = 'http://localhost:3000/api/agendaEdibo/v0/contactos/update'
  private deleteContactsURL = 'http://localhost:3000/api/agendaEdibo/v0/contactos/delete/'

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  constructor(private httpClient: HttpClient) { }

  readAllContacts(){
    return this.httpClient.get(this.readAllContactsURL, this.httpOptions);
  }

  deleteContact(id:string){
    return this.httpClient.delete(this.deleteContactsURL + id, this.httpOptions);
  }

  createUpdate(contactDetails: ICreateUpdatecontact){
    if(contactDetails._id === '' || contactDetails._id === undefined){
      delete contactDetails._id;
      return this.httpClient.post(this.createContactURL, contactDetails, this.httpOptions);
    }
    return this.httpClient.post(this.updateContactsURL, contactDetails, this.httpOptions);
  }

}
