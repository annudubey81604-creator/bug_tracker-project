// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Bugs from "./pages/Bugs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route -> Login */}
        <Route path="/" element={<Login />} />
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Bugs page */}
        <Route path="/bugs" element={<Bugs />} />
      </Routes>
    </BrowserRouter>
  );
}
