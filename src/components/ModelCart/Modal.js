// // Model.js
// import React, { useEffect } from 'react';
// import "./Modal.css"; // Include your styles here

// const Modal = ({ isOpen, onClose, children }) => {
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && event.target.className === 'modal-overlay') {
//         onClose();
//       }
//     };

//     window.addEventListener('click', handleClickOutside);
//     return () => {
//       window.removeEventListener('click', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;


// Here is Umair code 
// import React, { useEffect } from 'react';
// import "./Modal.css"; // Include your styles here
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const Modal = ({ isOpen, onClose }) => {
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && event.target.className === 'modal-overlay') {
//         onClose();
//       }
//     };

//     window.addEventListener('click', handleClickOutside);
//     return () => {
//       window.removeEventListener('click', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const sampleData = [
//     {
//       id: 1,
//       title: 'Common Projects Bball High',
//       color: 'White',
//       price: 549,
//       quantity: 2,
//       image: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//     {
//       id: 2,
//       title: 'Maison Margiela Future Sneakers',
//       color: 'White',
//       price: 870,
//       quantity: 1,
//       image: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//     {
//       id: 3,
//       title: 'Our Legacy Brushed Scarf',
//       color: 'Brown',
//       price: 349,
//       quantity: 1,
//       image: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//   ];

//   const handleDelete = (id) => {
//     console.log(`Item with id ${id} deleted`);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <div className="my-cart">
//           <h2>My Cart</h2>
//           {sampleData.map(item => (
//             <div key={item.id} className="shopping-item">
//               <div className="item-details">
//                 <img src={item.image} alt={item.title} className="item-image" />
//                 <div className="item-info">
//                   <h3>{item.title}</h3>
//                   <p>{item.color}</p>
//                 </div>
//               </div>
//               <div className="item-actions">
//                 <div className="item-price">
//                   <p>${item.price}</p>
//                 </div>
//                 <button className="" onClick={() => handleDelete(item.id)}>
                  
//                   DELETE
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

















// umairs code

// // Modal.js

// import React, { useEffect } from 'react';
// import "./Modal.css"; // Include your styles here
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const Modal = ({ isOpen, onClose, cartItems }) => {

//   console.log("this is cart items",cartItems)
//   console.log(cartItems.cart_items[0].Price);

//   // console.log(cartItems[0].data.Price);
//   // console.log(cartItems.cart_items[0].Price);
//   // console.log(cartItems.cart_items[0].Price);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && event.target.className === 'modal-overlay') {
//         onClose();
//       }
//     };

//     window.addEventListener('click', handleClickOutside);
//     return () => {
//       window.removeEventListener('click', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const handleDelete = (id) => {
//     console.log(`Item with id ${id} deleted`);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <div className="my-cart">
//           <h2>My Cart</h2>
//           {cartItems.length > 0 ? (
//             cartItems.map(item => (
//               <div key={item.id} className="shopping-item">
//                 <div className="item-details">
//                   <img src={item.image} alt={item.title} className="item-image" />
//                   <div className="item-info">
//                     <h3>{item.title}</h3>
//                     <p>{item.color}</p>
//                   </div>
//                 </div>
//                 <div className="item-actions">
//                   <div className="item-price">
//                     <p>${item.price}</p>
//                   </div>
//                   <button className="delete-button" onClick={() => handleDelete(item.id)}>
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>Your cart is empty.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
























// atif try

// import React, { useEffect } from 'react';
// import "./Modal.css"; // Include your styles here
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const Modal = ({ isOpen, onClose }) => {
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && event.target.className === 'modal-overlay') {
//         onClose();
//       }
//     };

//     window.addEventListener('click', handleClickOutside);
//     return () => {
//       window.removeEventListener('click', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const sampleData = [
//     {
//       id: 1,
//       title: 'Common Projects Bball High',
//       color: 'White',
//       price: 549,
//       quantity: 2,
//       image: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//     {
//       id: 2,
//       title: 'Maison Margiela Future Sneakers',
//       color: 'White',
//       price: 870,
//       quantity: 1,
//       image: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//     {
//       id: 3,
//       title: 'Our Legacy Brushed Scarf',
//       color: 'Brown',
//       price: 349,
//       quantity: 1,
//       image: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//   ];

//   const handleDelete = (id) => {
//     console.log(`Item with id ${id} deleted`);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <div className="my-cart">
//           <h2>My Cart</h2>
//           {sampleData.map(item => (
//             <div key={item.id} className="shopping-item">
//               <div className="item-details">
//                 <img src={item.image} alt={item.title} className="item-image" />
//                 <div className="item-info">
//                   <h3>{item.title}</h3>
//                   <p>{item.color}</p>
//                 </div>
//               </div>
//               <div className="item-actions">
//                 <div className="item-price">
//                   <p>${item.price}</p>
//                 </div>
//                 <button className="" onClick={() => handleDelete(item.id)}>
                  
//                   DELETE
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;


















































// working with out delete operation 
// import React, { useEffect } from 'react';
// import "./Modal.css"; // Include your styles here

// const Modal = ({ isOpen, onClose, cartItems }) => {
//   console.log("byefbyufg",cartItems)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && event.target.className === 'modal-overlay') {
//         onClose();
//       }
//     };

//     window.addEventListener('click', handleClickOutside);
//     return () => {
//       window.removeEventListener('click', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const handleDelete = (id) => {
//     console.log(`Item with id ${id} deleted`);
//     // Implement delete functionality here if needed
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <div className="my-cart">
//           <h2>My Cart</h2>
//           {cartItems.length > 0 ? (
//             cartItems.map(item => (
//               <div key={item.item_id} className="shopping-item">
//                 <div className="item-details">
//                   <img src={`data:image/jpeg;base64,${item.Image}`} alt={item.Title} className="item-image" />
//                   <div className="item-info">
//                     <h3>{item.Title}</h3>
//                     <p>{item.Color}</p>
//                   </div>
//                 </div>
//                 <div className="item-actions">
//                   <div className="item-price">
//                     <p>${item.Price}</p>
//                   </div>
//                   <button className="delete-button" onClick={() => handleDelete(item.item_id)}>
//                     DELETE
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No items in the cart.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;





































// Model.js final
import React, { useEffect } from 'react';
import "./Modal.css"; // Include your styles here
import axios from 'axios';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Modal = ({ isOpen, onClose, cartItems, setCartItems }) => {
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

  if (!isOpen) return null;

  const handleDelete = async (item_id) => {
    const email = "shibtasam+2a@gmail.com"; // Update this if needed

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-from-cart`, {
        params: { item_id, email }
      });

      if (response.status === 200) {
        // Remove the item from the cartItems state
        setCartItems(prevCartItems => prevCartItems.filter(item => item.item_id !== item_id));
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="my-cart">
          <h2>My Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.item_id} className="shopping-item">
                <div className="item-details">
                  <img src={`data:image/jpeg;base64,${item.Image}`} alt={item.Title} className="item-image" />
                  <div className="item-info">
                    <h3>{item.Title}</h3>
                    <p>{item.Color}</p>
                  </div>
                </div>
                <div className="item-actions">
                  <div className="item-price">
                    <p>${item.Price}</p>
                  </div>
                  {/* <button className="delete-button" onClick={() => handleDelete(item.item_id)}>
                    DELETE
                  </button> */}

                  <button className="delete-button" onClick={() => handleDelete(item.item_id)}>
                     <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
              
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
        <div style={{textAlign:"center"}}>
          Render Image Here
        </div>
        <div className="generate-btn">
                            <button  >
                            Generate
                                
                            </button>
                        </div>
      </div>
      
    </div>
  );
};

export default Modal;
