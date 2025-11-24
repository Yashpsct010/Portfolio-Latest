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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
