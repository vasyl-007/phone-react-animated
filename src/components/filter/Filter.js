import React, { Component, Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import s from "./Filter.module.css";
import slideTransitions from "./transitions/slide.module.css";
import popTransitions from "./transitions/pop.module.css";

class Filter extends Component {
  state = {
    searchName: "",
  };

  reset = () => {
    this.setState({
      searchName: "",
    });
  };

  onSearchName = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
    console.log("this.state.contacts", this.state.contacts);
  };

  filterContacts() {
    return this.props.contacts.filter((elem) =>
      elem.name.toLowerCase().includes(this.state.searchName.toLowerCase())
    );
  }

  handleDelete = async (e) => {
    console.log("e.target ----------->", e.target);
    const id = e.target.id;
    console.log("id", id);
    await this.props.removeContactFromState(id);
    this.reset();
  };

  render() {
    const { searchName } = this.state;
    return (
      <Fragment>
        <h3 className={s.header}>Find contact by name</h3>
        <input
          type="text"
          name="searchName"
          value={searchName}
          onChange={this.onSearchName}
          className={s.input}
          placeholder="Input name contact"
        ></input>

        <TransitionGroup component="ul" className={s.ulFilteredContacts}>
          {this.filterContacts().map((item) => (
            <CSSTransition
              key={item.id}
              timeout={500}
              classNames={popTransitions}
            >
              <li className={s.liFilteredContact}>
                {item.name}, {item.number}
                <button
                  id={item.id}
                  type="button"
                  onClick={this.handleDelete}
                  className={s.button}
                >
                  Delete
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Fragment>
    );
  }
}

export default Filter;
