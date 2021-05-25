import React from 'react';
import ReactDOM from 'react-dom';
import { Appointment, AppointmentsDayView } from '../src/AppointmentsDayView';
import ReactTestUtils from 'react-dom/test-utils';

describe('Appointment', () => {

    let container;
    let customer;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => ReactDOM.render(component, container);

    it('should render a html table', () => {
        render(<Appointment customer={{}}/>);
        expect(container.querySelector('table')).not.toBeNull();
    });

    it('should render First Name as heading in table', () => {
        render(<Appointment customer={{}} />);
        expect(container.querySelector('table > tr > th').textContent).toMatch('First Name');
    });

    it('renders the customer first name', () => {
        customer = { firstName: 'Ashley' };
        render(<Appointment customer={customer} />);
        expect(container.querySelector('table > tr > td').textContent).toMatch(('Ashley'));
    });

    it('renders another customer first name', () => {
        customer = { firstName: 'Jordan' };
        render(<Appointment customer={customer} />);
        expect(container.querySelector('table > tr > td').textContent).toMatch(('Jordan'));
    });

    it('should render Last Name as heading', () => {
        render(<Appointment customer={{}} />);
        expect(container.querySelectorAll('table > tr > th')[1].textContent).toMatch('Last Name');
    })

    it('renders the customer second name', () => {
        customer = {firstName: 'Ashley', lastName: 'Jordan'};
        render(<Appointment customer={customer} />);
        expect(container.querySelectorAll('table > tr > td')[1].textContent).toMatch('Jordan');
    });

    it('should render a telephone name heading', () => {
        render(<Appointment customer={{}} />);
        expect(container.querySelectorAll('table > tr > th')[2].textContent).toMatch('Telephone');
    });

    it('should render a customer telephone number', () => {
        render(<Appointment customer={{telephone: '9419194191'}} />);
        expect(container.querySelectorAll('table > tr > td')[2].textContent).toMatch('9419194191');
    });

    it('should render a stylist heading', () => {
        render(<Appointment customer={{}} />);
        expect(container.querySelectorAll('table > tr > th')[3].textContent).toMatch('Stylist');
    });

    it('should render a customer stylist', () => {
        render(<Appointment customer={{stylist: 'Jane'}} />);
        expect(container.querySelectorAll('table > tr > td')[3].textContent).toMatch('Jane');
    });

    it('should render a service heading', () => {
        render(<Appointment customer={{}} />);
        expect(container.querySelectorAll('table > tr > th')[4].textContent).toMatch('Service');
    });

    it('should render a customer salon service', () => {
        render(<Appointment customer={{service: 'Bald Parlor'}} />);
        expect(container.querySelectorAll('table > tr > td')[4].textContent).toMatch('Bald Parlor');
    });

    it('should render a notes heading', () => {
        render(<Appointment customer={{}} />);
        expect(container.querySelectorAll('table > tr > th')[5].textContent).toMatch('Notes');
    });

    it('should render a customer notes', () => {
        render(<Appointment customer={{notes: 'I wanna be bald'}} />);
        expect(container.querySelectorAll('table > tr > td')[5].textContent).toMatch('I wanna be bald');
    });
    
})

describe('AppointmentsDayView', () => {
    let container;
    let today;
    let appointments;

    beforeEach(() => {
        container = document.createElement('div');
        today = new Date();
        appointments = [
            {
                startsAt: today.setHours(12, 0),
                customer: { firstName: 'Ashley' }
            },
            {
                startsAt: today.setHours(13, 0),
                customer: { firstName: 'Jordan' }
            }
        ];
    });

    const render = component => ReactDOM.render(component, container);

    it('renders a div with right id', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    });

    it('renders multiple appointments in ol element', () => {

        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('ol')).not.toBeNull();
        expect(
            container.querySelector('ol').children
        ).toHaveLength(2);
    });

    it('renders each appointment in an li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
        expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
    });

    it('initially shows a message saying there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.textContent).toMatch(
            'There are no appointments scheduled for today.'
        );
    });

    it('selects the first customer by default', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Ashley');
    });

    it('has a button in each li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(
            container.querySelectorAll('li > button')
        ).toHaveLength(2);
        expect(
            container.querySelectorAll('li > button')[0].type
        ).toEqual('button');
    });

    it('renders another appointment when selected', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    });

    it('should render a heading for appointment to make it clear which appointment is being views', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('h1').textContent).toMatch(appointments[0].startsAt.toString());
    });

})