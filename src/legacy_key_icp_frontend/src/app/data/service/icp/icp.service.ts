import { Injectable, isDevMode } from "@angular/core";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { environment } from '../../../../environments/environment';
import { Balance } from "../../../domain/model/balance.model";
import { Asset } from "../../../domain/model/asset.model";
import { Account } from "../../../domain/model/account.model";
import { IcpRepository } from "../../../domain/repository/icp.respository";
import * as backendIDL from '../../../../../../declarations/legacy_key_icp_backend';
import { Actor } from "@dfinity/agent";
import { /* PlugLogin, StoicLogin,  */NFIDLogin } from 'ic-auth';
import { Validators } from "@angular/forms";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class IcpService extends IcpRepository {
  authClient?: AuthClient;

  constructor() {
    super();
    AuthClient.create().then(async (authClient) => {
      this.authClient = authClient;
    });
  }

  getBalance(account: string): Promise<Balance[]> {
    return new Promise<Balance[]>((resolve, reject) => {
    });
  }

  getAssetByID(index: number): Promise<Asset> {
    return new Promise<Asset>((resolve, reject) => {
    });
  }

  createAccount(): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
    });
  }

  isPaidLegacyKeySC(address: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
    });
  }

  isProofOfHumanity(address: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
    });
  }

  proofOfHumanity(address: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const host = environment.MOTOKO_CANISTER_HOST;
      const userObject = await NFIDLogin(); 
      const actor = backendIDL.createActor(environment.MOTOKO_CANISTER_BACKEND_ID, {
        agentOptions: ({
          host: host,
          callOptions: userObject,
        })          
      }); 
      await actor.setPOH();
    });
  }

  getDataLegacyKeySC(address: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
    });
  }

  payLegacyKeySC(address: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const host = environment.MOTOKO_CANISTER_HOST;
      const userObject = await NFIDLogin(); 
      const actor = backendIDL.createActor(environment.MOTOKO_CANISTER_BACKEND_ID, {
        agentOptions: ({
          host: host,
          callOptions: userObject,
        })          
      }); 
      await actor.setPay();
            
    });
  }

  newMemberLegacyKeySC(address: string, amount: number, validators: any[], beneficiaries: any[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const host = environment.MOTOKO_CANISTER_HOST;
      const userObject = await NFIDLogin(); 
      const actor = backendIDL.createActor(environment.MOTOKO_CANISTER_BACKEND_ID, {
        agentOptions: ({
          host: host,
          callOptions: userObject,
        })          
      }); 
      await actor.newMember(beneficiaries[0],validators[0],BigInt(amount),BigInt(10),BigInt(3));
    });
  }

  voteValidador(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const host = environment.MOTOKO_CANISTER_HOST;
      const userObject = await NFIDLogin(); 
      const actor = backendIDL.createActor(environment.MOTOKO_CANISTER_BACKEND_ID, {
        agentOptions: ({
          host: host,
          callOptions: userObject,
        })          
      }); 
      await actor.voteValidador();
    });
  }

  withdrawHeir(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const host = environment.MOTOKO_CANISTER_HOST;
      const userObject = await NFIDLogin(); 
      const actor = backendIDL.createActor(environment.MOTOKO_CANISTER_BACKEND_ID, {
        agentOptions: ({
          host: host,
          callOptions: userObject,
        })          
      }); 
      await actor.withDrawHeir();

    });
  }
}
