// Libs
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// React components
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { MessageWpapper } from '../ErrorMessage/ErrorMessage';
// Styled components
import { AppContainer } from './App.styled';
// Services
import * as API from '../../services/pixabay-api';

import React from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [endResults, setEndResults] = useState(false);

  useEffect(() => {
    if (searchQuery === '') return;

    setIsLoading(true);

    API.getImages(searchQuery, page)
      .then(response => {
        setData(prevData => [...prevData, ...response.hits]);

        if (response.totalHits === 0) {
          throw new Error(
            `There is no images matching your request: "${searchQuery}"`
          );
        }

        if (response.totalHits <= page * API.perPage) {
          setEndResults(true);
        }
      })
      .catch(error => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, page]);

  const handleSubmit = query => {
    if (query === searchQuery) {
      toast.error(
        'The same request was detected. Please change you search query.'
      );
    } else {
      setSearchQuery(query);
      setPage(1);
      setData([]);
      setErrorMessage('');
      setEndResults(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />

      {data.length > 0 && !errorMessage && <ImageGallery data={data} />}

      {errorMessage && !isLoading && (
        <MessageWpapper>{errorMessage}</MessageWpapper>
      )}

      {data.length === 0 && !isLoading && !errorMessage && (
        <MessageWpapper>
          Let's find some images for you. <br /> Please enter your request in
          the field above.
        </MessageWpapper>
      )}

      {endResults && !isLoading && !errorMessage && (
        <MessageWpapper>You reached the end of search results.</MessageWpapper>
      )}

      {isLoading && <Loader />}

      {data.length > 0 && !endResults && !errorMessage && (
        <Button onClick={handleLoadMore} />
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </AppContainer>
  );
};
