import "@testing-library/jest-dom";
module.exports = {
    // Configuración para las pruebas de Jest
    collectCoverage: true,
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: './coverage', // Directorio donde se guardarán los reportes
  };