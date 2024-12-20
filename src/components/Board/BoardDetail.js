import React, { useEffect, useState } from 'react';
import './BoardDetail.scss';
import axios from "axios";
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import BoardAccordion from './BoardAccordion';
import ReactMarkdown from 'react-markdown';
import colorPopImage from "../../assets/images/colorPopImage.png";
import greyImage from "../../assets/images/greyImage.png";
import lightToneImage from "../../assets/images/lightToneImage.png";
import naturalToneImage from "../../assets/images/naturalToneImage.png";
import Loader from '../../components/LoaderOfImage/LoaderImg';  // Import your Loader component

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
    const { selectedProducts } = location.state || {};
    const [image, setImage] = useState('');
    const { imageUrl, style, background_removed_images, description } = location.state || {};
    const [isLoading, setIsLoading] = useState(true);  // Initially set to true for loader to show
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        if (background_removed_images && background_removed_images.length > 0) {
            setImages(background_removed_images.map((base64Image, index) => ({
                id: index,
                src: `data:image/png;base64,${base64Image}`,
                alt: `Background removed image ${index + 1}`
            })));
        }
    }, [background_removed_images]);

    useEffect(() => {
        const fetchDescription = async () => {
            try {
                localStorage.removeItem('generateImage')
                setIsLoading(true);  // Start loading
                const selections = selectedProducts.map(p => p.Title);
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/generate-image`, {
                    email: 'email@example.com',
                    selections: selections,
                    selectedProducts: selectedProducts,
                });
                localStorage.setItem('description',JSON.stringify(description))

                if (response.data.image_url) {
                    localStorage.setItem('description',JSON.stringify(description))
                    setImage(response.data.image_url);
                    localStorage.setItem("generateImage", response.data.image_url);
                    localStorage.setItem('background_removed_images',background_removed_images)
                    
                } else {
                    throw new Error('Image URL is missing from the response.');
                }

            } catch (error) {
                console.error('Error fetching description:', error);
            } finally {
                setIsLoading(false);  // Stop loading after fetch completes
            }
        };

        const isImageSave = localStorage.getItem("isImageSave");

        if (isImageSave === 'true') {
            fetchDescription();
            localStorage.setItem("isImageSave", 'false');
        } else {
            const savedImage = localStorage.getItem("generateImage");
            if (savedImage) {
                setImage(savedImage);
                setIsLoading(false);  // Set loading to false if image is from local storage
            }
        }
    }, [selectedProducts]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (selectedProducts && selectedProducts.length > 0) {
            const newHexCode = selectedProducts.flatMap(item =>
                item.Hex_Code.split(', ').map(code => code.trim())
            );
            const uniqueColors = [...new Set(newHexCode)];
            const limitedColors = uniqueColors.slice(0, 14); // Limit to 14 colors
            setColors(limitedColors);
        }
    }, [background_removed_images, image, selectedProducts]);

    const getImageByStyle = (style) => {
        switch (style) {
            case 'Grey Tones':
                return greyImage;
            case 'Natural Tones':
                return naturalToneImage;
            case 'Color Pop':
                return colorPopImage;
            case 'Light Tones':
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
                                {/* <div className="texture">
                                    <div className="card">
                                        <p>Textures</p>
                                        <div className="block">
                                            <div className="imgBlock"><img src="/images/tx1.svg" alt="texture" /></div>
                                            <div className="imgBlock"><img src="/images/tx2.svg" alt="texture" /></div>
                                            <div className="imgBlock"><img src="/images/tx3.svg" alt="texture" /></div>
                                            <div className="imgBlock"><img src="/images/tx4.svg" alt="texture" /></div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="colorPelete">
                                    <div className="block">
                                        {colors.map((color, index) => (
                                            <div className="card" key={index}>
                                                <span style={{ backgroundColor: color }} className="colorBlock"></span>
                                                <p>Color</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="details">
                                    {isLoading ? (  // Show loader while image is being fetched
                                        <Loader />
                                    ) : (
                                        <img src={`data:image/png;base64,${image}`} alt="Generated" />
                                    )}
                                    <h4 style={{ textAlign: "justify" }}>{description.main_title} </h4><br />
                                    <p style={{ textAlign: "justify" }}><ReactMarkdown>{description.description}</ReactMarkdown></p>
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
                            </div>
                            
                        
                        <BoardAccordion />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardDetail;
