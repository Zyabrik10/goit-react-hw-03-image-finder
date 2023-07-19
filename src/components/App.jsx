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
    showMoreButton: false,
  };

  inputSearchText = searchText => {
    this.setState({ searchText: searchText });
  };

  setImages = images => {
    this.setState({ images: images });
  };

  addImages = images => {
    this.setState(prev => ({ images: [...prev.images, ...images] }));
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
    this.setState({ page: 1 });
  };

  increasePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  showMoreButton = bool => {
    this.setState({ showMoreButton: bool });
  };

  initMoreButton(callback) {
    if (callback()) this.showMoreButton(true);
    else this.showMoreButton(false);
  }

  async initImagesList(query) {
    const { hits: images, totalHits } = await fetchImages(query);
    this.setImages(images);
    return totalHits;
  }

  async addToImagesList(query) {
    const { hits: images, totalHits } = await fetchImages(query);
    this.addImages(images);
    return totalHits;
  }

  async updateImageList(prevState) {
    const query = new URLSearchParams({
      q: this.state.searchText,
      page: this.state.page,
    }).toString();

    this.setLoader(true);

    if (this.state.page === 1) {
      const totalHits = await this.initImagesList(query);
      this.initMoreButton(() => totalHits > 12);
    } else if (this.state.page !== prevState.page) {
      const totalHits = await this.addToImagesList(query);
      this.initMoreButton(() => this.state.images.length + 12 < totalHits);
    }

    this.setLoader(false);
  }

  componentDidUpdate(prevPorps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchText !== this.state.searchText
    )
      this.updateImageList(prevState);
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
