import React, { Suspense } from 'react';
import { OperatorCard } from '@/components/OperatorCard';
import { Header } from '@/components/Header';
import { TEXT } from './static';
interface Operator {
  operatorId: string;
  name: string;
  status: string;
  stakingAmount: string;
  delegatedAmount: string;
  totalAmount: string;
}

async function getOperators(): Promise<Operator[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/avs-data`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch operator data');
  }
  
  return response.json();
}

export default async function Home() {
  const operators = await getOperators();

  return (
    <main className="min-h-screen bg-[#0B0E14] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <Suspense>
            <Header />
          </Suspense>
        </div>
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        }>
          {operators && operators.length > 0 ? (
            <div className="mt-8 space-y-4">
              {operators.map((operator) => (
                <OperatorCard key={operator.operatorId} operator={operator} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-gray-400">{TEXT.NO_OPERATORS_FOUND}</div>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
} 