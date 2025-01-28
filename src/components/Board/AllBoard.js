import React, { useEffect, useState } from "react";
import "./BoardDetail.scss";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import BoardAccordion from "./BoardAccordion";
import ReactMarkdown from "react-markdown";
import colorPopImage from "../../assets/images/colorPopImage.png";
import greyImage from "../../assets/images/greyImage.png";
import lightToneImage from "../../assets/images/lightToneImage.png";
import naturalToneImage from "../../assets/images/naturalToneImage.png";

const ImageBlock = ({ imageUrl, altText }) => {
  return (
    <div className="imageContainer">
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

function AllBoard() {
  const location = useLocation();
  const { selectedProducts } = location.state || {};
  const { imageUrl, style, background_removed_images, description } =
    location.state || {};
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (background_removed_images && background_removed_images.length > 0) {
      setImages(
        background_removed_images.map((base64Image, index) => ({
          id: index,
          src: `data:image/png;base64,${base64Image}`,
          alt: `Background removed image ${index + 1}`,
        }))
      );
    }
  }, [background_removed_images]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedProducts && selectedProducts.length > 0) {
      const newHexCode = selectedProducts.flatMap((item) =>
        item.Hex_Code.split(", ").map((code) => code.trim())
      );
      const uniqueColors = [...new Set(newHexCode)]; // Remove duplicates
      setColors(uniqueColors);
    }
  }, [selectedProducts]);

  navigate("/inspirations");
  // Function to get the image based on the style
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

  return (
    <>
      <Navbar />
      <div className="boardDetails">
        <div className="title" data-aos="fade-up" data-aos-duration="1000">
          <h2>Living Room</h2>
          <p>Your World Of Inspiration</p>
        </div>
        <div className="container">
          <div className="innerDetails">
            <div className="row">
              <div className="col-lg-4">
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
                  <img src={imageUrl} alt="Generated" />
                  <h4 style={{ textAlign: "justify" }}>
                    {description.main_title}{" "}
                  </h4>
                  <br />
                  <p style={{ textAlign: "justify" }}>
                    <ReactMarkdown>{description.description}</ReactMarkdown>
                  </p>
                </div>
              </div>
            </div>
            <div className="imageWrapper">
              <div className="imgBoard">
                <img
                  className="imageContainer"
                  src={getImageByStyle(style)}
                  alt="Styled"
                />

                {images.map((image) => (
                  <ImageBlock
                    key={image.id}
                    imageUrl={image.src}
                    altText={image.alt}
                  />
                ))}
              </div>
            </div>
            <div>
              <button
                className="generate-image-btn"
                onClick={() => navigate("/inspirations")}
              >
                Back To Boards
              </button>
            </div>

            <BoardAccordion />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBoard;
