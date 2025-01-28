/* eslint-disable react/prop-types */
const GridThree = ({ images }) => {
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(2, 1fr)",
        alignItems: "start",
      }}
    >
      <div
        style={{
          gridColumn: "1 / 2",
        }}
      >
        <img
          src={images[0].src}
          alt="dummy-image"
          style={{ height: "100%", aspectRatio: "9/16" }}
        />
      </div>

      <div
        style={{
          gridColumn: "2 / 3",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {images.slice(1, 3).map((image, idx) => (
          <img
            key={idx}
            src={image.src}
            alt="dummy-image"
            style={{ width: "73.75%", aspectRatio: "1/1", objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
};

export default GridThree;
