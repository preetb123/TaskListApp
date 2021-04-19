import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}
export const APIProvider = ({ children }: Props) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
