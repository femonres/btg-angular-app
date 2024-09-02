import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { loadUser } from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private store: Store<{ user: User }>) {
    this.user$ = this.store.select(selectUser);
  }
  ngOnInit(): void {
    this.store.dispatch(loadUser({userId: 1}))
  }

  get userName(): string {
    let name = '';
    this.user$.subscribe((user) => (name = user ? user.name : 'Guest'));
    return name;
  }

  get userBalance(): number {
    let balance = 0;
    this.user$.subscribe((user) => (balance = user ? user.balance : 0));
    return balance;
  }
}
