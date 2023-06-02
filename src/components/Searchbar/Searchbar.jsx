import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../search.svg';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = async e => {
  e.preventDefault();

  const { searchQuery } = this.state;
  const { onSubmit } = this.props;
  const trimmedQuery = searchQuery.trim();

  if (!trimmedQuery) {
    toast.info('Please enter a search query.');
    return;
  }

  onSubmit(trimmedQuery);
  this.setState({ searchQuery: '' });
};

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <SearchIcon />
          </SearchFormBtn>

          <SearchFormInput
            type="search"
            aria-label="Search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
