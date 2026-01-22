import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCircular = () => {
  const [form, setForm] = useState({
    title: '',
    displayOrder: '',
    status: 'Active',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.file) {
      toast.warning('Please fill all required fields', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', form.title);
      data.append('file', form.file);
      data.append('displayOrder', form.displayOrder);
      data.append('isActive', form.status === 'Active');

      await axios.post('http://localhost:5000/api/circulars', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Success toast with custom styling
      toast.success('Circular added successfully!', {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: '#28a745',
          color: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        },
        progressStyle: {
          background: 'rgba(255,255,255,0.3)'
        }
      });

      setForm({ title: '', displayOrder: '', status: 'Active', file: null });
    } catch (err) {
      console.error(err);
      // Error toast with custom styling
      toast.error('Failed to add circular. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: '#dc3545',
          color: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        },
        progressStyle: {
          background: 'rgba(255,255,255,0.3)'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      {/* Toast Container - should be placed at the root level */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Container className="py-4" style={{ maxWidth: '800px' }}>
        <Card
          className="p-4 shadow-sm border-0"
          style={{
            borderRadius: '12px',
            animation: 'fadeIn 0.5s ease-out',
            background: 'rgba(255, 255, 255, 0.96)'
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes slideIn {
                from { opacity: 0; transform: translateX(-10px); }
                to { opacity: 1; transform: translateX(0); }
              }
            `}
          </style>

          <h4
            className="mb-4 fw-semibold"
            style={{
              color: '#2c3e50',
              animation: 'slideIn 0.4s ease-out'
            }}
          >
            Add <span style={{ color: '#7f8c8d' }}>Circular</span>
          </h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              style={{ animation: 'fadeIn 0.5s ease-out 0.1s forwards', opacity: 0 }}
            >
              <Form.Label style={{ fontWeight: '500' }}>
                Circular Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title of Circular"
                value={form.title}
                onChange={handleChange}
                required
                style={{
                  borderRadius: '8px',
                  padding: '10px 15px',
                  border: '1px solid #dfe6e9',
                  transition: 'all 0.3s ease'
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              style={{ animation: 'fadeIn 0.5s ease-out 0.2s forwards', opacity: 0 }}
            >
              <Form.Label style={{ fontWeight: '500' }}>
                Circular File <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                name="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileChange}
                required
                style={{
                  borderRadius: '8px',
                  padding: '8px',
                  border: '1px solid #dfe6e9',
                  transition: 'all 0.3s ease'
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              style={{ animation: 'fadeIn 0.5s ease-out 0.3s forwards', opacity: 0 }}
            >
              <Form.Label style={{ fontWeight: '500' }}>Display Order</Form.Label>
              <Form.Control
                type="text"
                name="displayOrder"
                placeholder="e.g. 1, 2, 3..."
                value={form.displayOrder}
                onChange={handleChange}
                style={{
                  borderRadius: '8px',
                  padding: '10px 15px',
                  border: '1px solid #dfe6e9',
                  transition: 'all 0.3s ease'
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-4"
              style={{ animation: 'fadeIn 0.5s ease-out 0.4s forwards', opacity: 0 }}
            >
              <Form.Label style={{ fontWeight: '500' }}>Status</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  inline
                  type="radio"
                  label="Active"
                  name="status"
                  value="Active"
                  checked={form.status === 'Active'}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="Inactive"
                  checked={form.status === 'Inactive'}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              style={{
                borderRadius: '8px',
                padding: '10px 24px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                transform: isSubmitting ? 'scale(0.98)' : 'none',
                opacity: isSubmitting ? 0.8 : 1,
                background: '#3498db',
                border: 'none',
                animation: 'fadeIn 0.5s ease-out 0.5s forwards'
              }}
            >

              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : 'Submit'}
            </Button>
          </Form>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default AddCircular;