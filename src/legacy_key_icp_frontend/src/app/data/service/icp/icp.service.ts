import { Injectable, isDevMode } from "@angular/core";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { environment } from '../../../../environments/environment';
import { Balance } from "../../../domain/model/balance.model";
import { Asset } from "../../../domain/model/asset.model";
import { Account } from "../../../domain/model/account.model";
import { IcpRepository } from "../../../domain/repository/icp.respository";
import * as backendIDL from '../../../../../../declarations/legacy_key_icp_backend'
import { Actor } from "@dfinity/agent";

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
    });
  }

  getDataLegacyKeySC(address: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
    });
  }

  payLegacyKeySC(address: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const identity = await this.authClient?.getIdentity();
      //Principal.from(identity?.getPrincipal()).toText();
      const host = environment.MOTOKO_CANISTER_HOST;
      const actor = backendIDL.createActor(environment.MOTOKO_CANISTER_BACKEND_ID, {
        agentOptions: {
          host: host
        },
      });

      /* const defaultAgent = Actor.agentOf(actor);
      if(defaultAgent && identity) {
        defaultAgent.replaceIdentity!(identity);
      } */

      //console.log("legacyActor", actor);
      const whoami = await actor.whoami();
      console.log("whoami", whoami.toText());
    });
  }

  newMemberLegacyKeySC(address: string, amount: number, validators: any[], beneficiaries: any[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
    });
  }

  voteValidador(address: string, idLegacy: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
    });
  }

  withdrawHeir(address: string, idLegacy: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
    });
  }
}
