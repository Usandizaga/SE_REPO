
import { validarFormulario } from 'C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Client/src/Donar.jsx';

describe('validarFormulario', () => {
  it('debería devolver errores si los campos están vacíos', () => {
    const datos = {
      nombre: '',
      email: '',
      tipoAyuda: '',
      descripcion: '',
      cantidad: '',
      ubicacion: '',
    };

    const errores = validarFormulario(datos);

    expect(errores).toEqual({
      nombre: 'El nombre es obligatorio.',
      email: 'El email es obligatorio.',
      tipoAyuda: 'Debes seleccionar un tipo de ayuda.',
      cantidad: 'La cantidad debe ser mayor a 0.',
      ubicacion: 'La ubicación es obligatoria.',
    });
  });

  it('debería devolver un error si el email no es válido', () => {
    const datos = {
      nombre: 'John Doe',
      email: 'emailinvalido',
      tipoAyuda: 'alimentos',
      descripcion: 'Ayuda con alimentos',
      cantidad: 5,
      ubicacion: 'Madrid',
    };

    const errores = validarFormulario(datos);

    expect(errores.email).toBe('El email no es válido.');
  });

  it('debería devolver un objeto vacío si todos los campos son válidos', () => {
    const datos = {
      nombre: 'John Doe',
      email: 'john@example.com',
      tipoAyuda: 'ropa',
      descripcion: 'Donación de ropa',
      cantidad: 10,
      ubicacion: 'Barcelona',
    };

    const errores = validarFormulario(datos);

    expect(errores).toEqual({});
  });
});