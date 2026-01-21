import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';

const AddUser = () => {
    const [formData, setFormData] = useState({
        userGroup: '',
        name: '',
        username: '',
        password: '',
        mobile: '',
        email: '',
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', formData);
            setStatus({ type: 'success', message: 'User added successfully' });
            setFormData({
                userGroup: '',
                name: '',
                username: '',
                password: '',
                mobile: '',
                email: '',
            });
        } catch (err) {
            setStatus({ type: 'danger', message: 'Error adding user' });
        }
    };

    return (
        <AdminLayout>
            <Container className="py-4">
                <Card>
                    <Card.Body>
                        <h4 className="mb-4">Add User</h4>
                        {status && <Alert variant={status.type}>{status.message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>User Group</Form.Label>
                                        <Form.Select name="userGroup" value={formData.userGroup} onChange={handleChange} required>
                                            <option value="">-- Select a User Group --</option>
                                            <option value="Administrator">Administrator</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Guest">Guest</option>
                                        </Form.Select>

                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control name="username" value={formData.username} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control name="mobile" value={formData.mobile} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type="submit" className="mt-3">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default AddUser;
