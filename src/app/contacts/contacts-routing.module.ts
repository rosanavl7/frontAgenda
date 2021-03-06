import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'contactsList', pathMatch: 'full'},
  {path: 'contactsList', component: ContactsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
