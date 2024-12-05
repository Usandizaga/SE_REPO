import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Donar from './Donar';
function App() {

  return (
    <>
     <Header />
     <Home />
     <Footer/>
  </>

  );
}

export default App
