import { Injectable } from '@angular/core';
import { Web3Auth, WEB3AUTH_NETWORK, IProvider } from "@web3auth/modal";
import { ethers } from "ethers";
import { WalletRepository } from '../../../domain/repository/wallet.repository';

@Injectable({
  providedIn: 'root'
})
export class Web3AuthWalletService extends WalletRepository {
  private web3auth: Web3Auth;
  private clientId = "BLwPQ9p0H8cseCAoCFcBK5ENItPICJUALEbkNCDeYF4nB9VpltM02_z_VnHCdkkXavh0Ba9R5dk3w3D2K4TIKP8";

  constructor() {
    super();

    this.web3auth = new Web3Auth({
      clientId: this.clientId,
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    });
    this.init();
  }

  init = async () => {
    try {
      // IMP START - SDK Initialization
      await this.web3auth.init();
      // IMP END - SDK Initialization

      if (this.web3auth.connected) {
        //this.loggedIn = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  connect = (): Promise<string[]> => {
    return new Promise<string[]>(async (resolve, reject) => {
      try {
        const provider = await this.web3auth.connect();
        //this.setAccountAddress(accounts[0]);
        if (this.web3auth.connected && provider)
          resolve([await this.getAccounts(provider)]);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAccounts = async (provider: IProvider): Promise<any> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();
      return address;
    } catch (error) {
      return error;
    }
  }

  /* private setAccountAddress(accountAddress: string | null) {
    this._currentAccountAddress = accountAddress;
    this._accountAddress.next(accountAddress);
  }

  getAccountAddress() {
    return this._currentAccountAddress;
  } */
}
