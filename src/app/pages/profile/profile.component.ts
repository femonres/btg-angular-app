import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionsSubject, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { unsubscribeFromFund } from 'src/app/store/fund/fund.actions';
import { updateUserProfile, resetBalance, loadUser, actionUserSuccess, actionUserFailure } from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  isSmallScreen: boolean;
  isEditing: boolean = false;

  currentUser!: User;
  userProfileForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private snackBar: MatSnackBar, private actionsSubject: ActionsSubject) {
    this.isSmallScreen = window.innerWidth <= 768;
    window.onresize = () => this.isSmallScreen = window.innerWidth <= 768;

    this.store.select(selectUser).subscribe(user => {
      this.currentUser = user!;
      console.log('ProfileComponent user', user);

      this.userProfileForm = this.fb.group({
        name: [this.currentUser?.name || '', [Validators.required]],
        email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
        phone: [this.currentUser?.phone || '', [Validators.required]],
        notification: [this.currentUser?.notification || 'EMAIL'],
      });
    });
  }

  ngOnInit(): void {
    // Escuchar las acciones de éxito
    this.actionsSubject.pipe(
      filter((action) => action.type === actionUserSuccess.type)
    ).subscribe((action: any) => {
      this.snackBar.open(action.message, 'Cerrar', { duration: 5000, panelClass: 'success-snackbar', horizontalPosition: 'end', verticalPosition: 'bottom' });
      this.store.dispatch(loadUser({userId: this.currentUser.id}));
    });

    // Escuchar las acciones de error
    this.actionsSubject.pipe(
      filter((action) => action.type === actionUserFailure.type)
    ).subscribe((action: any) => {
      this.snackBar.open(action.error, 'Cerrar', { duration: 5000, panelClass: 'error-snackbar', horizontalPosition: 'end', verticalPosition: 'bottom' });
    });
  }

  toggleEditProfile() {
    this.isEditing = !this.isEditing;
  }

  onUpdateProfile(userId: number): void {
    console.log('onUpdateProfile', userId);
    if (this.userProfileForm.valid) {
      const updatedProfile: User = this.userProfileForm.value;
      console.log('updatedProfile', updatedProfile);
      this.store.dispatch(updateUserProfile({ userId: userId, user: updatedProfile }));
      this.toggleEditProfile();
    }
  }

  onResetBalance(): void {
    console.log('onResetBalance');
    if (window.confirm("Está seguro de que desea reiniciar el balance, esto eliminará todas las suscripciones que tenga activas y volverá a cargar el balance inicial")) {
      this.store.dispatch(resetBalance({userId: this.currentUser.id}));
    }
  }

  onCancelSubscription(fundId: number, fundName: string): void {
    console.log('onCancelSubscription', fundId);
    if (window.confirm("Está seguro de que desea cancelar la suscripcion con el fondo " + fundName)) {
      //this.store.dispatch(unsubscribeFromFund({ fundId: fundId, userId: this.currentUser.id }));
    }
  }
}
