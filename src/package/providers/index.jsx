import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OddFormatProvider from './OddFormatProvider/OddFormatProvider';

const queryClient = new QueryClient();

const SportsbookProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OddFormatProvider>{children}</OddFormatProvider>
    </QueryClientProvider>
  );
};

export default SportsbookProvider;
