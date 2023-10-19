import { Component } from 'react';
import { ContactForm } from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: '1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: '2', name: 'Hermione Kline', number: '443-89-12' },
      { id: '3', name: 'Eden Clements', number: '645-17-79' },
    ],
    filter: '',
  };

  AddContact = contactData => {
    const hasDuplicates = this.state.contacts.some(
      item => item.name === contactData.name
    );
    if (hasDuplicates) {
      alert(`${contactData.name} is already in contacts.`);
      return;
    } else {
      const finalProduct = {
        ...contactData,
        id: nanoid(),
      };
      this.setState({
        contacts: [...this.state.contacts, finalProduct],
      });
    }
  };

  DeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(item => item.id !== contactId),
    });
  };

  InputFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  FilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filter = this.FilteredContacts();
    return (
      <div className={css.main}>
        <h2>Phonebook</h2>
        <ContactForm addContact={this.AddContact} />
        <h2>Contacts</h2>
        <Filter
          filterValue={this.state.filter}
          filterChange={this.InputFilterChange}
        />
        <ContactList contacts={filter} deleteContact={this.DeleteContact} />
      </div>
    );
  }
}
