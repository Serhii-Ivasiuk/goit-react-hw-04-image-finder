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
  state = { data: [], page: 1, status: 'idle' };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;

    const initialPage = 1;

    if (prevProps.query !== query) {
      console.log('ImageGallery >>> обновились пропсы');

      this.setState({ status: 'pending' });

      const response = await API.getImages(query, initialPage);

      this.setState({
        data: response.hits,
        page: initialPage,
        status: 'resolved',
      });

      return;
    }

    if (prevState.page !== page && page !== initialPage) {
      console.log('ImageGallery >>> обновился стейт');

      const response = await API.getImages(query, page);

      this.setState(prevState => {
        return { data: [...prevState.data, ...response.hits] };
      });
    }
  }

  handleLoadMore = async () => {
    // console.log('ImageGallery >>> клик по load more');

    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { data, status } = this.state;

    return (
      <div>
        {status === 'resolved' && (
          <ul className="ImageGallery">
            {data.map(item => (
              <ImageGalleryItem key={item.id} imageData={item} />
            ))}
          </ul>
        )}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && <Button onClick={this.handleLoadMore} />}

        {/* <Modal /> */}
      </div>
    );
  }
}
