import fetchImages from 'api/fetchImages';
import { Component } from 'react';
import PropsType from 'props-type';

export class Searchbar extends Component {
  inputHandler = e => {
    this.props.inputSearchText(e.target.value);
  };

  formHandler = e => {
    e.preventDefault();

    const query = new URLSearchParams({
      q: e.target.input.value,
    }).toString();

    this.props.setLoader(true);

    fetchImages(query)
      .then(({ hits: images }) => {
        this.props.setImages(images);
        this.props.setLoader(false);
      })
      .catch(err => console.log);
  };

  render() {
    const { searchText } = this.props;

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
            onChange={this.inputHandler}
            value={searchText}
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
