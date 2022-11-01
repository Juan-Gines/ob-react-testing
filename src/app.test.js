import { fireEvent, render } from '@testing-library/react';
import App from './App';
import InputNuevaNota from './components/InputNuevaNota';
import ListadoNotas from './components/ListadoNotas';

describe('REACT - Testeamos los componentes', () => {
	test('El listado se renderiza correctamente', () => {
		const view = render(<ListadoNotas />);
		expect(view).toBeDefined();
	});
	test('El listado renderiza una lista correctamente', () => {
		const notas = ['bajar la basura', 'bajar al perro'];
		const view = render(<ListadoNotas notas={notas} />);
		expect(view).toBeDefined();
	});
	test('El listado renderiza solo las notas que debe renderizar', () => {
		const notas = ['bajar la basura', 'bajar al perro'];
		const view = render(<ListadoNotas notas={notas} />);
		const div = view.getByLabelText('listado-notas');
		expect(div.childElementCount).toBe(2);
	});
});

describe('REACT - Hacemos un test de integración', () => {
	test('Renderizamos la app', () => {
		const view = render(<App />);
		expect(view).toBeDefined();
	});
	test('Se renderiza correctamente el input', () => {
		const placeholdertext = 'Introduce una nueva nota';
		const view = render(<App />);
		const input = view.getByPlaceholderText(placeholdertext);
		expect(input).toBeDefined();
	});
	test('Cuando hacemos click en el botón añadir, se lanza el evento', () => {
		const funcionMock = jest.fn();
		const view = render(<InputNuevaNota addNuevaNota={funcionMock} />);
		const button = view.getByText('Añadir');
		fireEvent.click(button);
		expect(funcionMock).toHaveBeenCalledTimes(1);
	});
	test('Añadimos una nueva nota', () => {
		const placeholdertext = 'Introduce una nueva nota';
		const view = render(<App />);
		const input = view.getByPlaceholderText(placeholdertext);
		const button = view.getByText('Añadir');
		const div = view.getByLabelText('listado-notas');
		const hijosInicial = div.childElementCount;
		fireEvent.change(input, { target: { value: 'Echar gasolina' } });
		fireEvent.click(button);
		const hijosFinal = div.childElementCount;
		expect(hijosFinal).toBeGreaterThan(hijosInicial);
		expect(hijosInicial).toBeLessThan(hijosFinal);
		expect(hijosInicial).not.toBe(hijosFinal);
	});
});
