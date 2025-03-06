import { Injectable } from '@angular/core';
import { /* PlugLogin, StoicLogin,  */NFIDLogin, /* IdentityLogin, HelloIDL, CreateActor */ } from 'ic-auth';
import { WalletRepository } from '../../../domain/repository/wallet.repository';

@Injectable({
  providedIn: 'root'
})
export class NfidWalletService extends WalletRepository {

  constructor() {
    super();
   }

  connect = (): Promise<string[]> => {
    return new Promise<string[]>(async (resolve, reject) => {
      try {
      const userObject = await NFIDLogin();
      console.log("userObject", userObject);//userObject.principal
      resolve([userObject.principal]);
      } catch (err) {
        reject(err);
      }
    });
  }
}
