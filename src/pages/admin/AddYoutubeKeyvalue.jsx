import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AddYoutubeKeyvalue = () => {
  const [keyvalue, setKeyvalue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!keyvalue.trim()) {
      toast.warning('⚠️ Key value is required');
      return;
    }

    try {
      const res = await axios.post('https://tellicheri.onrender.com/api/youtube/update', { keyvalue });

      if (res.data.success) {
        toast.success('✅ YouTube key updated successfully!');
        setKeyvalue('');
      } else {
        toast.error('❌ Failed to update key. Try again.');
      }
    } catch (err) {
      console.error('API error:', err);
      toast.error('❌ Server error. Please try again later.');
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={1200} />

      <Row className="justify-content-center mt-4">
        <Col md={8} lg={6}>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <FaYoutube size={36} className="text-danger mb-2" />
                  <h5 className="fw-bold text-dark">Add YouTube Key</h5>
                  <p className="text-muted" style={{ fontSize: '14px' }}>
                    Enter your YouTube iframe key (e.g., `https://www.youtube.com/embed/xyz`)
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      YouTube Key Value <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={keyvalue}
                      placeholder="Enter YouTube Key (iframe URL or Video ID)"
                      onChange={(e) => setKeyvalue(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Example: <br />
                      <code>y9kqLOg6eaI</code>&nbsp;
                     from this <code> https://www.youtube.com/embed/y9kqLOg6eaI </code>
                    </Form.Text>
                  </Form.Group>


                  <div className="d-grid">
                    <Button variant="danger" type="submit">
                      Submit Key
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AddYoutubeKeyvalue;
