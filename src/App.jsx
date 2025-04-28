import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Feature from './components/Feature';


function App() {
  return (
    <>
    <Router>
      <div className='flex flex-col h-screen'>
        <Navbar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feature" element={<Feature />} />
          </Routes>
        
        <Footer />
      </div>
      </Router>
    </>
  )
}

export default App;
