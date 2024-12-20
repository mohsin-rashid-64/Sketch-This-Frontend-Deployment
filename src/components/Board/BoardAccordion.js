// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Board.scss';

// function BoardAccordion() {
//     const location = useLocation();
//     const { selectedProducts } = location.state || { selectedProducts: [] };
//     const [loading, setLoading] = useState(false);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const navigate = useNavigate();
//     // const [email,setEmail]=useState()
//     const email="umair@gmail.com"

//     // Fetching data from localStorage
//     const backgroundRemovedImages = localStorage.getItem("background_removed_images");
//     const description = JSON.parse(localStorage.getItem("description") || '{}');
//     const imageUrl = localStorage.getItem("generateImage");
//     const selectedProductsfromlocal = localStorage.getItem("selectedProducts");
//     console.log("select width XXXXX" ,selectedProducts)

//     const hexColors = selectedProducts
//     .filter(item => item.Hex_Code) // Filter items with a Color field
//     .map(item => item.Hex_Code) // Extract the Color field
//     .join(', ');

// console.log("new imaaaaages",hexColors); // Outputs the array of hex color codes

//     useEffect(() => {
//         console.log("description from accordion",description.main_title)
//         const calculateTotals = () => {
//             const totalP = selectedProducts.reduce((acc, product) => {
//                 const price = product.Price ? parseFloat(product.Price.toString().replace(/,/g, '')) : 0;
//                 return acc + price;
//             }, 0);

//             const totalA = selectedProducts.reduce((acc, product) => {
//                 const amount = product.Amount ? parseFloat(product.Amount.toString().replace(/,/g, '')) : 0;
//                 return acc + amount;
//             }, 0);

//             setTotalPrice(totalP);
//             setTotalAmount(totalA);
//         };

//         calculateTotals();
//     }, [selectedProducts]);

//     const handleSave = async () => {
//         setLoading(true);
//         try {
            
//             const backgroundRemovedImagesStr = localStorage.getItem("background_removed_images");
//             // let email = 'test@test.com'

//             console.log('backeground image', backgroundRemovedImagesStr)
            
//             const transformedProducts =

//             [
//                 {
//                   "title": description.main_title,
//                   "hex_code": hexColors,
//                   "image_url": imageUrl,
//                   "description": description.description,
//                   "email": "Ibasafhjda@gmail.com",
//                   "username": "Atif1cgc4 gee",
//                   "width":selectedProducts.length,
//                   "height":selectedProducts.height,
//                   "background_removed_images": [
//                     {"image_data": backgroundRemovedImages},
                    

//                   ]
//                 }
//               ]

//             // Log the transformed products for debugging
//             console.log('Transformed Products:', JSON.stringify(transformedProducts, null, 2));


//             console.log('BOARDA ACCORDIAN JWT',localStorage.getItem("jwt"))

//             // Send the request to the API
//             const response = await axios.post(`${process.env.REACT_APP_API_URL}/save-products/`, transformedProducts, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
//                     "Content-Type": "application/json",
//                   }
//             });

//             // Log the API response for debugging
//             console.log('API Response:', response.data);

//             // Navigate on successful save
//             navigate("/seeBoard");
//         } catch (error) {
//             // Log error details for debugging
//             console.error('Error saving products:', error.response ? error.response.data : error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

// //
    

//     return (
//         <React.Fragment>
//             <div className="boardAccordion2">
//                 <div className="accordion-item2">
//                     <div className="accordion-header">
//                         <div className="header-title">
//                             <table className='table-responsive'>
//                                 <thead>
//                                     <tr>
//                                         <th className='w-5'>No</th>
//                                         <th className='w-65'>Description</th>
//                                         <th className='w-15'>Price</th>
//                                         {/* <th className='w-15'>Amount</th> */}
//                                     </tr>
//                                 </thead>
//                             </table>
//                         </div>
//                     </div>
//                     <div className="accordion-body">
//                         <table className='table-responsive'>
//                             <tbody>
//                                 {selectedProducts.map((product, index) => (
//                                     <tr key={product.id}>
//                                         <td className='w-5'><span>{index + 1}</span></td>
//                                         <td className='w-65'>{product.Title}</td>
//                                         <td className='w-15' ><span>$</span>{product.Price}</td>
//                                         {/* <td className='w-15'><span>$</span>{product.Amount}</td> */}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <div className="accordion-header-calculate">
//                             <div className="header-title-calculate">
//                                 <table className='calculate'>
//                                     <thead>
//                                         <tr>
//                                             <th className='w-5'>Total</th>
//                                             <th className='w-15'><span>$</span>{totalPrice}</th>
//                                             {/* <th className='w-15'><span>$</span>{totalAmount}</th> */}
//                                         </tr>
//                                     </thead>
//                                 </table>
//                             </div>
//                         </div>

