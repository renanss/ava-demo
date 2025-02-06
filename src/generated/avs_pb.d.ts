// package: ava.protocol
// file: avs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class KeyRequest extends jspb.Message { 
    getOwner(): string;
    setOwner(value: string): KeyRequest;
    getExpiredAt(): number;
    setExpiredAt(value: number): KeyRequest;
    getSignature(): string;
    setSignature(value: string): KeyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: KeyRequest): KeyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyRequest;
    static deserializeBinaryFromReader(message: KeyRequest, reader: jspb.BinaryReader): KeyRequest;
}

export namespace KeyRequest {
    export type AsObject = {
        owner: string,
        expiredAt: number,
        signature: string,
    }
}

export class KeyResponse extends jspb.Message { 
    getKey(): string;
    setKey(value: string): KeyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: KeyResponse): KeyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyResponse;
    static deserializeBinaryFromReader(message: KeyResponse, reader: jspb.BinaryReader): KeyResponse;
}

export namespace KeyResponse {
    export type AsObject = {
        key: string,
    }
}

export class ListWalletsRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListWalletsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListWalletsRequest): ListWalletsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListWalletsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListWalletsRequest;
    static deserializeBinaryFromReader(message: ListWalletsRequest, reader: jspb.BinaryReader): ListWalletsRequest;
}

export namespace ListWalletsRequest {
    export type AsObject = {
    }
}

export class ListWalletsResponse extends jspb.Message { 
    clearItemsList(): void;
    getItemsList(): Array<Wallet>;
    setItemsList(value: Array<Wallet>): ListWalletsResponse;
    addItems(value?: Wallet, index?: number): Wallet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListWalletsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListWalletsResponse): ListWalletsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListWalletsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListWalletsResponse;
    static deserializeBinaryFromReader(message: ListWalletsResponse, reader: jspb.BinaryReader): ListWalletsResponse;
}

export namespace ListWalletsResponse {
    export type AsObject = {
        itemsList: Array<Wallet.AsObject>,
    }
}

export class Wallet extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): Wallet;
    getBalance(): string;
    setBalance(value: string): Wallet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Wallet.AsObject;
    static toObject(includeInstance: boolean, msg: Wallet): Wallet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Wallet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Wallet;
    static deserializeBinaryFromReader(message: Wallet, reader: jspb.BinaryReader): Wallet;
}

export namespace Wallet {
    export type AsObject = {
        address: string,
        balance: string,
    }
}
