import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const AddGallery = () => {
  const [formData, setFormData] = useState({
    category: 'Roopatha Website',
    type: '',
    title: '',
    description: '',
    location: '',
    thumbnail: null,
    images: [],
    videoUrl: '',
    eventDate: '',
    displayOrder: '',
    status: 'Published',
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    setFormData(prev => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleImagesChange = (e) => {
    setFormData(prev => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images' && formData.type === 'Image') {
        value.forEach((file) => submitData.append('images', file));
      } else if (key !== 'images') {
        submitData.append(key, value);
      }
    });

    try {
      await axios.post('https://tellicheri.onrender.com/api/gallery', submitData);
      setSubmitStatus({ type: 'success', message: 'Gallery added successfully!' });

      setFormData({
        category: 'Roopatha Website',
        type: '',
        title: '',
        description: '',
        location: '',
        thumbnail: null,
        images: [],
        videoUrl: '',
        eventDate: '',
        displayOrder: '',
        status: 'Published',
      });
    } catch (err) {
      setSubmitStatus({ type: 'danger', message: 'Failed to add gallery. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.1, when: "beforeChildren", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <AdminLayout>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Container fluid className="p-4">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h4 className="mb-4"><span className="text-primary">Add Gallery</span></h4>

                {submitStatus && (
                  <Alert variant={submitStatus.type} onClose={() => setSubmitStatus(null)} dismissible>
                    {submitStatus.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Gallery Category *</Form.Label>
                        <Form.Control type="text" name="category" value={formData.category} disabled />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Gallery Type *</Form.Label>
                        <Form.Select name="type" value={formData.type} onChange={handleChange} required>
                          <option value="">-- Select gallery type --</option>
                          <option value="Image">Image</option>
                          <option value="Video">Video</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Gallery Title *</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Gallery Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Location</Form.Label>
                        <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold d-flex align-items-center">
                          <FaCloudUploadAlt className="me-2" /> Thumbnail Image *
                        </Form.Label>
                        <Form.Control type="file" name="thumbnail" accept="image/*" onChange={handleThumbnailChange} required />
                        {formData.thumbnail && (
                          <div className="mt-2 text-success d-flex align-items-center">
                            <FaCheckCircle className="me-2" /><small>{formData.thumbnail.name}</small>
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    {formData.type === 'Image' && (
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold d-flex align-items-center">
                            <FaCloudUploadAlt className="me-2" /> Gallery Images *
                          </Form.Label>
                          <Form.Control type="file" name="images" accept="image/*" multiple onChange={handleImagesChange} required />
                          {formData.images.length > 0 && (
                            <div className="mt-2 text-success d-flex align-items-center">
                              <FaCheckCircle className="me-2" /><small>{formData.images.length} files selected</small>
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                    )}

                    {formData.type === 'Video' && (
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">Video Embed URL *</Form.Label>
                          <Form.Control
                            type="text"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            placeholder="Paste embed YouTube/Vimeo URL"
                            required
                          />
                        </Form.Group>
                      </Col>
                    )}

                    <Col md={2}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <FaCalendarAlt className="me-2" /> Event Date *
                        </Form.Label>
                        <Form.Control type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
                      </Form.Group>
                    </Col>

                    <Col md={1}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Order</Form.Label>
                        <Form.Control type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} />
                      </Form.Group>
                    </Col>

                    <Col md={1}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Status</Form.Label>
                        <Form.Check
                          type="radio"
                          name="status"
                          label="Published"
                          value="Published"
                          checked={formData.status === 'Published'}
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="radio"
                          name="status"
                          label="Pending"
                          value="Pending"
                          checked={formData.status === 'Pending'}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Gallery'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Container>
      </motion.div>
    </AdminLayout>
  );
};

export default AddGallery;
