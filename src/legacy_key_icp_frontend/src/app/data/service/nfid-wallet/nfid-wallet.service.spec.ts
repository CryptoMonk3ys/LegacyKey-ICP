import { TestBed } from '@angular/core/testing';

import { NfidWalletService } from './nfid-wallet.service';

describe('NfidWalletService', () => {
  let service: NfidWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NfidWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
