import React from 'react';
import PropTypes from 'prop-types';

import s from './ContactList.module.css'

const ContactList = ({ contacts, onDeleteContact }) => 
        <ul className={s.list}>
            {contacts.map(contact => (
                <li key={contact.id} className={s.item}>
                    <p>
                        {contact.name}: {contact.number}
                    </p>
                    <button
                    type="button"
                    className={s.button}
                    onClick={() => onDeleteContact(contact.id)}
                    >Удалить</button>
                </li>
            ))}
        </ul>
ContactList.propTypes = {
    onDeleteContact: PropTypes.func.isRequired
}

export default ContactList;