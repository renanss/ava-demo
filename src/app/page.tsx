'use client';

import React, { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface Operator {
  operatorId: string;
  name: string;
  status: string;
  stakingAmount: string;
  delegatedAmount: string;
  totalAmount: string;
}

export default function Home() {
  const [operators, setOperators] = useState<Operator[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOperators = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/avs-data');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch operator data');
      }
      const data = await response.json();
      setOperators(data);
    } catch (err) {
      console.error('Error fetching operator data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch operator data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0E14] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">
                AVA Protocol Operators
              </h1>
              <p className="text-gray-400 mt-1">
                View AVA Protocol operators on EigenLayer Holesky Testnet
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ConnectButton />
              <button
                onClick={fetchOperators}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-sm">Refresh Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Operator List */}
        {operators && operators.length > 0 && (
          <div className="mt-8 space-y-4">
            {operators.map((operator) => (
              <div
                key={operator.operatorId}
                className="bg-[#1A1E26] rounded-lg p-6"
              >
                <div className="flex flex-col space-y-4">
                  {/* Address and Status */}
                  <div>
                    <div className="text-sm text-gray-400 font-mono break-all">
                      Address: {operator.operatorId}
                    </div>
                  </div>

                  {/* Grid for Status, Staking, Delegated, Total */}
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Status</div>
                      <div className={`text-sm ${
                        operator.status === 'ACTIVE' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {operator.status}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">Staking Amount</div>
                      <div className="text-sm text-white">{operator.stakingAmount} ETH</div>
                      <div className="text-sm text-gray-400 mt-2">Delegated</div>
                      <div className="text-sm text-white">{operator.delegatedAmount} ETH</div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Total Amount</div>
                        <div className="text-sm text-white">{operator.totalAmount} ETH</div>
                      </div>
                      <a
                        href={`https://holesky.eigenlayer.xyz/operator/${operator.operatorId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 mt-2"
                      >
                        View on EigenLayer
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
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && !operators && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {operators && operators.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400">No operators found.</div>
          </div>
        )}
      </div>
    </main>
  );
} 