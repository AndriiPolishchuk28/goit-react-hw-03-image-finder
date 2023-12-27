import { Component } from 'react';
import { ReactComponent as SearchIcon } from '../icons/search-svgrepo-com.svg';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  onChangeHandle = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    const formattedQuery = searchQuery.trim().toLowerCase();
    this.props.onSubmit(formattedQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.header_search}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.btn}>
            <SearchIcon width={30} height={20} />
          </button>

          <input
            onChange={this.onChangeHandle}
            value={this.state.searchQuery}
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
