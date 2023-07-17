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
  };

  inputSearchText = searchText => {
    this.setState({ searchText: searchText });
  };

  setImages = images => {
    this.setState({ images: images, page: 1, loader: true });
  };

  addImages = () => {
    const query = new URLSearchParams({
      q: this.state.searchText,
      page: this.state.page + 1,
    }).toString();

    this.setLoader(true);

    fetchImages(query).then(data => {
      this.state.images.push(...data.hits);
      this.setLoader(false);
      this.setState({
        images: this.state.images,
        page: this.state.page + 1,
      });
    });
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

  render() {
    const { searchText, images, loader, isModalOpen, largeImageSrcForModal } =
      this.state;

    return (
      <div className="App">
        <Searchbar
          setImages={this.setImages}
          inputSearchText={this.inputSearchText}
          searchText={searchText}
          setLoader={this.setLoader}
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
        {images.length ? <Button addImages={this.addImages} /> : null}
      </div>
    );
  }
}
