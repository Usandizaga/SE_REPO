import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Donar from './Donar';
import Comentarios from './Comentarios';

function App() {

  return (
    <>
     <Header />
     <Home/>
     <Donar />
     <Footer/>
     <Comentarios/>
  </>

  );
}

export default App
