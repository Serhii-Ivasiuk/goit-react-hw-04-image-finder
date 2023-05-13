// Libs
import { Component } from 'react';
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

export class App extends Component {
  state = {
    searchQuery: '',
    data: [],
    page: 1,
    errorMessage: '',
    isLoading: false,
    endResults: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const response = await API.getImages(searchQuery, page);

        this.setState(prevState => {
          return {
            data: [...prevState.data, ...response.hits],
          };
        });

        if (response.total === 0) {
          throw new Error(
            `There is no images matching your request: "${searchQuery}"`
          );
        }

        if (response.totalHits <= page * API.perPage) {
          this.setState({
            endResults: true,
          });
        }
      } catch (error) {
        this.setState({
          errorMessage: error.message,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSubmit = query => {
    const { searchQuery } = this.state;

    const initialStateParams = {
      page: 1,
      data: [],
      errorMessage: '',
      endResults: false,
    };

    if (query === searchQuery) {
      toast.error(
        'The same request was detected. Please change you search query.'
      );
      return;
    }

    this.setState({ ...initialStateParams, searchQuery: query });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { data, isLoading, errorMessage, endResults } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />

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
          <MessageWpapper>
            You reached the end of search results.
          </MessageWpapper>
        )}

        {isLoading && <Loader />}

        {data.length > 0 && !endResults && !errorMessage && (
          <Button onClick={this.handleLoadMore} />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </AppContainer>
    );
  }
}
