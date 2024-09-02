import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavbarComponent } from './components/templates/navbar/navbar.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { FundsComponent } from './pages/funds/funds.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { userReducer } from './store/user/user.reducer';
import { fundReducer } from './store/fund/fund.reducer';
import { transactionReducer } from './store/transaction/transaction.reducer';
import { UserEffects } from './store/user/user.effects';
import { FundsEffects } from './store/fund/fund.effects';
import { TransactionEffects } from './store/transaction/transaction.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ButtonAtomComponent } from './components/atoms/button-atom/button-atom.component';
import { ModalMoleculeComponent } from './components/molecules/modal-molecule/modal-molecule.component';
import { TableMoleculeComponent } from './components/molecules/table-molecule/table-molecule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CamelCaseInterceptor } from './shared/interceptors/camel-case.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    FundsComponent,
    TransactionsComponent,
    ProfileComponent,
    ButtonAtomComponent,
    ModalMoleculeComponent,
    TableMoleculeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      user: userReducer,
      funds: fundReducer,
      transactions: transactionReducer
    }),
    EffectsModule.forRoot([UserEffects, FundsEffects, TransactionEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode()}),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CamelCaseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
