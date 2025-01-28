import { useEffect, useState } from "react";
import "./BoardDetail.scss";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import BoardAccordion from "./BoardAccordion";
import ReactMarkdown from "react-markdown";
import colorPopImage from "../../assets/images/colorPopImage.png";
import greyImage from "../../assets/images/greyImage.png";
import lightToneImage from "../../assets/images/lightToneImage.png";
import naturalToneImage from "../../assets/images/naturalToneImage.png";
import Loader from "../../components/LoaderOfImage/LoaderImg"; // Import your Loader component
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
import { useCreate } from "../../hooks/useCreate";


function BoardDetail() {
  const location = useLocation();
  const { selectedProducts } = location.state || {};
  const [imageUrl, setImageUrl] = useState("");
  const { background_removed_images, description } = location.state || {};
  const [isLoading, setIsLoading] = useState(true); // Initially set to true for loader to show
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const { create } = useCreate("generate-image");
  

  useEffect(() => {
    
    if (background_removed_images && background_removed_images.length > 0) {
      setImages(
        background_removed_images.map((base64Image, index) => ({
          id: index,
          src: `${base64Image}`,
          alt: `Background removed image ${index + 1}`,
        }))
      );
    }
  }, [background_removed_images]);

  useEffect(() => {

    const fetchDescription = async () => {
      try {
        localStorage.removeItem("generateImage");
        setIsLoading(true); // Start loading
        const selections = selectedProducts.map((p) => p.title);
        const payload={
          email: "email@example.com",
          selections: selections,
          selectedProducts: selectedProducts,
        }
        const response = await create(payload);
        

       

        if (response.image_url) {
          
          setImageUrl(response.image_url);
          
         
        } else {
          throw new Error("Image URL is missing from the response.");
        }
      } catch (error) {
        console.error("Error fetching description:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetch completes
      }
    };

    const isImageSave = localStorage.getItem("isImageSave");
    
    if (isImageSave === "true") {
      fetchDescription();
      localStorage.setItem("isImageSave", "false");
    } else {
      const savedImage = localStorage.getItem("generateImage");
      if (savedImage) {
        setImageUrl(savedImage);
        setIsLoading(false); // Set loading to false if image is from local storage
      }
    }
  }, [selectedProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedProducts && selectedProducts.length > 0) {
      const newHexCode = selectedProducts.flatMap((item) =>
        item.hex_code.split(", ").map((code) => code.trim())
      );
      const uniqueColors = [...new Set(newHexCode)];
      const limitedColors = uniqueColors.slice(0, 14); // Limit to 14 colors
      setColors(limitedColors);
    }
  }, [background_removed_images, imageUrl, selectedProducts]);

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
                  {isLoading ? ( // Show loader while image is being fetched
                    <Loader />
                  ) : (
                    <img
                      src={`data:image/png;base64,${imageUrl}`}
                      alt="Generated"
                    />
                  )}
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
            <div className="">
              {images.length === 1 && (
                <GridOne image={images[0].src} width="100px" height="100px" />
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

            <BoardAccordion description={description} imageUrl={imageUrl} backgroundRemovedImages={background_removed_images} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDetail;

















