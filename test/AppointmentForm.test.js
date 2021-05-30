import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('AppointmentForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);

    const field = name => form('appointment').elements[name];

    const labelFor = element => container.querySelector(`label[for="${element}"]`)

    it('renders a form', () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    });

    const findOption = (dropDownNode, textContent) => {
        const options = Array.from(dropDownNode.childNodes);
        return options.find(option => option.textContent === textContent);
    }

    describe('service field', () => {
        it('renders as a select box', () => {
            render(<AppointmentForm />);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        });

        it('initially has a blank value chosen', () => {
            render(<AppointmentForm />);
            const firstNode = field('service').childNodes[0];
            expect(firstNode.value).toEqual('');
            expect(firstNode.selected).toBeTruthy();
        });

        it('lists all salon services', () => {
            const selectableServices = [
                'Cut',
                'Blow-dry'
            ];
            render(<AppointmentForm selectableServices={selectableServices} />);
            const optionNodes = Array.from(field('service').childNodes);
            const renderedServices = optionNodes.map(node => node.textContent);
            expect(renderedServices).toEqual(
                expect.arrayContaining(selectableServices)
            );

        });

        it('pre-selects the existing value', () => {
            const services = ['Cut', 'Blow-dry'];
            render(
                <AppointmentForm
                    selectableServices={services}
                    service="Blow-dry"
                />
            );
            const option = findOption(field('service'), 'Blow-dry');
            expect(option.selected).toBeTruthy();
        });

        it('renders a label for dropdown', () => {
            render(<AppointmentForm />);
            expect(labelFor('service').textContent).toEqual('Select Service');
        });

        it('matches label id with service field id', () => {
            render(<AppointmentForm />);
            expect(field('service').id).toEqual('service');
        });

        // it('saves existing value of dropdown when submitted', async () => {
        //     expect.hasAssertions();
        //     render(<AppointmentForm
        //         service="Cut"
        //         onSubmit={serviceState => expect(serviceState).toEqual("Cut")} />);

        //     await ReactTestUtils.Simulate.submit(form('appointment'));
        // });
    });
});