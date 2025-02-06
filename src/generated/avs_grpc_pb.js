// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var avs_pb = require('./avs_pb.js');

function serialize_ava_protocol_KeyRequest(arg) {
  if (!(arg instanceof avs_pb.KeyRequest)) {
    throw new Error('Expected argument of type ava.protocol.KeyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ava_protocol_KeyRequest(buffer_arg) {
  return avs_pb.KeyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ava_protocol_KeyResponse(arg) {
  if (!(arg instanceof avs_pb.KeyResponse)) {
    throw new Error('Expected argument of type ava.protocol.KeyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ava_protocol_KeyResponse(buffer_arg) {
  return avs_pb.KeyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ava_protocol_ListWalletsRequest(arg) {
  if (!(arg instanceof avs_pb.ListWalletsRequest)) {
    throw new Error('Expected argument of type ava.protocol.ListWalletsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ava_protocol_ListWalletsRequest(buffer_arg) {
  return avs_pb.ListWalletsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ava_protocol_ListWalletsResponse(arg) {
  if (!(arg instanceof avs_pb.ListWalletsResponse)) {
    throw new Error('Expected argument of type ava.protocol.ListWalletsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ava_protocol_ListWalletsResponse(buffer_arg) {
  return avs_pb.ListWalletsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AggregatorService = exports.AggregatorService = {
  getKey: {
    path: '/ava.protocol.Aggregator/GetKey',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.KeyRequest,
    responseType: avs_pb.KeyResponse,
    requestSerialize: serialize_ava_protocol_KeyRequest,
    requestDeserialize: deserialize_ava_protocol_KeyRequest,
    responseSerialize: serialize_ava_protocol_KeyResponse,
    responseDeserialize: deserialize_ava_protocol_KeyResponse,
  },
  listWallets: {
    path: '/ava.protocol.Aggregator/ListWallets',
    requestStream: false,
    responseStream: false,
    requestType: avs_pb.ListWalletsRequest,
    responseType: avs_pb.ListWalletsResponse,
    requestSerialize: serialize_ava_protocol_ListWalletsRequest,
    requestDeserialize: deserialize_ava_protocol_ListWalletsRequest,
    responseSerialize: serialize_ava_protocol_ListWalletsResponse,
    responseDeserialize: deserialize_ava_protocol_ListWalletsResponse,
  },
};

exports.AggregatorClient = grpc.makeGenericClientConstructor(AggregatorService);
