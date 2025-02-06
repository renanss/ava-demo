'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { TEXT } from '@/app/static';
export function RefreshButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.refresh()}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
    >
      <svg
        className="w-5 h-5"
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
      <span className="text-sm">{TEXT.REFRESH_DATA}</span>
    </button>
  );
} 