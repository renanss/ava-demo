import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { ethers } from 'ethers';
import fs from 'fs';
import { 
  OperatorDTO, 
  WalletDTO, 
  KeyRequestDTO, 
  KeyResponseDTO, 
  ListWalletsResponseDTO 
} from '../dtos/operator.dto';

interface AggregatorClient extends grpc.Client {
  GetKey: (
    request: KeyRequestDTO,
    callback: (error: Error | null, response: KeyResponseDTO) => void
  ) => void;
  ListWallets: (
    request: object,
    metadata: grpc.Metadata,
    callback: (error: Error | null, response: ListWalletsResponseDTO) => void
  ) => void;
}

interface ProtoDescriptor {
  ava: {
    protocol: {
      Aggregator: new (address: string, credentials: grpc.ChannelCredentials) => AggregatorClient;
    };
  };
}

export class OperatorController {
  private client: AggregatorClient;

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

  private async getAuthenticatedWallet(): Promise<ethers.Wallet> {
    const keyPath = path.join(process.env.HOME || '', '.eigenlayer/operator_keys/test5.ecdsa.key.json');
    const keyData = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    return ethers.Wallet.fromEncryptedJson(
      JSON.stringify(keyData),
      process.env.OPERATOR_PRIVATE_KEY || ''
    );
  }

  private async getAuthKey(wallet: ethers.Wallet): Promise<string> {
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
        (error: Error | null, response: KeyResponseDTO) => {
          if (error) reject(error);
          else resolve(response.key);
        }
      );
    });
  }

  private async getWallets(authKey: string): Promise<WalletDTO[]> {
    const metadata = new grpc.Metadata();
    metadata.add('authkey', authKey);

    return new Promise((resolve, reject) => {
      this.client.ListWallets(
        {},
        metadata,
        (error: Error | null, response: ListWalletsResponseDTO) => {
          if (error) reject(error);
          else resolve(response.items);
        }
      );
    });
  }

  private mapToOperatorDTO(wallet: WalletDTO): OperatorDTO {
    return {
      operatorId: wallet.address,
      name: 'Operator ' + wallet.address.slice(0, 6),
      status: 'ACTIVE',
      stakingAmount: wallet.balance || '0',
      delegatedAmount: '0',
      totalAmount: wallet.balance || '0'
    };
  }

  public async getOperators(): Promise<OperatorDTO[]> {
    try {
      const wallet = await this.getAuthenticatedWallet();
      const authKey = await this.getAuthKey(wallet);
      const wallets = await this.getWallets(authKey);
      return wallets.map(wallet => this.mapToOperatorDTO(wallet));
    } catch (error) {
      console.error('Failed to fetch operators:', error);
      throw new Error('Failed to fetch operator data from AVA Protocol');
    }
  }
} 