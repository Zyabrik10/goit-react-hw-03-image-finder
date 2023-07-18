import { Component } from 'react';
import fetchImages from 'api/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchText: '',
    images: [],
    page: 1,
    loader: false,
    isModalOpen: false,
    largeImageSrcForModal: '',
    areImagesInited: false,
    showMoreButton: false,
  };

  inputSearchText = searchText => {
    this.setState({ searchText: searchText });
  };

  setImages = images => {
    this.setState({ areImagesInited: true, images: images });
  };

  addImages = images => {
    this.state.images.push(...images);
    this.setState({ images: this.state.images });
  };

  setLoader = value => {
    this.setState({ loader: value });
  };

  triggerModalWindow = value => {
    this.setState({ isModalOpen: value });
  };

  setLargeImageSrcForModal = src => {
    this.setState({ largeImageSrcForModal: src });
  };

  setDefaultPage = () => {
    this.setState({ page: 1, areImagesInited: false });
  };

  increasePage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  showMoreButton = bool => {
    this.setState({ showMoreButton: bool });
  };

  componentDidUpdate(prevPorps, prevState) {
    if (this.state.loader) return;
    const query = new URLSearchParams({
      q: this.state.searchText,
      page: this.state.page,
    }).toString();

    if (this.state.page === 1 && !this.state.areImagesInited) {
      this.setLoader(true);

      fetchImages(query).then(({ hits: images, totalHits }) => {
        if (totalHits > 12) this.showMoreButton(true);
        else this.showMoreButton(false);
        this.setImages(images);
        this.setLoader(false);
      });
    } else if (this.state.page !== prevState.page) {
      this.setLoader(true);

      fetchImages(query).then(({ hits: images, totalHits }) => {
        if (this.state.images.length + 12 < totalHits)
          this.showMoreButton(true);
        else this.showMoreButton(false);
        this.addImages(images);
        this.setLoader(false);
      });
    }
  }

  render() {
    const {
      showMoreButton,
      images,
      loader,
      isModalOpen,
      largeImageSrcForModal,
    } = this.state;

    return (
      <div className="App">
        <Searchbar
          inputSearchText={this.inputSearchText}
          setDefaultPage={this.setDefaultPage}
        />
        <ImageGallery
          images={images}
          triggerModalWindow={this.triggerModalWindow}
          setLargeImageSrcForModal={this.setLargeImageSrcForModal}
        />
        {loader ? <Loader /> : null}
        <Modal
          isModalOpen={isModalOpen}
          largeImageSrcForModal={largeImageSrcForModal}
          triggerModalWindow={this.triggerModalWindow}
          setLargeImageSrcForModal={this.setLargeImageSrcForModal}
        />
        {showMoreButton ? <Button increasePage={this.increasePage} /> : null}
      </div>
    );
  }
}
