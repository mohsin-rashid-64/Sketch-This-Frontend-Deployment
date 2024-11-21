import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./HelpCenterModal.scss";

const HelpCenterModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered className="help-center-modal">
            <Modal.Header closeButton>
                <Modal.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{fontSize: '27px', fontWeight: '400'}}>Fill the Form Below</h1>
                    <h1 className="close-btn" onClick={handleClose}>x</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding: '5px 30px 5px 30px ' }}>
                <Form >
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="your name" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="your email" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col md={6}>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="your phone" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formSubject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="text" placeholder="your subject" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formMessage" className="mt-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Send Message</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default HelpCenterModal;
