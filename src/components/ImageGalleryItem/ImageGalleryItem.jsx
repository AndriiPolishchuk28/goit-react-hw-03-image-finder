export const ImageGalleryItem = ({ webformat, largeImage, tags, modalUrl }) => {
  return (
    <li className="gallery-item">
      <img
        onClick={() => modalUrl(largeImage)}
        width={300}
        height={200}
        src={webformat}
        alt={tags}
      />
    </li>
  );
};
