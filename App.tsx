import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Presupuesto from './components/Presupuesto';
import LandingPage from './components/LandingPage';
// import Chatbot from './components/Chatbot';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      {/* <Chatbot /> */}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-950 font-sans text-white scroll-smooth selection:bg-brand-500 selection:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presentacion" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/presupuesto/login" element={<Login />} />
            <Route
              path="/presupuesto"
              element={
                <ProtectedRoute>
                  <Presupuesto />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
