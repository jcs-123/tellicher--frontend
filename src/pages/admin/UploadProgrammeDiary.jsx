import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import { FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UploadProgrammeDiary = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('❌ Please choose a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const res = await axios.post('https://tellicheri.onrender.com/api/programme-diary/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setUploadSuccess(true);
        setFile(null);
        setFileName('');
        e.target.reset();
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
      <div className="container py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FaFilePdf size={40} className="text-danger mb-2" />
                    </motion.div>
                    <h5 className="fw-bold text-dark">Upload Programme Diary</h5>
                    <p className="text-muted" style={{ fontSize: '14px' }}>
                      Upload PDF only (Max: 5MB)
                    </p>
                  </div>

                  <Form onSubmit={handleUpload} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Choose PDF File</Form.Label>
                      <Form.Control
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          setFileName(e.target.files[0]?.name || '');
                        }}
                        required
                      />
                      {fileName && (
                        <small className="text-success mt-1 d-block">📄 Selected: {fileName}</small>
                      )}
                    </Form.Group>

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <div className="d-grid">
                        <Button variant="danger" type="submit">
                          Upload Diary
                        </Button>
                      </div>
                    </motion.div>
                  </Form>

                  {uploadSuccess === true && (
                    <Alert variant="success" className="mt-3 mb-0 text-center">
                      ✅ Diary uploaded successfully!
                    </Alert>
                  )}
                  {uploadSuccess === false && (
                    <Alert variant="danger" className="mt-3 mb-0 text-center">
                      ❌ Upload failed. Please try again.
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default UploadProgrammeDiary;
