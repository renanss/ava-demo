// package: ava.protocol
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as avs_pb from "./avs_pb";

interface IAggregatorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getKey: IAggregatorService_IGetKey;
    listWallets: IAggregatorService_IListWallets;
}

interface IAggregatorService_IGetKey extends grpc.MethodDefinition<avs_pb.KeyRequest, avs_pb.KeyResponse> {
    path: "/ava.protocol.Aggregator/GetKey";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.KeyRequest>;
    requestDeserialize: grpc.deserialize<avs_pb.KeyRequest>;
    responseSerialize: grpc.serialize<avs_pb.KeyResponse>;
    responseDeserialize: grpc.deserialize<avs_pb.KeyResponse>;
}
interface IAggregatorService_IListWallets extends grpc.MethodDefinition<avs_pb.ListWalletsRequest, avs_pb.ListWalletsResponse> {
    path: "/ava.protocol.Aggregator/ListWallets";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<avs_pb.ListWalletsRequest>;
    requestDeserialize: grpc.deserialize<avs_pb.ListWalletsRequest>;
    responseSerialize: grpc.serialize<avs_pb.ListWalletsResponse>;
    responseDeserialize: grpc.deserialize<avs_pb.ListWalletsResponse>;
}

export const AggregatorService: IAggregatorService;

export interface IAggregatorServer {
    getKey: grpc.handleUnaryCall<avs_pb.KeyRequest, avs_pb.KeyResponse>;
    listWallets: grpc.handleUnaryCall<avs_pb.ListWalletsRequest, avs_pb.ListWalletsResponse>;
}

export interface IAggregatorClient {
    getKey(request: avs_pb.KeyRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResponse) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.KeyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResponse) => void): grpc.ClientUnaryCall;
    getKey(request: avs_pb.KeyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResponse) => void): grpc.ClientUnaryCall;
    listWallets(request: avs_pb.ListWalletsRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletsResponse) => void): grpc.ClientUnaryCall;
    listWallets(request: avs_pb.ListWalletsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletsResponse) => void): grpc.ClientUnaryCall;
    listWallets(request: avs_pb.ListWalletsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletsResponse) => void): grpc.ClientUnaryCall;
}

export class AggregatorClient extends grpc.Client implements IAggregatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getKey(request: avs_pb.KeyRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResponse) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.KeyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResponse) => void): grpc.ClientUnaryCall;
    public getKey(request: avs_pb.KeyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.KeyResponse) => void): grpc.ClientUnaryCall;
    public listWallets(request: avs_pb.ListWalletsRequest, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletsResponse) => void): grpc.ClientUnaryCall;
    public listWallets(request: avs_pb.ListWalletsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletsResponse) => void): grpc.ClientUnaryCall;
    public listWallets(request: avs_pb.ListWalletsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: avs_pb.ListWalletsResponse) => void): grpc.ClientUnaryCall;
}
