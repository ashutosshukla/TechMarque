import React from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/FooterSection';


const App = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Home />
      <Footer />
    </div>
  );
};

export default App;