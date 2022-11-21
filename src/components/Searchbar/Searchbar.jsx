import { Component } from 'react';
import {
  SearchbarWrapper,
  SearchbarBtn,
  SearchbarForm,
  SearchbarInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  onChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value.trim() });
  };

  reset = () => {
    this.setState({ search: '' });
  };

  onSubmit = e => {
    e.preventDefault();
    const searchQuerry = this.state.search;
    this.props.onSubmit(searchQuerry);
    this.reset();
  };

  render() {
    return (
      <SearchbarWrapper>
        <SearchbarForm onSubmit={this.onSubmit}>
          <SearchbarBtn type="submit">
            <span className="button-label">Search</span>
          </SearchbarBtn>

          <SearchbarInput
            value={this.state.search}
            name="search"
            onChange={this.onChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchbarForm>
      </SearchbarWrapper>
    );
  }
}
