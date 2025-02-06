import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { ethers } from 'ethers';
import fs from 'fs';
import { Operator, Wallet } from './types';

interface GrpcClient extends grpc.Client {
  GetKey: (
    request: { owner: string; expired_at: number; signature: string },
    callback: (error: Error | null, response: { key: string }) => void
  ) => void;
  ListWallets: (
    request: object,
    metadata: grpc.Metadata,
    callback: (error: Error | null, response: { items: Wallet[] }) => void
  ) => void;
}

interface ProtoDescriptor {
  ava: {
    protocol: {
      Aggregator: new (address: string, credentials: grpc.ChannelCredentials) => GrpcClient;
    };
  };
}

export class OperatorController {
  private client: GrpcClient;

  constructor() {
    const PROTO_PATH = path.resolve(process.cwd(), 'proto/avs.proto');
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoDescriptor;
    this.client = new proto.ava.protocol.Aggregator(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );
  }

  private async getAuthenticatedWallet(): Promise<ethers.HDNodeWallet | ethers.Wallet> {
    const keyPath = path.join(process.env.HOME || '', '.eigenlayer/operator_keys/test5.ecdsa.key.json');
    const keyData = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    return ethers.Wallet.fromEncryptedJson(
      JSON.stringify(keyData),
      process.env.OPERATOR_PRIVATE_KEY || ''
    );
  }

  private async getAuthKey(wallet: ethers.HDNodeWallet | ethers.Wallet): Promise<string> {
    const expiredAt = Math.floor(Date.now() / 1000 + 3600); // 1 hour from now
    const message = `key request for ${wallet.address} expired at ${expiredAt}`;
    const signature = await wallet.signMessage(message);

    return new Promise((resolve, reject) => {
      this.client.GetKey(
        {
          owner: wallet.address,
          expired_at: expiredAt,
          signature
        },
        (error: Error | null, response: { key: string }) => {
          if (error) reject(error);
          else resolve(response.key);
        }
      );
    });
  }

  private async getWallets(authKey: string): Promise<Wallet[]> {
    const metadata = new grpc.Metadata();
    metadata.add('authkey', authKey);

    return new Promise((resolve, reject) => {
      this.client.ListWallets(
        {},
        metadata,
        (error: Error | null, response: { items: Wallet[] }) => {
          if (error) reject(error);
          else resolve(response.items);
        }
      );
    });
  }

  public async getOperators(): Promise<Operator[]> {
    try {
      const wallet = await this.getAuthenticatedWallet();
      const authKey = await this.getAuthKey(wallet);
      const wallets = await this.getWallets(authKey);
      
      return wallets.map(wallet => ({
        operatorId: wallet.address,
        name: 'Operator ' + wallet.address.slice(0, 6),
        status: 'ACTIVE',
        stakingAmount: wallet.balance || '0',
        delegatedAmount: '0',
        totalAmount: wallet.balance || '0'
      }));
    } catch (error) {
      console.error('Failed to fetch operators:', error);
      throw new Error('Failed to fetch operator data from AVA Protocol');
    }
  }
} 