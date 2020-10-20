import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

import {registerAction, registerFailureAction, registerSuccessAction} from '../register.action';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {PersistanceService} from '../../../shared/services/persistance.service';
import {Router} from '@angular/router';


@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request}) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          // window.localStorage.setItem('accessToken', JSON.stringify(currentUser.token));
          this.persistanceService.set('accessToken', currentUser.token);
          return registerSuccessAction({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(registerFailureAction({errors: errorResponse.error.errors}));
        })
      );
    })
  ));

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(registerSuccessAction),
    tap(() => {
      this.router.navigateByUrl('/');
    })
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {
  }
}
