import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {};

  handleSubmit = event => {
    event.preventDefault();
    console.log('Сбмит формы - handleSubmit');
  };

  handleLoadMore = () => {
    console.log('Клик по Load more - handleLoadMore');
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery />
        <Button onClick={this.handleLoadMore} />
        <Loader />
        {/* <Modal /> */}
      </div>
    );
  }
}
