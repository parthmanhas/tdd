import React, { useState } from 'react';

export const CustomerForm = ({ firstName, lastName, phoneField, onSubmit }) => {
    const [customer, setCustomer] = useState({ firstName, lastName, phoneField });

    const handleChange = ({ target }) => setCustomer(
        customer => ({
            ...customer,
            [target.name]: target.value
        }));
    return <form id="customer" onSubmit={() => onSubmit(customer)}>
        <label htmlFor="firstName">First Name</label>
        <input
            id="firstName"
            type="text"
            name="firstName"
            onChange={handleChange}
            value={firstName} />
        <label htmlFor="lastName">Last Name</label>
        <input
            type="text"
            name="lastName"
            value={lastName}
            id="lastName"
            onChange={handleChange}
        />
        <label htmlFor="phoneField">Phone Number</label>
        <input
            type="text"
            name="phoneField"
            value={phoneField}
            id="phoneField"
            onChange={handleChange}
        />
        <input type="submit" value="Add" />
    </form>
};