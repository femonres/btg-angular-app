import { Fund } from "../models/fund";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";


export interface AppState {
  user: UserState;
  funds: FundsState;
  transactions: TransactionState;
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export interface FundsState {
  funds: Fund[];
  selectedFundId: number | null;
  loading: boolean;
  error: string | null;
}

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}
