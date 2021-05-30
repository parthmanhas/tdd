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

    it('renders a submit button', () => {
        render(<CustomerForm />);
        const submitButton = container.querySelector(
            'input[type="submit"]'
        );
        expect(submitButton).not.toBeNull();
    });

    const itRendersAsaTextBox = (fieldName) =>
        it('renders the field as a text box', () => {
            render(<CustomerForm />);
            expectToBeInputFieldOfTypeText(field(fieldName));
        });

    const expectToBeInputFieldOfTypeText = (field) => {
        expect(field).not.toBeNull();
        expect(field.tagName).toEqual('INPUT');
        expect(field.type).toEqual('text');
    }

    const itIncludesTheExistingValue = (fieldName) =>
        it('includes the existing value for the field', () => {
            render(<CustomerForm {... { [fieldName]: 'value' }} />);
            expect(field(fieldName).value).toEqual('value');
        });

    const itRendersLabelForFirstNameField = (fieldName, value) =>
        it('renders a label for the field', () => {
            render(<CustomerForm />);
            expect(labelFor(fieldName).textContent).toEqual(value);
        });

    const itAssignIdThatMatchesLabelIdToFirstNameField = (fieldName) =>
        it('assigns an id that matches the label id to the field', () => {
            render(<CustomerForm />);
            expect(field(fieldName).id).toEqual(fieldName);
        });

    const itSubmitsExistingValue = (fieldName, value) =>
        it('saves existing value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    {...{ [fieldName]: value }}
                    onSubmit={props => expect(props[fieldName]).toEqual(value)
                    }
                />);
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

    const itSubmitsNewValue = (fieldName, value) =>
        it('saves new value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    {...{ [fieldName]: value }}
                    onSubmit={props => expect(props[fieldName]).toEqual(value)}
                />);

            await ReactTestUtils.Simulate.change(field(fieldName), {
                target: { value: value, name: fieldName }
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

    describe('first name field', () => {
        itRendersAsaTextBox('firstName');
        itIncludesTheExistingValue('firstName');
        itRendersLabelForFirstNameField('firstName', 'First Name');
        itAssignIdThatMatchesLabelIdToFirstNameField('firstName');
        itSubmitsExistingValue('firstName', 'firstName');
        itSubmitsNewValue('firstName', 'anotherFirstName');
    });

    describe('last name field', () => {
        itRendersAsaTextBox('lastName');
        itIncludesTheExistingValue('lastName');
        itRendersLabelForFirstNameField('lastName', 'Last Name');
        itAssignIdThatMatchesLabelIdToFirstNameField('lastName');
        itSubmitsExistingValue('lastName', 'lastName');
        itSubmitsNewValue('lastName', 'anotherLastName');
    });

    describe('phone name field', () => {
        itRendersAsaTextBox('phoneField');
        itIncludesTheExistingValue('phoneField');
        itRendersLabelForFirstNameField('phoneField', 'Phone Number');
        itAssignIdThatMatchesLabelIdToFirstNameField('phoneField');
        itSubmitsExistingValue('phoneField', '012345');
        itSubmitsNewValue('phoneField', '567890');
    });
})