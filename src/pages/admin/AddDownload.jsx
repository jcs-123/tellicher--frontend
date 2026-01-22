import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

const AddDownload = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Roopatha Website',
    file: null,
    displayOrder: '',
    status: 'Published',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('file', formData.file);
      data.append('displayOrder', formData.displayOrder);
      data.append('status', formData.status);

      const res = await axios.post('http://localhost:5000/api/downloads', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setShowSuccess(true);
      setFormData({
        title: '',
        category: 'Roopatha Website',
        file: null,
        displayOrder: '',
        status: 'Published',
      });
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation styles
  const fadeIn = {
    animation: 'fadeIn 0.5s ease-in',
    opacity: 1
  };

  const fadeInUp = (delay = 0) => ({
    animation: `fadeInUp 0.5s ease-out ${delay}s`,
    opacity: 0,
    animationFillMode: 'forwards'
  });

  const popIn = {
    animation: 'popIn 0.3s ease-out',
    opacity: 1
  };

  const slideDown = {
    animation: 'slideDown 0.3s ease-out',
    opacity: 1
  };

  const buttonHover = {
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
  };

  const submittingButton = {
    opacity: 0.8,
    transform: 'scale(0.98)'
  };

  // Keyframes as a style tag
  const keyframesStyle = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes popIn {
      0% {
        transform: scale(0.95);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <AdminLayout>
      <style>{keyframesStyle}</style>
      <Container fluid className="py-4">
        <h4 className="mb-3" style={fadeIn}>Add <span className="text-muted">Downloads</span></h4>

        {/* Success Alert */}
        {showSuccess && (
          <div 
            className="alert alert-success alert-dismissible fade show" 
            role="alert"
            style={slideDown}
          >
            Download uploaded successfully!
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowSuccess(false)} 
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Error Alert */}
        {showError && (
          <div 
            className="alert alert-danger alert-dismissible fade show" 
            role="alert"
            style={slideDown}
          >
            Upload failed! Please try again.
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowError(false)} 
              aria-label="Close"
            ></button>
          </div>
        )}

        <Form onSubmit={handleSubmit} className="bg-white shadow-sm p-4 rounded" style={fadeIn}>
          <Row className="mb-3" style={fadeInUp()}>
            <Form.Label column sm={2}>Category <span className="text-danger">*</span></Form.Label>
            <Col sm={10}>
              <Form.Select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required
                style={popIn}
              >
                <option>Roopatha Website</option>
                
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3" style={fadeInUp(0.1)}>
            <Form.Label column sm={2}>Title <span className="text-danger">*</span></Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter download title"
                required
                style={popIn}
              />
            </Col>
          </Row>

          <Row className="mb-3" style={fadeInUp(0.2)}>
            <Form.Label column sm={2}>File <span className="text-danger">*</span></Form.Label>
            <Col sm={10}>
              <Form.Control
                type="file"
                name="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
                style={popIn}
              />
            </Col>
          </Row>

          <Row className="mb-3" style={fadeInUp(0.3)}>
            <Form.Label column sm={2}>Display Order</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                style={popIn}
              />
            </Col>
          </Row>

          <Row className="mb-3" style={fadeInUp(0.4)}>
            <Form.Label column sm={2}>Status</Form.Label>
            <Col sm={10} className="d-flex align-items-center">
              <Form.Check
                type="radio"
                id="statusActive"
                name="status"
                value="Published"
                label="Active"
                checked={formData.status === 'Published'}
                onChange={handleChange}
                className="me-3"
                style={popIn}
              />
              <Form.Check
                type="radio"
                id="statusInactive"
                name="status"
                value="Pending"
                label="Inactive"
                checked={formData.status === 'Pending'}
                onChange={handleChange}
                style={popIn}
              />
            </Col>
          </Row>

          <Row style={fadeInUp(0.5)}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  ...buttonHover,
                  ...(isSubmitting ? submittingButton : {})
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : 'Submit'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default AddDownload;