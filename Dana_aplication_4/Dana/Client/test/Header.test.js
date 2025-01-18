// Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../src/Header.jsx';  // Asegúrate de ajustar la ruta si es necesario

describe('Header', () => {
  test('debería renderizar la imagen con el src y alt correctos', () => {
    render(<Header />);

    // Verificamos que la imagen está en el documento con el src y alt esperados
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', 'https://elgeneracionalpost.com/wp-content/uploads/2024/10/LUTO.jpg');
    expect(imageElement).toHaveAttribute('alt', 'Lazo negro de la dana');
  });

  test('debería renderizar el título correctamente', () => {
    render(<Header />);

    // Verificamos que el título <h1> se renderiza correctamente
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('DANA');
  });
});
