import { Component } from 'react';
import PropsType from 'props-type';

export class ImageGalleryItem extends Component {
  closeModalWindow = () => {
    this.props.setLargeImageSrcForModal('');
    this.props.triggerModalWindow(false);
    window.removeEventListener('keydown', this.closeModalWindow);
    document
      .querySelector('.modal-overlay')
      .removeEventListener('mousedown', this.closeModalWindow);
  };

  closeModalWindowOnKey = ({ key }) => {
    if (key === 'Escape') {
      this.closeModalWindow();
    }
  };

  closeModalWindowOnMouseDown = ({ target }) => {
    if (target.classList.contains('modal-overlay')) this.closeModalWindow();
  };

  openModalOnClick = ({ target }) => {
    this.props.triggerModalWindow(true);
    this.props.setLargeImageSrcForModal(target.getAttribute('data-large'));

    window.addEventListener('keydown', this.closeModalWindowOnKey);
    document
      .querySelector('.modal-overlay')
      .addEventListener('mousedown', this.closeModalWindowOnMouseDown);
  };

  render() {
    const { tags, src, largeImageURL } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={src}
          alt={tags}
          loading="lazy"
          data-large={largeImageURL}
          onClick={this.openModalOnClick}
        />
      </li>
    );
  }
}

ImageGalleryItem.propsType = {
  tags: PropsType.string,
  src: PropsType.string,
  largeImageURL: PropsType.string,
};
