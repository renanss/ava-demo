import { ethers } from 'ethers';
import { Wallet, KeyResponse, ListWalletsResponse } from './mock-data';

export class WalletService {
  private provider: ethers.JsonRpcProvider;
  private isTestMode: boolean;

  constructor(rpcUrl: string = 'https://ethereum-holesky.publicnode.com', isTestMode: boolean = false) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.isTestMode = isTestMode;
  }

  async verifySignature(address: string, message: string, signature: string): Promise<boolean> {
    try {
      const signerAddress = ethers.verifyMessage(message, signature);
      return signerAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }

  async getWalletBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return balance.toString();
    } catch (error) {
      console.error('Failed to get wallet balance:', error);
      return '0';
    }
  }

  async getWalletInfo(address: string): Promise<Wallet> {
    const balance = await this.getWalletBalance(address);
    return {
      address,
      balance
    };
  }

  async listWallets(addresses: string[]): Promise<ListWalletsResponse> {
    const wallets = await Promise.all(
      addresses.map(address => this.getWalletInfo(address))
    );
    return { items: wallets };
  }

  generateAuthKey(address: string): string {
    // In a real implementation, you would:
    // 1. Generate a secure random key
    // 2. Store it in a database with the address and expiration
    // 3. Set up periodic cleanup of expired keys
    const timestamp = Date.now();
    return ethers.keccak256(
      ethers.concat([
        ethers.toUtf8Bytes(address),
        ethers.toUtf8Bytes(timestamp.toString())
      ])
    );
  }
} 