'use client';

import React from 'react';
import { TEXT } from '@/app/static';
interface Operator {
  operatorId: string;
  name: string;
  status: string;
  stakingAmount: string;
  delegatedAmount: string;
  totalAmount: string;
}

interface OperatorCardProps {
  operator: Operator;
}

export function OperatorCard({ operator }: OperatorCardProps) {
  return (
    <div className="bg-[#1A1E26] rounded-lg p-6">
      <div className="flex flex-col space-y-4">
        <div>
          <div className="text-sm text-gray-400 font-mono break-all">
            {TEXT.ADDRESS}: {operator.operatorId}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-sm text-gray-400 mb-1">{TEXT.STATUS}</div>
            <div className={`text-sm ${
              operator.status === TEXT.OPERATOR_STATUS.ACTIVE ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {operator.status}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-1">{TEXT.STAKING_AMOUNT}</div>
            <div className="text-sm text-white">{operator.stakingAmount} ETH</div>
            <div className="text-sm text-gray-400 mt-2">{TEXT.DELEGATED_AMOUNT}</div>
            <div className="text-sm text-white">{operator.delegatedAmount} ETH</div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="text-sm text-gray-400 mb-1">{TEXT.TOTAL_AMOUNT}</div>
              <div className="text-sm text-white">{operator.totalAmount} ETH</div>
            </div>
            <a
              href={`https://holesky.eigenlayer.xyz/operator/${operator.operatorId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 mt-2"
            >
              {TEXT.VIEW_ON_EIGENLAYER}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 