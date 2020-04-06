import React, { Component } from "react";
import ContactForm from "./components/contactForm/ContactForm";
import Filter from "./components/filter/Filter";
import s from "./App.module.css";

class App extends Component {
  state = {
    contacts: [],
  };

  addContactToState = (newContact) => {
    const { contacts } = this.state;
    this.setState({ contacts: [newContact, ...contacts] });
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  };

  removeContactFromState = (id) => {
    this.setState({
      contacts: [...this.state.contacts.filter((elem) => elem.id !== id)],
    });
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className={s.container}>
        <h2 className={s.header}>Phonebook</h2>
        <ContactForm
          contacts={contacts}
          addContactToState={this.addContactToState}
        />

        <Filter
          contacts={contacts}
          removeContactFromState={this.removeContactFromState}
        />
      </div>
    );
  }
}

export default App;
