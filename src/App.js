import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/layout.js";
import Country from "./components/Country.jsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App ">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header className="max-w-full">
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/:id" element={<Country />} />
            </Routes>
          </header>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
