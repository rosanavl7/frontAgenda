import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { CreatecontactsComponent } from './createcontact/createcontact.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreatecontactsComponent, ContactsListComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactsModule { }
