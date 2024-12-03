import React, { useEffect, useState } from "react";
import "./BoardDetail.scss";
import Navbar from "../navbar/Navbar";
import { useLocation } from "react-router-dom";
import BoardAccordion from "./BoardAccordion";
import ReactMarkdown from "react-markdown";
import colorPopImage from "../../assets/images/colorPopImage.png";
import greyImage from "../../assets/images/greyImage.png";
import lightToneImage from "../../assets/images/lightToneImage.png";
import naturalToneImage from "../../assets/images/naturalToneImage.png";
import DraggableContainer from "./DraggableContainer";

const ImageBlock = ({ imageUrl, altText }) => {
  return (
    <div className="imageContainer">
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

const Grid = ({ images }) => {
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, index) => {
      if (index % size === 0) acc.push(arr.slice(index, index + size));
      return acc;
    }, []);
  };

  console.log(images);
  const imageChunks = chunkArray(images, 5);

  return imageChunks.map((chunk, idx) => (
    <div className="grid-container" key={idx}>
      <div
        key={idx}
        className="grid-column-one"
        style={{
          order: `${idx % 2 === 0 ? 1 : 2}`,
        }}
      >
        <img
          alt="image"
          style={{
            width: "100%",
            height: "100%",
          }}
          src={chunk[0]?.src}
        />
      </div>
      <div
        key={idx}
        className="grid-column-two"
        style={{
          order: `${idx % 2 === 0 ? 1 : 2}`,
        }}
      >
        {chunk.slice(1).map((src, idx) => (
          <img
            key={idx}
            alt="image"
            style={{
              width: "100%",
            }}
            src={src.src}
          />
        ))}
      </div>
    </div>
  ));
};

function BoardDetail() {
  const location = useLocation();
  const { userBoard } = location.state || {};

  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (userBoard?.background_removed_images) {
      setImages(
        userBoard.background_removed_images.map((base64Image, index) => ({
          id: index,
          src: `data:image/png;base64,${base64Image}`,
          alt: `Background removed image ${index + 1}`,
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
          <h2>{userBoard.title || "Living Room"}</h2>
          <p>Your World Of Inspiration</p>
        </div>
        <div className="container">
          <div className="innerDetails">
            <div className="row">
              <div className="col-lg-4">
                <div className="texture">
                  {/* <div className="card">
                                        <p>Textures</p>
                                        <div className="block">
                                            <div className="imgBlock"><img src="/images/tx1.svg" alt="texture" /></div>
                                            <div className="imgBlock"><img src="/images/tx2.svg" alt="texture" /></div>
                                            <div className="imgBlock"><img src="/images/tx3.svg" alt="texture" /></div>
                                            <div className="imgBlock"><img src="/images/tx4.svg" alt="texture" /></div>
                                        </div>
                                    </div> */}
                </div>
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
                  <h4 style={{ textAlign: "justify" }}>{userBoard.title}</h4>
                  <br />
                  <p style={{ textAlign: "justify" }}>
                    <ReactMarkdown>{userBoard.description}</ReactMarkdown>
                  </p>
                </div>
              </div>
            </div>
            <div className="imageWrapper">
              <Grid
                images={[
                  ...images,
                  // ...images,
                  // ...images,

               
                 
                ]}
              />
              {/* <div className="imgBoard">
                {images.map((image) => (
                  <ImageBlock
                    key={image.id}
                    imageUrl={image.src}
                    altText={image.alt}
                  />
                ))}
              </div> */}
            </div>
            {/* <BoardAccordion /> */}
          </div>
        </div>
      </div>
      <DraggableContainer />
    </>
  );
}

export default BoardDetail;
