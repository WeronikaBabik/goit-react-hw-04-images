import React, { Component } from 'react';
import css from './Searchbar.module.css';
import dataFromPixabay from 'components/API/Api';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = { inputSearch: '', page: 1 };

  async componentDidMount() {
    await dataFromPixabay(this.state.inputSearch);
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputSearch.trim() === '') {
      return Notiflix.Notify.failure('Nothing was found');
    }
    this.props.onSubmit(this.state.inputSearch);
    this.setState({ inputSearch: '' });
  };
  handleChange = e => {
    const search = e.currentTarget.value.toLowerCase();
    this.setState({ inputSearch: search });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="inputSearch"
            onChange={this.handleChange}
            value={this.state.inputSearch}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
