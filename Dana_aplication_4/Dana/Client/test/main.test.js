
import React from 'react'; 
import { createRoot } from 'react-dom/client'; 
import { act } from 'react'; // Importamos act desde 'react' en lugar de 'react-dom/test-utils'
import { render, screen, waitFor } from '@testing-library/react'; // Asegúrate de importar waitFor de @testing-library/react
import App from 'C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Client/src/App.jsx'; // Asegúrate de importar correctamente el componente App


describe('Main', () => { 
  test('debe renderizar la aplicación correctamente', async () => {
    const div = document.createElement('div');
    
    // Usamos act correctamente aquí
    await act(async () => {
      createRoot(div).render(<App />);
    });

  });
});