import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayServiceUseCase } from '../../../domain/usecase/pay-service.use-case';
import { Blockchain } from '../../../domain/type/blockchain.type';
import { GetAccountUseCase } from '../../../domain/usecase/get-account.use-case';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderDialog } from '../../components/dialogs/loader/loader.dialog';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    standalone: false
})
export class PaymentComponent implements OnInit {
  walletChain: Blockchain = "icp";
  wallterAddress: string | null = null;
  asset = "usdt";
  amount = 100;
  errorMessage: string | null = null;
  dialogRef?: MatDialogRef<LoaderDialog>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private getAccountUseCase: GetAccountUseCase,
    private payServiceUseCase: PayServiceUseCase
  ) {
  }

  ngOnInit(): void {
    this.getAccountUseCase.execute()
      .then(acc => {
        this.wallterAddress = acc.address;
      });
  }

  async pago() {
    this.goToNext();
    /*
    const pago=await pagar();
    await this.config();

    if (pago){
      this.goToNext();
    } */

  }

  async onPay() {
    if (this.wallterAddress == null) {
      return;
    }

    //await this.pago();
    this.showLoader();

    this.payServiceUseCase.execute({
      walletChain: this.walletChain,
      walletAddress: this.wallterAddress,
      asset: this.asset,
      amount: this.amount
    }).then(() => {
      this.onSuccessPayment();
    }).catch(e => {
      console.log(e);
      this.errorMessage = e.message;
    }).finally(() => {
      this.dialogRef?.close();
    });
  }

  onSuccessPayment() {
    this.showPopup(
      "Payment successful",
      "Your payment has been successfully generated! Now let's confirm your inheritance information.",
      "Continue",
      "success"
    );
  }

  showPopup(title: string, description: string, button: string, icon?: string) {
    const success = confirm(title + "\n" + description);
    if (success) {
      this.goToNext();
    }
  }

  goToNext() {
    this.router.navigate(['contract'])
      .catch();
  }

  showLoader() {
    this.dialogRef = this.dialog.open(LoaderDialog, {
      disableClose: true
    });
  }
}
