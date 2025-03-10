import { Injectable, isDevMode } from "@angular/core";
import { environment } from '../../../../environments/environment';
import Web3 from 'web3';
import { Balance } from "../../../domain/model/balance.model";
import { Asset } from "../../../domain/model/asset.model";
import { Account } from "../../../domain/model/account.model";
import { EthereumRepository } from "../../../domain/repository/ethereum.respository";

const ABI1 = require("./abi/sc-legacy.json");
const ABI2 = require("./abi/usdt.json");
const SCLegacyKey = environment.SEPOLIA_LEGACY_KEY;
const SCusdt= environment.SEPOLIA_USDT;

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthereumService extends EthereumRepository {
  constructor(
  ) {
    super();
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
      
      window.web3 = new Web3(window.ethereum);
      window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
      try {
        const value = (await window.contract1.methods.pay(address).call()).pay;        
        console.log("Verificacion de pago terminada: ",value);
        resolve(value);
      } catch (e) {
        reject(e);
      }      
    });
  }

  isProofOfHumanity(address: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      
      window.web3 = new Web3(window.ethereum);
      window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
      try {        
        const value = (await window.contract1.methods.pay(address).call()).POH;        
        console.log("Verificacion de Humanidad terminada");
        resolve(value);
      } catch (e) {
        reject(e);
      }      
    });
  }

  proofOfHumanity(address: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {      
      window.web3 = new Web3(window.ethereum);      
      window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
      console.log(address);
      try {
        console.log(await window.contract1.methods.proofOFHumanity());
        await window.contract1.methods.proofOFHumanity().send({ from: address });
        console.log("Proof terminado");

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  getDataLegacyKeySC(address: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      resolve({//Ejemplo. Llenar con todos los datos enviados por el usuario
        amount: 0,
        validators: [],
        beneficiaries: []
      });
    });
  }

  payLegacyKeySC(address: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {

      const pay= await this.isPaidLegacyKeySC(address);
      console.log("Verificacion de pago terminada 2: ",pay);
      if(!pay){
        window.web3 = new Web3(window.ethereum);      
        window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
        window.contract2 = await new window.web3.eth.Contract(ABI2, SCusdt);

        try {
          const amount = await window.contract1.methods.amountPay().call();        
          await window.contract2.methods.approve(SCLegacyKey, BigInt(amount).toString()).send({ from: address});
          console.log("Approve terminado");
          await window.contract1.methods.payLegacy().send({ from: address });
          console.log("Pago terminado");

          resolve();
        } catch (e) {
          reject(e);
        }
      }else{
        console.log("Ya pago");
        resolve();
      }     
      
    });
  }  

  newMemberLegacyKeySC(address: string, amount: number, validators: any[], beneficiaries: any[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {

        if (isDevMode()) {
          console.log(address, amount);
          console.log(beneficiaries);
          console.log(validators);
        }

        window.web3 = new Web3(window.ethereum);
        window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
        window.contract2 = await new window.web3.eth.Contract(ABI2, SCusdt);
        const amountf = BigInt(amount) * BigInt(10) ** BigInt(await window.contract2.methods.decimals().call());
        await window.contract2.methods.approve(SCLegacyKey, amountf).send({ from: address});
        console.log("Approve terminado");

        await window.contract1.methods.newMember(beneficiaries, validators, amount, 12).send({ from: address});

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  voteValidador(address: string, idLegacy: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        window.web3 = await new Web3(window.ethereum);
        window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
        //const idLegacy = this.id.idVote;
        await window.contract1.methods.voteValidador(idLegacy).send({ from: address });

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  withdrawHeir(address: string, idLegacy: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        window.web3 = await new Web3(window.ethereum);
        window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);

        //const idLegacy = this.heir.idWithdraw;
        //console.log(idLegacy);
        await window.contract1.methods.withdrawHeir(idLegacy).send({ from: address});

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
