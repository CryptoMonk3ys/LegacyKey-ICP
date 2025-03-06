import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { Blockchain } from "../type/blockchain.type";
import { Balance } from "../model/balance.model";
import { EthereumRepository } from "../repository/ethereum.respository";
import { IcpRepository } from "../repository/icp.respository";

@Injectable({
  providedIn: 'root'
})
export class PayServiceUseCase implements UseCase<PayServiceParams, void> {
  constructor(
    private icpRepository: IcpRepository,
    private ethRepository: EthereumRepository,
  ) {

  }

  async execute(params: PayServiceParams): Promise<void> {
    //Podemos hacer que para generar el smart contract  de herencia se haga el pago inicial y luego se actualiza con la info de herencia?
    //De esa forma nos aseguramos que para que activar el contrato ya hice la transferencia a nuestra cuenta

    switch (params.walletChain) {
      case "ethereum":
        //return this.ethRepository.pay(params.walletAddress, params.asset, params.amount);
        return this.ethRepository.payLegacyKeySC(params.walletAddress);
      case "icp":
        return this.icpRepository.payLegacyKeySC(params.walletAddress);
    }
    return Promise.resolve();
  }
}

export type PayServiceParams = {
  walletChain: Blockchain,
  walletAddress: string,
  asset: string,
  amount: number
};

