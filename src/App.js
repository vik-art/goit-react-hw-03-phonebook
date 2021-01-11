import React, { Component} from 'react';

import shortid from 'shortid';

import s from './App.module.css';

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactsList";
import Filter from "./components/Filter"

export default class App extends Component {
    state = {
        contacts: [
            {id: shortid.generate(), name: 'Rosie Simpson', number: '459-12-56'},
            {id: shortid.generate(), name: 'Hermione Kline', number: '443-89-12'},
            {id: shortid.generate(), name: 'Eden Clements', number: '645-17-79'},
            {id: shortid.generate(), name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: ""
    }

    componentDidMount() {
        const contacts = localStorage.getItem("contacts");
        const parsedContacts = JSON.parse(contacts);
        if(parsedContacts) {
            this.setState({contacts: parsedContacts})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.contacts !== prevState.contacts) {
            localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
        }
    }
    addContact = ({ name, number }) => {
        const contact = {
        id: shortid.generate(),
        name,
        number,
        }
        const { contacts } = this.state;
        if(!name || !number) {
            alert("Some field is empty!")
        }else if(contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
            alert("Contact is already exist!")
        } else {
            this.setState(prevState => ({
            contacts: [contact, ...prevState.contacts],
            }));
        }
    }
    handleDeleteContact = id => {
        this.setState( prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== id)
        }))
    }
    changeFilter = e => {
        this.setState({filter: e.currentTarget.value})
    }
    getVisibleContacts = () => {
        const { filter, contacts } = this.state;
        const normalizeFilter = filter.toLowerCase();
        return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
    }
    render() {
        const { filter } = this.state;
        const visibleContacts = this.getVisibleContacts();
        return <>
        <div className={s.container}>
            <h1 className={s.headling}>Телефонная книга</h1>
            <ContactForm 
            onSubmit={this.addContact}/>

            <Filter value={filter} onChange={this.changeFilter} />
</div>
            <h2 className={s.contacts}>Контакты</h2>
            <ContactList 
            contacts={visibleContacts}
            onDeleteContact = {this.handleDeleteContact}
            />
        </>
    }
}



