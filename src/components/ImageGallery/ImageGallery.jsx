// Libs
import { Component } from 'react';
// React components
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
// import { Modal } from '../Modal/Modal';
// Services
import * as API from '../../services/pixabay-api';

export class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    errorMessage: '',
    isLoading: false,
    endResults: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;

    const initialPage = 1;
    const perPage = 12;

    if (prevProps.query !== query) {
      try {
        this.setState({ isLoading: true });

        const response = await API.getImages(query, initialPage);

        if (response.total === 0) {
          throw new Error('There is no images matching your request');
        } else if (response.totalHits <= page * perPage) {
          this.setState({
            endResults: true,
          });
        } else {
          this.setState({
            endResults: false,
          });
        }

        this.setState({
          errorMessage: '',
          data: response.hits,
          page: initialPage,
        });
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

    if (prevState.page !== page && page !== initialPage) {
      try {
        this.setState({ isLoading: true });

        const response = await API.getImages(query, page);

        if (response.totalHits <= page * perPage) {
          this.setState({
            endResults: true,
          });
        }

        this.setState(prevState => {
          return {
            data: [...prevState.data, ...response.hits],
            isLoading: false,
          };
        });
      } catch (error) {
        this.setState({
          errorMessage: error.message,
        });
      }
    }
  }

  handleLoadMore = async () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { data, isLoading, errorMessage, endResults } = this.state;

    return (
      <>
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

        {data.length > 0 && !errorMessage && (
          <ul className="ImageGallery">
            {data.map(item => (
              <ImageGalleryItem key={item.id} imageData={item} />
            ))}
          </ul>
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

        {/* <Modal /> */}
      </>
    );
  }
}
