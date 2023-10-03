import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/layout.js";
import Country from "./components/Country.jsx";
import Plane from "./components/plane/Plane";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App ">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header className="max-w-full">
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/loading" element={ <Plane />} />
              <Route path="/:id" element={<Country />} />
            </Routes>
          </header>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
