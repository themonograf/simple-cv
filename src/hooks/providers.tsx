// import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      cacheTime: 0,
    },
  },
});

function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
