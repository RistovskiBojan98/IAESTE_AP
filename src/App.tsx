import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/Layout";
import Country from "./components/Country";
import Plane from "./components/plane/Plane";
import SRWeekends from "./components/sr-weekends/sr-weekends";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App ">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header className="max-w-full">
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/loading" element={ <Plane country="" />} />
              <Route path="/:id" element={<Country />} />
              <Route path="/sr-weekends" element={ <SRWeekends />} />
            </Routes>
          </header>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
