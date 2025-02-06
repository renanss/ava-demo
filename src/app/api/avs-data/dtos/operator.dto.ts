export interface OperatorDTO {
  operatorId: string;
  name: string;
  status: string;
  stakingAmount: string;
  delegatedAmount: string;
  totalAmount: string;
}

export interface WalletDTO {
  address: string;
  balance?: string;
}

export interface KeyRequestDTO {
  owner: string;
  expired_at: number;
  signature: string;
}

export interface KeyResponseDTO {
  key: string;
}

export interface ListWalletsResponseDTO {
  items: WalletDTO[];
} 