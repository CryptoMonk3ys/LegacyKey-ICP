import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MetamaskWalletService } from '../metamask-wallet/metamask-wallet.service';
import { Web3Wallet } from '../../../domain/type/web3-wallet.type';
import { Account } from '../../../domain/model/account.model';
import { NfidWalletService } from '../nfid-wallet/nfid-wallet.service';
import { Web3AuthWalletService } from '../web3-auth-wallet/web3-auth-wallet.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentAccountAddress: string | null = null;

  private _accountAddress = new BehaviorSubject<string | null>(this._currentAccountAddress);
  public accountAddress = this._accountAddress.asObservable();

  constructor(
    private metamaskWallet: MetamaskWalletService,
    private nfidWalletService: NfidWalletService,
    private web3AuthWalletService: Web3AuthWalletService
  ) {
  }

  connect(wallet: Web3Wallet): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {
      switch (wallet) {
        case "metamask": {
          const accounts = await this.metamaskWallet.connect();
          this.setAccountAddress(accounts[0]);
          resolve(accounts);
          break;
        }
        case "NFID": {
          const accounts = await this.nfidWalletService.connect();
          this.setAccountAddress(accounts[0]);
          resolve(accounts);
          break;
        }
        case "web3auth": {
          const accounts = await this.web3AuthWalletService.connect();
          this.setAccountAddress(accounts[0]);
          resolve(accounts);
          break;
        }
        default:
          break;
      }
    });
  }

  private setAccountAddress(accountAddress: string | null) {
    this._currentAccountAddress = accountAddress;
    this._accountAddress.next(accountAddress);
  }

  getAccountAddress(): string | null {
    return this._currentAccountAddress;
  }

  getAccount(): Promise<Account> {
    const acc: Account = {
      address: this._currentAccountAddress
    };
    return Promise.resolve(acc);
  }
}
