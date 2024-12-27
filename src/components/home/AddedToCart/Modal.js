import React, { useEffect, useState } from 'react';
import "./Modal.css"; // Include your styles here
import axios from 'axios';
import deleteIcon from '../../../assets/images/delete.svg'; // Import the delete icon

const Modal = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && event.target.className === 'modal-overlay') {
        onClose();
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setGeneratedImageUrl(''); // Reset the generated image URL when the modal is opened
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = async (item_id) => {
    const email = user.email; // Update this if needed

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-from-cart`, {
        params: { item_id, email }
      });

      if (response.status === 200) {
        // Remove the item from the cartItems state
        setCartItems(prevCartItems => prevCartItems.filter(item => item.item_id !== item_id));
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const handleGenerate = async () => {
    setLoading(true); // Set loading to true when generating starts
    const selections = localStorage.getItem("userSelections");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/generate-image/`, {
        email: "umair.yousaf0098@gmail.com",
        output_image_path: `./Image/${Math.floor(Math.random() * 1)}.jpg`,
        selections: selections
      });

      if (response.status === 200) {
        setGeneratedImageUrl(response.data.image_url); // Assuming the response contains the image URL
        setCartItems([]); // Clear the cart items after image generation
      } else {
        console.error('Failed to generate image');
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false); // Set loading to false when generating ends
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-2">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {generatedImageUrl ? (
          <div style={{ textAlign: "center" }}>
            <img src={generatedImageUrl} alt="Generated" className="generated-image" />
          </div>
        ) : (
          <>
            <div className="my-cart">
              <h2>My Cart</h2>
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.item_id} className="shopping-item">
                    <div className="item-details">
                      <img src={`data:image/jpeg;base64,${item.Image}`} alt={item.Title} className="item-image" />
                      <div className="item-info">
                        <h3>Title : {item.Title}</h3>
                        <p>Available Colors : {item.Color}</p>
                      </div>
                    </div>
                    <div className="item-actions">
                      <div className="item-price">
                        <p>${item.Price}</p>
                      </div>
                      <button className="delete-button" onClick={() => handleDelete(item.item_id)}>
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in the cart.</p>
              )}
            </div>
            <div className="generate-btn">
              <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
