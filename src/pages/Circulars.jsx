import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import SideNavDownloads from '../components/SideNavDownloads';
import axios from 'axios';
import { motion } from 'framer-motion';

const Circulars = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCirculars();
  }, []);

  const fetchCirculars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/circulars');
      const activeCirculars = res.data?.filter(item => item.isActive) || [];
      setCirculars(activeCirculars);
    } catch (err) {
      console.error('Error fetching circulars:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Download Circular
    </Tooltip>
  );

  return (
    <Container fluid className="py-4 px-4">
      <Row>
        {/* Sidebar */}
        <Col md={3} sm={12} className="mb-4">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SideNavDownloads />
          </motion.div>
        </Col>

        {/* Main Content */}
        <Col md={9} sm={12}>
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="fw-bold mb-4 py-2 px-3 rounded text-white"
              style={{
                background: 'linear-gradient(135deg, #d9534f, #c9302c)',
                display: 'inline-block',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              Circulars
            </h3>
          </motion.div>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="danger" />
              <p className="mt-3">Loading circulars...</p>
            </div>
          ) : circulars.length === 0 ? (
            <p>No circulars available.</p>
          ) : (
            <Row xs={1} md={2} lg={2} className="g-4">
              {circulars.map((item, index) => (
                <Col key={item._id || index}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className="border-0 shadow-lg h-100"
                      style={{ borderRadius: '15px', backgroundColor: '#fdfdfd' }}
                    >
                      <Card.Body className="p-4 d-flex justify-content-between align-items-center">
                        <div className="me-3" style={{ flex: 1 }}>
                          <Card.Title
                            className="mb-0"
                            style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}
                          >
                            {item.title}
                          </Card.Title>
                        </div>
                        <OverlayTrigger placement="top" overlay={renderTooltip}>
                          <Button
                            variant="outline-danger"
                            href={`http://localhost:5000${item.fileUrl}`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px' }}
                          >
                            <FaDownload />
                          </Button>

                        </OverlayTrigger>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Circulars;
