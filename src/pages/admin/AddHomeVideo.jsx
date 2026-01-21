import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AddHomeVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert('❌ Please choose a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    console.log('📤 Submitting:', videoFile.name);

    try {
      const res = await axios.post('http://localhost:5000/api/home-video/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setUploadSuccess(true);
        setVideoFile(null);
        setFileName('');
        e.target.reset(); // Reset the form
      } else {
        setUploadSuccess(false);
      }
    } catch (err) {
      console.error('❌ Upload error:', err.message);
      setUploadSuccess(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-3"
                  >
                    <FaUpload size={32} className="text-primary mb-2" />
                    <h5 className="fw-bold text-dark">Upload Home Page Video</h5>
                    <p className="text-muted" style={{ fontSize: '14px' }}>
                      MP4 format only — Max 10MB
                    </p>
                  </motion.div>

                  <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Choose Video File</Form.Label>
                      <Form.Control
                        type="file"
                        accept="video/mp4"
                        onChange={(e) => {
                          setVideoFile(e.target.files[0]);
                          setFileName(e.target.files[0]?.name || '');
                        }}
                        required
                      />
                      <AnimatePresence>
                        {fileName && (
                          <motion.small
                            className="text-success mt-1 d-block"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                          >
                            Selected: {fileName}
                          </motion.small>
                        )}
                      </AnimatePresence>
                    </Form.Group>

                    <div className="d-grid">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="success" type="submit">
                          Upload Video
                        </Button>
                      </motion.div>
                    </div>
                  </Form>

                  <AnimatePresence>
                    {uploadSuccess === true && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Alert variant="success" className="mt-3 mb-0">
                          ✅ Video uploaded successfully!
                        </Alert>
                      </motion.div>
                    )}
                    {uploadSuccess === false && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Alert variant="danger" className="mt-3 mb-0">
                          ❌ Upload failed. Please try again.
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default AddHomeVideo;
