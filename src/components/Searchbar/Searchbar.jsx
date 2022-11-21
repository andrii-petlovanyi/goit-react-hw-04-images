import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchbarWrapper,
  SearchbarBtn,
  SearchbarForm,
  SearchbarInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit = () => {} }) => {
  const [search, setSearch] = useState('');

  const onChange = e => setSearch(e.currentTarget.value.trim());

  const handlerSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <SearchbarWrapper>
      <SearchbarForm onSubmit={handlerSubmit}>
        <SearchbarBtn type="submit">
          <span className="button-label">Search</span>
        </SearchbarBtn>

        <SearchbarInput
          value={search}
          name="search"
          onChange={onChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchbarForm>
    </SearchbarWrapper>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
