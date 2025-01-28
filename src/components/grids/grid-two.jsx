/* eslint-disable react/prop-types */
const GridTwo = ({ images }) => {
  return (
    <div
      className="grid-flow"
      style={{
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      {images.slice(0, 2).map((image, idx) => (
        <img
          key={idx}
          src={image.src}
          alt="dummy-image"
          className="image-settings"
        />
      ))}
    </div>
  );
};

export default GridTwo;
