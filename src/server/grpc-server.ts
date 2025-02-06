/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { mockWallets, mockAuthKey } = require('./mock-data');
const { WalletService } = require('./wallet-service');

const PROTO_PATH = path.resolve(process.cwd(), 'proto/avs.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Configuration
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';
const RPC_URL = process.env.ETHEREUM_RPC_URL || 'https://ethereum-holesky.publicnode.com';

// Initialize services
const walletService = new WalletService(RPC_URL, USE_MOCK_DATA);

// List of registered wallet addresses (in a real implementation, this would come from a database)
const registeredAddresses = [
  process.env.OPERATOR_ADDRESS || '0xafB4FfF454A87e576b149CEB22fd532599BB4467', // Our operator address
];

async function getKey(call: any, callback: any) {
  const { owner } = call.request;
  
  // In mock mode, immediately return mock key without verification
  if (USE_MOCK_DATA) {
    console.log('Using mock data - returning mock auth key');
    callback(null, { key: mockAuthKey });
    return;
  }

  try {
    const { expired_at, signature } = call.request;
    // Verify the signature
    const message = `key request for ${owner} expired at ${expired_at}`;
    const isValid = await walletService.verifySignature(owner, message, signature);
    
    if (!isValid) {
      callback({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid signature'
      });
      return;
    }

    // Generate auth key
    const key = walletService.generateAuthKey(owner);
    callback(null, { key });
  } catch (error) {
    console.error('Authentication error:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Failed to process authentication'
    });
  }
}

async function listWallets(call: any, callback: any) {
  if (USE_MOCK_DATA) {
    callback(null, { items: mockWallets });
    return;
  }

  try {
    const response = await walletService.listWallets(registeredAddresses);
    callback(null, response);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: 'Failed to fetch wallet data'
    });
  }
}

function main() {
  const proto = grpc.loadPackageDefinition(packageDefinition);
  const server = new grpc.Server();
  
  server.addService(proto.ava.protocol.Aggregator.service, {
    GetKey: getKey,
    ListWallets: listWallets
  });

  server.bindAsync(
    'localhost:50051',
    grpc.ServerCredentials.createInsecure(),
    (error: Error | null, port: number) => {
      if (error) {
        console.error('Failed to start gRPC server:', error);
        return;
      }
      console.log(`gRPC server running at localhost:${port}`);
      console.log(`Mode: ${USE_MOCK_DATA ? 'Mock Data' : 'Real Data'}`);
      server.start();
    }
  );
}

main(); 