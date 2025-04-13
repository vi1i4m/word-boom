import React from 'react';
import GameDemo from '@/app/components/GameDemo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tik Tak Bum! Game',
};

const GameDemoPage = () => {
  return (
    <GameDemo />
  )
}

export default GameDemoPage