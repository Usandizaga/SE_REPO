import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ¡IMPORTACIÓN CORRECTA!
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Donar from './Donar';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donar" element={<Donar />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
