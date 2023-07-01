import { getBankAccount, BankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  const balanceMock = 5;
  let newBankAccount: BankAccount;

  beforeEach(() => {
    newBankAccount = getBankAccount(balanceMock);
  })

  test('should create account with initial balance', () => {
    expect(newBankAccount).toBeInstanceOf(BankAccount);
    expect(newBankAccount.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      newBankAccount.withdraw(7);
    }
    catch(e) {
      expect(e).toEqual(new InsufficientFundsError(balanceMock));
    }
  });

  test('should throw error when transferring more than balance', () => {
    let accountForTransfer = getBankAccount(8);
    try {
      newBankAccount.transfer(10, accountForTransfer);
    }
    catch(e) {
      expect(e).toEqual(new InsufficientFundsError(balanceMock));
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      newBankAccount.transfer(3, newBankAccount);
    }
    catch(e) {
      expect(e).toEqual(new TransferFailedError());
    }
  });

  test('should deposit money', () => {
    newBankAccount.deposit(10)
    expect(newBankAccount.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    newBankAccount.withdraw(2)
    expect(newBankAccount.getBalance()).toBe(3);
  });

  test('should transfer money', () => {
    let accountForTransfer = getBankAccount(8);
    newBankAccount.transfer(2, accountForTransfer)
    expect(newBankAccount.getBalance()).toBe(3);
    expect(accountForTransfer.getBalance()).toBe(10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    await expect(newBankAccount.fetchBalance()).resolves.toBeDefined();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(newBankAccount, 'fetchBalance').mockImplementation(() => Promise.resolve(50));
    await newBankAccount.synchronizeBalance();
    expect(newBankAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(newBankAccount, 'fetchBalance').mockImplementation(() => Promise.resolve(null));
    try {
      await newBankAccount.synchronizeBalance();
    }
    catch(e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
