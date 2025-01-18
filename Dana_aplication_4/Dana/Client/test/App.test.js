import React from 'react'; // Agregar esto al inicio del archivo
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

test('debería renderizar los componentes correctamente', () => {
  render(<App />);
  
  expect(screen.getByText(/Bienvenido a la página de ayuda/i)).toBeInTheDocument(); // Verifica que el texto se renderiza
});
  