//                         <div className="buttons">
//                             <button className="generate-image-btn" onClick={handleSave} disabled={loading}>
//                                 {loading ? 'Saving...' : 'Save'}
//                             </button>
//                             <button className="generate-image-btn" onClick={() => navigate("/seeBoard")}>
//                                 Back To Boards
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }

// export default BoardAccordion;




















import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.scss';

function BoardAccordion() {
    const location = useLocation();
    const { selectedProducts } = location.state || { selectedProducts: [] };
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    console.log("these are the selected products",selectedProducts)
    

    // Fetching data from localStorage
    const backgroundRemovedImages = localStorage.getItem("background_removed_images");
    const description = JSON.parse(localStorage.getItem("description") || '{}');
    const imageUrl = localStorage.getItem("generateImage");
    const selectedProductsfromlocal = localStorage.getItem("selectedProducts");

    const hexColors = selectedProducts
    .filter(item => item.Hex_Code) // Filter items with a Color field
    .map(item => item.Hex_Code) // Extract the Color field
    .join(', ');

    console.log("new selectedProducts", selectedProducts); // Outputs the array of hex color codes

    // Separate arrays for dimensions (height, width, depth)
    const heights = selectedProducts.map(product => product.height || '');
    const widths = selectedProducts.map(product => product.length || '');

    console.log('Heights:', heights);  // Outputs an array of heights
    console.log('length:', widths);  // Outputs an array of widths
    

    // Mapping titles with commas replaced (replace commas with an underscore or any other character)
    const titles = selectedProducts
        .map(product => product.Title.replace(/,/g, '_'))  // Replacing commas with underscores
        .join(', ');

    console.log('Mapped Titles:', titles);  // Outputs the comma-separated titles

    useEffect(() => {
        const calculateTotals = () => {
            const totalP = selectedProducts.reduce((acc, product) => {
                const price = product.Price ? parseFloat(product.Price.toString().replace(/,/g, '')) : 0;
                return acc + price;
            }, 0);

            const totalA = selectedProducts.reduce((acc, product) => {
                const amount = product.Amount ? parseFloat(product.Amount.toString().replace(/,/g, '')) : 0;
                return acc + amount;
            }, 0);

            setTotalPrice(totalP);
            setTotalAmount(totalA);
        };

        calculateTotals();
    }, [selectedProducts]);

    const handleSave = async () => {
        setLoading(true);
        try {
            
            const backgroundRemovedImagesStr = localStorage.getItem("background_removed_images");
            // let email = 'test@test.com'

            console.log('background image', backgroundRemovedImagesStr)
            
            const transformedProducts = [
                {
                  "title": titles,
                  "hex_code": hexColors,
                  "image_url": imageUrl,
                  "description": description.description,
                  "email": "Ibasafhjda@gmail.com",
                  "username": "Atif1cgc4 gee",
                  "background_removed_images": [
                    {"image_data": backgroundRemovedImages},
                  ],
                  "heights": heights,  // Adding separate heights array
                  "widths": widths,  // Adding separate widths array
                  "generated_titles": description.main_title  // Adding mapped titles with commas replaced
                }
              ];

            // Log the transformed products for debugging
            console.log('Transformed Products:', JSON.stringify(transformedProducts, null, 2));

            console.log('BOARDA ACCORDIAN JWT', localStorage.getItem("jwt"))

            // Send the request to the API
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/save-products/`, transformedProducts, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                  }
            });

            // Log the API response for debugging
            console.log('API Response:', response.data);

            // Navigate on successful save
            navigate("/seeBoard");
        } catch (error) {
            // Log error details for debugging
            console.error('Error saving products:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <div className="boardAccordion2">
                <div className="accordion-item2">
                    <div className="accordion-header">
                        <div className="header-title">
                            <table className='table-responsive'>
                                <thead>
                                    <tr>
                                        <th className='w-5'>No</th>
                                        <th className='w-65'>Description</th>
                                        <th className='w-15'>Price</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className="accordion-body">
                        <table className='table-responsive'>
                            <tbody>
                                {selectedProducts.map((product, index) => (
                                    <tr key={product.id}>
                                        <td className='w-5'><span>{index + 1}</span></td>
                                        <td className='w-65'>{product.Title}</td>
                                        <td className='w-15' ><span>$</span>{product.Price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="accordion-header-calculate">
                            <div className="header-title-calculate">
                                <table className='calculate'>
                                    <thead>
                                        <tr>
                                            <th className='w-5'>Total</th>
                                            <th className='w-15'><span>$</span>{totalPrice}</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        <div className="buttons">
                            <button className="generate-image-btn" onClick={handleSave} disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button className="generate-image-btn" onClick={() => navigate("/seeBoard")}>
                                Back To Boards
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BoardAccordion;
