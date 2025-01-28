/* eslint-disable react/prop-types */
const GridFive = ({ images }) => {
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(2, 1fr)",
        alignItems: "start",
      }}
    >
      {/* First Column */}
      <div
        style={{
          gridColumn: "1 / 2",
        }}
      >
        <img
          src={images[0].src}
          alt="dummy-image"
          style={{
            aspectRatio: "1/1",
            width: "100%",
            height: "auto",
          }}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          {images.slice(1, 3).map((image, idx) => (
            <img
              key={idx}
              src={image.src}
              alt="dummy-image"
              style={{
                aspectRatio: "1/1",
                width: "100%",
                height: "auto",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          {images.slice(3, 5).map((image, idx) => (
            <img
              key={idx}
              src={image.src}
              alt="dummy-image"
              style={{
                aspectRatio: "1/1",
                width: "100%",
                height: "auto",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridFive;
