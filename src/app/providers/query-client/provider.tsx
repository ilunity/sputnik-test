import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const withQueryClient = (Component: React.FC) => () => (
  <QueryClientProvider client={queryClient}>
    <Component />
  </QueryClientProvider>
);
