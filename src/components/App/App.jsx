// Libs
import { Component } from 'react';
// React components
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
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
      alert(
        'The same serch reques was detected. You need to change you search request.'
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
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />

        {data.length > 0 && !errorMessage && <ImageGallery data={data} />}

        {errorMessage && !isLoading && (
          <p style={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}>
            {errorMessage}
          </p>
        )}

        {data.length === 0 && !isLoading && !errorMessage && (
          <p style={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}>
            Let's find some images for you. <br /> Please enter your request in
            the field above.
          </p>
        )}

        {endResults && !isLoading && !errorMessage && (
          <p style={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}>
            You reached the end of search results.
          </p>
        )}

        {isLoading && <Loader />}

        {data.length > 0 && !isLoading && !endResults && !errorMessage && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
