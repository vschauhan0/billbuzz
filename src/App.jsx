import React from "react";
import "./App.css";
import { AuthProvider } from "./components/contexts/AuthContext";
import { SidebarProvider } from "./components/contexts/SidebarContext";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import CompanyDetails from "./components/CompanyDetails";
import Inventory from "./components/Inventory";


function App() {
  return (
    <>
      <SidebarProvider>
        <AuthProvider>
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/companyDetails" element={<CompanyDetails />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </AuthProvider>
      </SidebarProvider>
    </>
  );
}

export default App;
