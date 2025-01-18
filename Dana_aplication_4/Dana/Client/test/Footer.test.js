// Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from 'C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Client/src/Footer.jsx';  // Asegúrate de ajustar la ruta si es necesario

describe('Footer', () => {
  test('debería mostrar el texto de derechos reservados', () => {
    render(<Footer />);

    // Verificamos que el texto esperado esté en el footer
    const footerText = screen.getByText(/Ayuda a Zonas Afectadas. Todos los derechos reservados./i);
    expect(footerText).toBeInTheDocument();
  });
});
