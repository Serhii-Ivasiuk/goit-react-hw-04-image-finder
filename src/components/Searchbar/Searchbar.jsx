// Libs
import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Styled components
import {
  Header,
  SaerchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = { searchQuery: '' };

  handleInput = event => {
    const inputValue = event.currentTarget.value;

    this.setState({ searchQuery: inputValue });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    if (searchQuery.trim() === '') {
      this.setState({ searchQuery: '' });

      toast.info('Please, enter yor search request.');

      return;
    }

    onSubmit(searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <Header>
        <SaerchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormBtnLabel className="SearchForm-button-label">
              Search
            </SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleInput}
          />
        </SaerchForm>
      </Header>
    );
  }
}
