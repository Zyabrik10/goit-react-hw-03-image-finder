import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import PropsType from 'props-type';

export const ImageGallery = ({
  images,
  triggerModalWindow,
  setLargeImageSrcForModal,
}) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ webformatURL: src, id, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={src}
            tags={tags}
            largeImageURL={largeImageURL}
            triggerModalWindow={triggerModalWindow}
            setLargeImageSrcForModal={setLargeImageSrcForModal}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propsType = {
  images: PropsType.array,
  triggerModalWindow: PropsType.func,
  setLargeImageSrcForModal: PropsType.func,
};
