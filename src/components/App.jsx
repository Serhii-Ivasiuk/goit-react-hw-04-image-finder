// Libs
import { Component } from 'react';
// React components
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = { searchQuery: '' };

  handleSubmit = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={searchQuery} />
      </div>
    );
  }
}
