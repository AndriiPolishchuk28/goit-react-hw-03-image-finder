export const ImageGalleryItem = ({ webformat, largeImage, tags, modalUrl }) => {
  return (
    <li className="gallery-item" onClick={() => modalUrl(largeImage)}>
      <img width={300} height={200} src={webformat} alt={tags} />
    </li>
  );
};
