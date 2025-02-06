export interface Wallet {
  address: string;
  balance: string;
}

export interface KeyResponse {
  key: string;
}

export interface ListWalletsResponse {
  items: Wallet[];
}

export const mockWallets: Wallet[] = [
  {
    address: '0x1234567890123456789012345678901234567890',
    balance: '100000000000000000000' // 100 ETH
  },
  {
    address: '0x0987654321098765432109876543210987654321',
    balance: '200000000000000000000' // 200 ETH
  }
];

export const mockAuthKey = 'mock-auth-key-123'; 