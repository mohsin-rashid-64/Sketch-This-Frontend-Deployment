import { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import './EditProfile.scss';
import AOS from 'aos';
function EditProfile() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        user_name: '',
        image: ''
    });

    let navigate = useNavigate();

    useEffect(() => {
        AOS.init();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 200; // Set canvas dimensions as needed
                canvas.height = 200;
                ctx.drawImage(img, 0, 0, 200, 200); // Draw image onto canvas
                const dataUrl = canvas.toDataURL('image/png'); // Convert canvas to base64 data URL
                setFormData({ ...formData, image: dataUrl }); // Set formData with base64 image
            };
            img.src = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file); // Read file as data URL
        }
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/account-management', { state: { formData } });
    };

    return (
        <>
            <Navbar />
            <div className="editProfile">
                <div className="container">
                    <div className="card">
                        <div className="cardInner">
                            <div className="user" data-aos="fade-up" data-aos-duration="1000">
                                {formData.image ? (
                                    <img src={formData.image} alt="user" style={{ width: '200px', height: '200px' }} />
                                ) : (
                                    <img src="/images/usera.svg" alt="user" style={{ width: '200px', height: '200px' }} />
                                )}
                                <div className="camera">
                                    <label htmlFor="imageUpload">
                                        <img src="/images/camera.svg" alt="camera" />
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="first_name">First Name</label>
                                            <input
                                                type="text"
                                                id="first_name"
                                                placeholder="John"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input
                                                type="text"
                                                id="last_name"
                                                placeholder="Doe"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div data-aos="fade-down" data-aos-duration="1000" className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="user_name">User Name</label>
                                            <input
                                                type="text"
                                                id="user_name"
                                                placeholder=""
                                                value={formData.user_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end" data-aos="fade-down" data-aos-duration="1000">
                                    <button type="submit" className="seeAll">Save <img src="/images/arrowRight.svg" alt="arrowRight" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EditProfile;
