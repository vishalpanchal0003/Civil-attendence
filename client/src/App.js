import React from 'react';
import { Toaster } from "sonner";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-right" richColors />
      <Layout />
    </div>
  );
}

export default App;
