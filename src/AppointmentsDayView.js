import React, { useState } from 'react';

const appointmentTimeOfDay = startAt => {
    const [h, m] = new Date(startAt).toTimeString().split(':');
    return `${h}:${m}`;
}

export const Appointment = ({ customer }) => (
    <div>
        <table>
            <tr>
                <th>First Name</th>
                <td>{customer.firstName}</td>
            </tr>
            <tr>
                <th>Last Name</th>
                <td>{customer.lastName}</td>
            </tr>
            <tr>
                <th>Telephone</th>
                <td>{customer.telephone}</td>
            </tr>
            <tr>
                <th>Stylist</th>
                <td>{customer.stylist}</td>
            </tr>
            <tr>
                <th>Service</th>
                <td>{customer.service}</td>
            </tr>
            <tr>
                <th>Notes</th>
                <td>{customer.notes}</td>
            </tr>
        </table>
    </div>
);

export const AppointmentsDayView = ({ appointments }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(0);
    return (
        <div id="appointmentsDayView">
            <ol>
                {appointments.map((appointment, i) => (
                    <li key={appointment.startsAt}>
                        <button
                            type="button"
                            onClick={() => setSelectedAppointment(i)}>
                            {appointmentTimeOfDay(appointment.startsAt)}
                        </button>
                    </li>
                ))}
            </ol>
            {appointments.length === 0 ? (
                <p>There are no appointments scheduled for today.</p>
            ) : (
                <div>
                    <h1>{(appointments[selectedAppointment].startsAt)}</h1>
                    <Appointment {...appointments[selectedAppointment]} />
                </div>
            )}

        </div>
    )
};