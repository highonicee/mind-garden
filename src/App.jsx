import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Components/Layout.jsx";
import Garden from "./Pages/Garden.jsx";
import AddThoughts from "./Pages/AddThoughts.jsx";
import Analytics from "./Pages/Analytics.jsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Garden />} />
            <Route path="/addthought" element={<AddThoughts />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}