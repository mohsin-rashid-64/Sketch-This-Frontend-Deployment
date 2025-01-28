/* eslint-disable react/prop-types */
const GridOne = ({ width, height, image }) => {


  return (
    <div
      style={{
        width,
        height,
        border: "1px solid black",
      }}
    >
      <img
        src={image}
        alt="dummy-image"
        style={{
          width: "100%",
          height: "100%",
        }}
        className="image-settings"
      />
    </div>
  );
};

export default GridOne;
