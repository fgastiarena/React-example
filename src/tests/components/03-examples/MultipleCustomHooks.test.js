import React from 'react';
import { shallow } from 'enzyme';
import { MultipleCustomHooks } from "../../../components/03-examples/MultipleCustomHooks";
import { useFetch } from '../../../hooks/useFetch';
import { useCounter } from '../../../hooks/useCounter';

jest.mock('../../../hooks/useFetch');
jest.mock('../../../hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks/>', () => {

    beforeEach(() => {
        useCounter.mockReturnValue({
            counter: 10,
            increment: () => {}
        });
    });

    test('Debe mostrarse correctment', () => {

        useFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null
        });

        const wrapper = shallow( < MultipleCustomHooks / > );
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe mostrar la informacion', () => {

        useFetch.mockReturnValue({
            data: [{
                author: 'Fernanda',
                quote: 'Hola Mundo'
            }],
            loading: false,
            error: null
        });

        const wrapper = shallow( < MultipleCustomHooks / > );

        expect(wrapper.find('.alert').exists()).toBe(false);
        expect(wrapper.find('.mb-10').text().trim()).toBe('Hola Mundo');
        expect(wrapper.find('footer').text().trim()).toBe('Fernanda');


        console.log(wrapper.html());


    });

})