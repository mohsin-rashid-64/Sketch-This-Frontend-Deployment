import React,{useEffect , useState} from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import Modal from 'react-bootstrap/Modal';
function Footer() {
    useEffect(() => {
        AOS.init();
    }, [])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <div className="footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6" data-aos="fade-right"
    data-aos-duration="1000">
                    <img className='logo' src="/images/logo.png" alt="logo" />
                    <p>Your one stop destination for all your home design needs.  Make your home a reflection of you.</p>
                    <div className="social">
                        <Link to=""><img src="/images/social1.svg" alt="socialIcon" /></Link>
                        <Link to=""><img src="/images/social2.svg" alt="socialIcon" /></Link>
                        <Link to=""><img src="/images/social3.svg" alt="socialIcon" /></Link>
                        <Link to=""><img src="/images/social4.svg" alt="socialIcon" /></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-6" data-aos="fade-down"
    data-aos-duration="1000">
                    <div className="links">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="">How It Works</Link></li>
                            <li><Link to="">Membership</Link></li>
                            <li><Link to="">Blog</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-6" data-aos="fade-left"
    data-aos-duration="1000">
                <div className="links">
                        <h4>For You</h4>
                        <ul>
                            <li><Link to="">Terms of use</Link></li>
                            <li><button onClick={handleShow}>Contact us</button></li>
                            <li><Link to="">About Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="block">
            <h4>Fill the Form Below</h4> 
            <img onClick={handleClose} src="/images/close.svg" alt="close" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Your Name" />
                </div>
              </div>
              <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Your Email" />
                </div>
              </div>
              <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="number" name="phone" id="phone" placeholder="Your Phone" />
                </div>
              </div>
              <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" placeholder="Enter Subject" />
                </div>
              </div>
              <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" placeholder='Enter Your Message'></textarea>
                </div>
              </div>
              <div className="col-lg-12">
              <button>Send Message</button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default Footer
