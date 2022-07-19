import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import Routes from "./routes";
import "./App.css";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default App;
