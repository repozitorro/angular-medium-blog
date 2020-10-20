import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackendErrorsMessagesComponent} from './components/backendErrorsMessages/backendErrorsMessages.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorsMessagesComponent],
  exports: [BackendErrorsMessagesComponent]
})

export class BackendErrorsMessagesModule {
}
