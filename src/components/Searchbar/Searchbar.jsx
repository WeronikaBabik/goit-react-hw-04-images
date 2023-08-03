import React, { useState } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [inputSearch, setInputSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (inputSearch === '') {
      return Notiflix.Notify.failure('Nothing was found');
    }

    onSubmit(inputSearch);
    setInputSearch('');
  };
  const handleChange = e => {
    const { value } = e.currentTarget;
    setInputSearch(value.toLowerCase().trim());
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
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
          onChange={handleChange}
          value={inputSearch}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
