import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './ContactForm.module.css';

const INITIAL_STATE = {
    name: "",
    number: "",
} 

class ContactForm extends Component {
    state = INITIAL_STATE;

    handleChangeForm = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState(INITIAL_STATE);
    }
    render() {
        const { name, number } = this.state;
        return (
            <form className={s.form} onSubmit={this.handleSubmit}>
                <input 
                type="text" 
                name="name" 
                placeholder="Имя" 
                className={s.input}
                value={name} 
                onChange={this.handleChangeForm} />
                <input 
                type="tel"
                name="number" 
                placeholder="Телефон" 
                className={s.input}
                value={number} 
                onChange={this.handleChangeForm}/>
                <button 
                className={s.button}
                type="submit"
                >Добавить в контакты</button>
            </form>
        )
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
export default ContactForm;