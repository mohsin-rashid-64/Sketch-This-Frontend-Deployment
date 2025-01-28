import { useEffect, useState } from "react";
import "./BoardDetail.scss";
import Navbar from "../navbar/Navbar";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import colorPopImage from "../../assets/images/colorPopImage.png";
import greyImage from "../../assets/images/greyImage.png";
import lightToneImage from "../../assets/images/lightToneImage.png";
import naturalToneImage from "../../assets/images/naturalToneImage.png";
import DraggableContainer from "./DraggableContainer";
import GridOne from "../../components/grids/grid-one";
import GridTwo from "../../components/grids/grid-two";
import GridSix from "../../components/grids/grid-six";
import GridTen from "../../components/grids/grid-ten";
import GridFour from "../../components/grids/grid-four";
import GridFive from "../../components/grids/grid-five";
import GridNine from "../../components/grids/grid-nine";
import GridThree from "../../components/grids/grid-three";
import GridSeven from "../../components/grids/grid-seven";
import GridEight from "../../components/grids/grid-eight";


function BoardDetail() {
  const location = useLocation();
  const { userBoard } = location.state || {};

  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (userBoard?.background_removed_images) {
      
      // Filter to include only images at even indices
      const filteredImages = userBoard.background_removed_images.filter((_, index) => index % 2 !== 0);
      
      setImages(
        filteredImages.map((base64Image, index) => ({
          id: index,
          src: `data:image/png;base64,${base64Image.replace(/"/g, "")}`,
          alt: `Background removed image ${index * 2}`, // Adjusted index for alt text
        }))
      );
    }
  }, [userBoard]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userBoard?.hex_code) {
      const uniqueColors = [
        ...new Set(userBoard.hex_code.split(",").map((code) => code.trim())),
      ];
      setColors(uniqueColors);
    }
  }, [userBoard]);

  const getImageByStyle = (style) => {
    switch (style) {
      case "Grey Tones":
        return greyImage;
      case "Natural Tones":
        return naturalToneImage;
      case "Color Pop":
        return colorPopImage;
      case "Light Tones":
        return lightToneImage;
      default:
        return null;
    }
  };

  if (!userBoard) {
    return <p>No board details available</p>;
  }

  return (
    <>
      <Navbar />
      <div className="boardDetails">
        <div className="title" data-aos="fade-up" data-aos-duration="1000">
          <h2>{userBoard.generated_title || "Living Room"}</h2>
          <p>Your World Of Inspiration</p>
        </div>
        <div className="container">
          <div className="innerDetails">
            <div className="row">
              <div className="col-lg-4">
                <div className="texture"></div>
                <div className="colorPelete">
                  <div className="block">
                    {colors.map((color, index) => (
                      <div className="card" key={index}>
                        <span
                          style={{ backgroundColor: color }}
                          className="colorBlock"
                        ></span>
                        <p>Color</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="details">
                  {userBoard.imageUrl ? (
                    <img
                      src={`data:image/jpeg;base64,${userBoard.imageUrl}`}
                      alt="Generated"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <h4 style={{ textAlign: "justify" }}>
                    {userBoard.generated_title}
                  </h4>
                  <br />
                  <p style={{ textAlign: "justify" }}>
                    <ReactMarkdown>{userBoard.description}</ReactMarkdown>
                  </p>
                </div>
              </div>
            </div>
            <div>
              {images.length === 1 && (
                <GridOne image={images[0].src}  />
              )}
              {images.length === 2 && <GridTwo images={images.slice(0, 2)} />}
              {images.length === 3 && <GridThree images={images.slice(0, 3)} />}
              {images.length === 4 && <GridFour images={images.slice(0, 4)} />}
              {images.length === 5 && <GridFive images={images.slice(0, 5)} />}
              {images.length === 6 && <GridSix images={images.slice(0, 6)} />}
              {images.length === 7 && <GridSeven images={images.slice(0, 7)} />}
              {images.length === 8 && <GridEight images={images.slice(0, 8)} />}
              {images.length === 9 && <GridNine images={images.slice(0, 9)} />}
              {images.length === 10 && <GridTen images={images} />}
            </div>
            {/* <BoardAccordion /> */}
          </div>
        </div>
      </div>
      {/* <DraggableContainer /> */}
      <DraggableContainer userBoard={userBoard} />
    </>
  );
}

export default BoardDetail;
