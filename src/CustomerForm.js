import React, { useState } from 'react';

export const CustomerForm = ({ firstName, onSubmit }) => {
    const [customer, setCustomer] = useState({ firstName });

    const handleChangeFirstName = ({ target }) => setCustomer(
        customer => ({
            ...customer,
            firstName: target.value
        }));
    return <form id="customer" onSubmit={() => onSubmit(customer)}>
        <label htmlFor="firstName">First Name</label>
        <input
            id="firstName"
            type="text"
            name="firstName"
            onChange={handleChangeFirstName}
            value={firstName} />
    </form>
};