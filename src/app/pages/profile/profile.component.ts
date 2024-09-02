import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { unsubscribeFromFund } from 'src/app/store/fund/fund.actions';
import { updateUserProfile, resetBalance, loadUser } from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }
  ngOnInit(): void {
    this.store.dispatch(loadUser({userId: 1}));
  }

  onUpdateProfile(user: User): void {
    this.store.dispatch(updateUserProfile({ user }));
  }

  onResetBalance(): void {
    this.store.dispatch(resetBalance({userId: 1}));
  }

  onUnsubscribe(fundId: number): void {
    this.store.dispatch(unsubscribeFromFund({ fundId: fundId }));
  }
}
