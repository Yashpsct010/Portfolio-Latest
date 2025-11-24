import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Guestbook from './components/Guestbook';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import AdminDashboard from './components/AdminDashboard';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <About />
                    <Projects />
                    <Guestbook />
                    <Contact />
                  </>
                } />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
              <AIChat />
              <CustomCursor />
            </Layout>
          </Router>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
