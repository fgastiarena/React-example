import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";


describe('Pruebas en useForm', () => {

    const initialForm = {
        name: 'Fernanda',
        email: 'mf.gastiarena@gmail.com'
    }

    test('Debe regresar un formulario por defecto', () => {

        const { result } = renderHook(() => useForm(initialForm));
        const [formValues, handleinputchange, reset] = result.current;

        expect(formValues).toEqual(initialForm);
        expect(typeof handleinputchange).toBe('function');
        expect(typeof reset).toBe('function');

    });

    test('Debe cambiar el valor del formulario (cambiar name)', () => {

        const { result } = renderHook(() => useForm(initialForm));
        const [, handleinputchange] = result.current;

        act(() => {
            handleinputchange({
                target: {
                    name: 'name',
                    value: 'Melissa'
                }
            });
        });

        const [formValues] = result.current;
        expect(formValues).toEqual({...initialForm, name: 'Melissa' });

    });

    test('Debe re-establecer el formulario con RESET', () => {

        const { result } = renderHook(() => useForm(initialForm));
        const [, handleinputchange, reset] = result.current;

        act(() => {
            handleinputchange({
                target: {
                    name: 'name',
                    value: 'Melissa'
                }
            });

            reset();
        });

        const [formValues] = result.current;
        expect(formValues).toEqual(initialForm);

    })

})