import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddNews.css';

const AddNews = () => {
  const [newsData, setNewsData] = useState({
    category: '',
    type: '',
    title: '',
    description: '',
    image: null,
    file: null,
    publishedDate: '',
    validUpto: '',
    displayOrder: '',
    status: 'Published',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('category', newsData.category);
      formData.append('type', newsData.type);
      formData.append('title', newsData.title);
      formData.append('description', newsData.description);
      formData.append('publishedDate', newsData.publishedDate);
      formData.append('validUpto', newsData.validUpto);
      formData.append('displayOrder', newsData.displayOrder);
      formData.append('status', newsData.status);
      if (newsData.image) formData.append('image', newsData.image);
      if (newsData.file) formData.append('file', newsData.file);

      await axios.post('https://tellicheri.onrender.com/api/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('✅ News added successfully!');

      setNewsData({
        category: '',
        type: '',
        title: '',
        description: '',
        image: null,
        file: null,
        publishedDate: '',
        validUpto: '',
        displayOrder: '',
        status: 'Published',
      });
    } catch (err) {
      console.error('Error submitting news:', err);
      toast.error('❌ Failed to add news');
    }
  };

  return (
    <AdminLayout>
      <Container className="py-2">
        <h5 className="mb-4 fw-bold text-primary">
          Add <span className="text-muted">News</span>
        </h5>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>News Category *</Form.Label>
              <Form.Select
                name="category"
                value={newsData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Roopatha Website">Roopatha Website</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>News Type *</Form.Label>
              <Form.Select
                name="type"
                value={newsData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Image">Image</option>
                <option value="PDF">PDF</option>
                <option value="Video">Video</option>
                <option value="Flash">Flash</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>News Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title of news"
                value={newsData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>News Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter News Description"
                value={newsData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>News Image *</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>News File</Form.Label>
              <Form.Control type="file" name="file" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Published Date *</Form.Label>
              <Form.Control
                type="date"
                name="publishedDate"
                value={newsData.publishedDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Valid Upto</Form.Label>
              <Form.Control
                type="date"
                name="validUpto"
                value={newsData.validUpto}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Display Order</Form.Label>
              <Form.Control
                type="number"
                name="displayOrder"
                value={newsData.displayOrder}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Published"
                  type="radio"
                  name="status"
                  value="Published"
                  checked={newsData.status === 'Published'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Pending"
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={newsData.status === 'Pending'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <motion.button
              type="submit"
              className="btn btn-primary px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </Form>
        </motion.div>
      </Container>
    </AdminLayout>
  );
};

export default AddNews;
