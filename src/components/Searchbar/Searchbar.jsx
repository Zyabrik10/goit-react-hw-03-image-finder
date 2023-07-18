import { Component } from 'react';
import PropsType from 'props-type';

export class Searchbar extends Component {
  formHandler = e => {
    e.preventDefault();

    this.props.inputSearchText(e.target.input.value);
    this.props.setDefaultPage();
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.formHandler}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="input"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propsType = {
  searchText: PropsType.string,
};
