'use client';

import { ReactNode } from 'react';
import { ReduxProvider } from './ReduxProvider';
import { ReactQueryProvider } from './ReactQueryProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
