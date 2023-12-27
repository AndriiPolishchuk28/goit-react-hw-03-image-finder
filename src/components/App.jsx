import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../api/api';
import { Notify } from 'notiflix';
import { STATUSES } from 'constants/constants';

export class App extends Component {
  state = {
    status: STATUSES.idle,
    perPage: 12,
    query: '',
    images: [],
    page: 1,
    totalHits: 0,
    isModal: false,
    selectedPhoto: null,
    error: '',
  };

  onSubmit = query => {
    if (query !== '') {
      this.setState({ query, page: 1, images: [] });
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
      this.setState({ status: STATUSES.pending });
      fetchImages(query, page, perPage)
        .then(({ totalHits, hits }) => {
          if (hits.length === 0) {
            Notify.failure('There is no images with this query');
            this.setState({ status: STATUSES.idle });
            return;
          }
          this.setState(prevState => ({
            status: STATUSES.resolved,
            images: [...prevState.images, ...hits],
            totalHits,
          }));
        })
        .catch(error => {
          this.setState({ status: STATUSES.rejected });
          Notify.failure(`${error.message}`);
        });
    }
  }

  render() {
    const { images, totalHits, isModal, selectedPhoto, status } = this.state;
    const showMore =
      status === STATUSES.resolved && images.length !== totalHits;

    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} modalUrl={this.onSelectedPhoto} />
        {status === STATUSES.pending && <Loader />}
        {showMore && <Button loadMore={this.onLoadHandle} />}
        {isModal && (
          <Modal url={selectedPhoto} closeModal={this.handleCloseModal} />
        )}
      </>
    );
  }
}
