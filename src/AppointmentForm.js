import React from 'react';

export const AppointmentForm = ({ selectableServices, service, onSubmit }) => {
    const [currentService, setCurrentService] = useState(service);
    <form id="appointment" onSubmit={() => onSubmit(currentService)}>
        <label htmlFor="service">Select Service</label>
        <select
            id="service"
            name="service"
            value={service}
            readOnly>
            <option />
            {selectableServices.map(service => (
                <option key={service}>{service}</option>
            ))}
        </select>
        <input type="submit" value="Book Appointment" />
    </form>
}

AppointmentForm.defaultProps = {
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions'
    ]
}