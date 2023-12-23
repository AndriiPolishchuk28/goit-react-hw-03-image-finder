import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, modalUrl }) => {
  return (
    <ul className={css.gallery}>
      {images?.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            webformat={image.webformatURL}
            largeImage={image.largeImageURL}
            tags={image.tags}
            modalUrl={modalUrl}
          />
        );
      })}
    </ul>
  );
};
