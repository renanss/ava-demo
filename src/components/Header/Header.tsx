'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { RefreshButton } from '../RefreshButton';
import { TEXT } from '@/app/static';

export function Header() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">
          {TEXT.TITLE}
        </h1>
        <p className="text-gray-400 mt-1">
          {TEXT.DESCRIPTION}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ConnectButton />
        <RefreshButton />
      </div>
    </div>
  );
} 