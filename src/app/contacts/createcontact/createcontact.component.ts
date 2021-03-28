import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateUpdatecontact } from '../../interfaces/i-create-updatecontact';
import { IContacts } from 'src/app/interfaces/i-contacts';

@Component({
  selector: 'app-createcontact',
  templateUrl: './createcontact.component.html',
  styleUrls: ['./createcontact.component.scss'],
})
export class CreatecontactsComponent implements OnInit {
  
  contactForm: FormGroup;
  @Input()
  selectedContact: IContacts = { _id: '', name: '', phone: 0, surname: '' };

  @Output()
  createUpdateContactEvent = new EventEmitter<IContacts>();

  create: boolean;
  createUpdateMsg: string;

  constructor(private fb: FormBuilder) {}

  createContactForm() {
    console.log("estoy en contactform");
    this.contactForm = this.fb.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', [Validators.max(25), Validators.min(0)]],
      surname: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createUpdateMsg = 'Crear';
    this.createContactForm();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    //console.log(changes);
    if (changes.selectedContact && changes.selectedContact.currentValue != undefined) {
      if (this.selectedContact._id === undefined || this.selectedContact._id === '') {
        this.createUpdateMsg = "Crear";
      } else {
        this.createUpdateMsg = "Actualizar";
      }
    
      this.contactForm.controls['_id'].patchValue(this.selectedContact._id);
      this.contactForm.controls['name'].patchValue(this.selectedContact.name);
      this.contactForm.controls['phone'].patchValue(this.selectedContact.phone);
      this.contactForm.controls['surname'].patchValue(this.selectedContact.surname);
      this.create = false;
    }
    else if (changes.selectedContact) {
      this.create = true;
    }
  }


  onSubmit(contactDetails: ICreateUpdatecontact) {
    if (
      contactDetails.name === '' ||
      contactDetails.phone === null ||
      contactDetails.surname == ''
    ) {
      alert('Tienes que rellenar todo el formulario');
    } else {
      if (this.create) {
        delete contactDetails._id;
        this.contactForm.reset();
      }
      this.createUpdateContactEvent.emit(contactDetails);
    }
  }
}
