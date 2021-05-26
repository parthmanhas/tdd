import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('CustomerForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);

    const field = name => form('customer').elements[name];

    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

    it('renders a customer form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    const itRendersAsaTextBox = (fieldName) =>
        it('renders the first name field as a text box', () => {
            render(<CustomerForm />);
            expectToBeInputFieldOfTypeText(field(fieldName));
        });

    const expectToBeInputFieldOfTypeText = (field) => {
        expect(field).not.toBeNull();
        expect(field.tagName).toEqual('INPUT');
        expect(field.type).toEqual('text');
    }

    const itIncludesTheExistingValue = (fieldName) =>
        it('includes the existing value for the first name', () => {
            render(<CustomerForm {... { [fieldName]: 'value' }} />);
            expect(field(fieldName).value).toEqual('value');
        });

    describe('first name field', () => {

        itRendersAsaTextBox('firstName');
        itIncludesTheExistingValue('firstName');



        it('renders a label for the first name field', () => {
            render(<CustomerForm />);
            expect(labelFor('firstName').textContent).toEqual('First Name');
        });

        it('assigns an id that matches the label id to the first name field', () => {
            render(<CustomerForm />);
            expect(field('firstName').id).toEqual('firstName');
        });

        it('saves existing first name when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    firstName="Ashley"
                    onSubmit={({ firstName }) => expect(firstName).toEqual('Ashley')
                    }
                />);
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

        it('saves new first name when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    firstName="Ashley"
                    onSubmit={({ firstName }) => expect(firstName).toEqual('Jamie')}
                />);

            await ReactTestUtils.Simulate.change(field('firstName'), {
                target: { value: 'Jamie' }
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    });


})