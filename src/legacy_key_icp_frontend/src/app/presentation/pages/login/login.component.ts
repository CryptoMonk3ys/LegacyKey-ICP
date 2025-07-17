import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginWeb3UseCase } from '../../../domain/usecase/login-web3.use-case';
import { IsPaidLegacyUseCase } from '../../../domain/usecase/is-paid-legacy.use-case';
//import {isPaidLegacyKeySC} from '../../../data/service/ethereum/ethereum.service';
import { Blockchain } from '../../../domain/type/blockchain.type';
import { environment } from '../../../../environments/environment';
//declare let window: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginWeb3UseCase: LoginWeb3UseCase,
    private isPaidLegacyUseCase: IsPaidLegacyUseCase,
  ) {
  }

  ngOnInit(): void {
  }

  onMetamaskConnect() {
    this.loginWeb3UseCase
      .execute("web3auth")
      .then((accounts) => {
        //console.log(accounts);
        //this.goToNext("ethereum", accounts[0]);
        this.router.navigate(['menu'])
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
  }

  onIcAuthConnect = async () => {
    this.loginWeb3UseCase
      .execute("NFID")
      .then((accounts) => {
        //console.log(accounts);
        //this.goToNext("ethereum", accounts[0]);
        this.router.navigate(['menu'])
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
      });

  }

  goToNext(walletChain: Blockchain, account: string) {
    console.log(walletChain, account);
    this.isPaidLegacyUseCase.execute({
      walletChain,
      walletAddress: account
    }).then(isPaid => {
      console.log(isPaid);
      if (isPaid) {
        console.log("isPaid");
        this.router.navigate(['contract'])
      } else {
        this.router.navigate(['payment'])
      }
    }).catch(e => console.error(e));
  }

  /* getAccounts = async (provider: IProvider): Promise<any> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = signer.getAddress();

      return await address;
    } catch (error) {
      return error;
    }
  }

  getChainId = async (provider: IProvider): Promise<any> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.name;
    } catch (error) {
      return error;
    }
  } */
}
