import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from './api/api';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    perPage: 12,
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    totalHits: 0,
    isModal: false,
    selectedPhoto: null,
    error: '',
  };

  onSubmit = query => {
    if (query.trim() !== '') {
      this.setState({ query });
    }
  };

  onLoadHandle = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSelectedPhoto = url => {
    this.setState({ selectedPhoto: url, isModal: true });
  };

  handleCloseModal = () => {
    this.setState({ isModal: false });
  };

  componentDidUpdate(_, prevState) {
    const { query, page, perPage } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      fetchImages(query, page, perPage)
        .then(({ totalHits, hits }) =>
          this.setState(prevState => ({
            images: page === 1 ? hits : [...prevState.images, ...hits],
            totalHits,
          }))
        )
        .finally(() => this.setState({ isLoading: false }))
        .catch(error => {
          Notify.failure(`${error.message}`);
        });
    }
  }

  render() {
    const { images, isLoading, totalHits, isModal, selectedPhoto } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} modalUrl={this.onSelectedPhoto} />
        {isLoading && <Loader />}
        {images.length !== totalHits && !isLoading && (
          <Button loadMore={this.onLoadHandle} />
        )}
        {isModal && (
          <Modal url={selectedPhoto} closeModal={this.handleCloseModal} />
        )}
      </>
    );
  }
}
