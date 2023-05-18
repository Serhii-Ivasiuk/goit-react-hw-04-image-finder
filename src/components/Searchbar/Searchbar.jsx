// Libs
import { useState } from 'react';
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

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = evt => {
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchQuery.trim() === '') {
      toast.info('Please, enter yor search request.');
      setSearchQuery('');
    } else {
      onSubmit(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <Header>
      <SaerchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInput}
        />
      </SaerchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
