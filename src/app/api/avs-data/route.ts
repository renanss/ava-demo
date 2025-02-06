import { NextResponse } from 'next/server';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

interface Operator {
  operatorId: string;
  name: string;
  status: string;
  stakingAmount: string;
  delegatedAmount: string;
  totalAmount: string;
}

interface Wallet {
  address: string;
  balance?: string;
}

interface AggregatorClient extends grpc.Client {
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
      Aggregator: new (address: string, credentials: grpc.ChannelCredentials) => AggregatorClient;
    };
  };
}

export async function GET() {
  try {
    // Load the proto file
    const PROTO_PATH = path.resolve(process.cwd(), 'proto/avs.proto');
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoDescriptor;
    const client = new proto.ava.protocol.Aggregator(
      'localhost:50051',  // Local gRPC server endpoint
      grpc.credentials.createInsecure()
    );

    try {
      // For testing, we'll use a demo signature
      const walletAddress = process.env.AVA_WALLET_ADDRESS || '0x0';
      const expiredAt = Math.floor(Date.now() / 1000 + 3600); // 1 hour from now
      const message = `key request for ${walletAddress} expired at ${expiredAt}`;
      const demoSignature = '0x1234567890'; // This will work in mock mode

      // Authenticate with signature
      const authResponse = await new Promise((resolve, reject) => {
        client.GetKey(
          {
            owner: walletAddress,
            expired_at: expiredAt,
            signature: demoSignature
          },
          (error: Error | null, response: { key: string }) => {
            if (error) reject(error);
            else resolve({ authKey: response.key });
          }
        );
      });

      // Get the list of wallets (operators)
      const metadata = new grpc.Metadata();
      metadata.add('authkey', (authResponse as { authKey: string }).authKey);

      const wallets = await new Promise<Wallet[]>((resolve, reject) => {
        client.ListWallets(
          {},
          metadata,
          (error: Error | null, response: { items: Wallet[] }) => {
            if (error) reject(error);
            else resolve(response.items);
          }
        );
      });

      // Transform the data to match our interface
      const operators: Operator[] = wallets.map(wallet => ({
        operatorId: wallet.address,
        name: 'Operator ' + wallet.address.slice(0, 6),
        status: 'ACTIVE',
        stakingAmount: wallet.balance || '0',
        delegatedAmount: '0',
        totalAmount: wallet.balance || '0'
      }));

      return NextResponse.json(operators);
    } catch (apiError) {
      console.error('API error:', apiError);
      return NextResponse.json(
        { error: 'Failed to fetch operator data from AVA Protocol' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error initializing AVA client:', error);
    return NextResponse.json(
      { error: 'Failed to initialize AVA Protocol connection' },
      { status: 500 }
    );
  }
} 