import { Component } from 'react';
import { ReactComponent as SearchIcon } from '../icons/search-svgrepo-com.svg';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const query = e.currentTarget.elements.search.value;
    const formattedQuery = query.trim().toLowerCase();

    this.props.onSubmit(formattedQuery);
  };

  render() {
    return (
      <header className={css.header_search}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.btn}>
            <SearchIcon width={30} height={20} />
          </button>

          <input
            className={css.input}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
