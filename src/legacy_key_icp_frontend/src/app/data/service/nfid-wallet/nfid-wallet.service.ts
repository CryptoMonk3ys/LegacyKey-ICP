import { Injectable } from '@angular/core';
import { /* PlugLogin, StoicLogin,  */NFIDLogin } from 'ic-auth';
import { WalletRepository } from '../../../domain/repository/wallet.repository';
import * as backendIDL from '../../../../../../declarations/legacy_key_icp_backend';
import { environment } from '../../../../environments/environment';
import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

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
        const host = environment.MOTOKO_CANISTER_HOST;
        const userObject = await NFIDLogin(); 
        const actor = backendIDL.createActor(environment.MOTOKO_CANISTER_BACKEND_ID, {
          agentOptions: ({
            host: host,
            callOptions: userObject,
          })          
        }); 
        await actor.setPOH();

        resolve([userObject.principal]);
      } catch (err) {
        reject(err);
      }
    });
  }
}
