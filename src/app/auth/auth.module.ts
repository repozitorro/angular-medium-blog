import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import {RegisterComponent} from './components/register/register.component';
import {reducers} from './store/reducers';
import {AuthService} from './services/auth.service';
import {EffectsModule} from '@ngrx/effects';
import {RegisterEffect} from './store/effects/register.effect';
import {BackendErrorsMessagesModule} from '../shared/modules/backendErrorMessages/backendErrorsMessages.module';
import {PersistanceService} from '../shared/services/persistance.service';

const routes: Routes = [
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorsMessagesModule,
  ],
  declarations: [RegisterComponent],
  providers: [
    AuthService,
    PersistanceService
  ]
})

export class AuthModule {
  constructor() {
  }
}
