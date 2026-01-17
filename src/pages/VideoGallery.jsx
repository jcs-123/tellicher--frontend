import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Ratio } from 'react-bootstrap';
import SideNavDownloads from '../components/SideNavDownloads';
import axios from 'axios';
import { motion } from 'framer-motion';

const VideoGallery = () => {
  const [videoItems, setVideoItems] = useState([]);

  useEffect(() => {
    axios.get('https://tellicheri.onrender.com/api/gallery?type=Video&status=Published')
      .then(res => setVideoItems(res.data))
      .catch(() => setVideoItems([]));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, type: 'spring' }
    })
  };

  return (
    <Container fluid className="py-4 px-4">
      <Row>
        <Col md={3} sm={12} className="mb-4">
          <SideNavDownloads />
        </Col>
        <Col md={9} sm={12}>
          <motion.h4
            className="fw-bold text-danger mb-4 text-uppercase"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Video Gallery
          </motion.h4>

          <Row className="gy-4">
            {videoItems.map((item, index) => (
              <Col key={index} md={6} sm={12}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <Card
                    className="video-card"
                    style={{
                      border: 'none',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    <Ratio aspectRatio="16x9">
                      <iframe
                        src={item.videoUrl}
                        title={item.title}
                        allowFullScreen
                        style={{ border: 'none' }}
                      />
                    </Ratio>
                    <Card.Body className="bg-light">
                      <h6 className="fw-bold text-primary">{item.title}</h6>
                      <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                        {new Date(item.eventDate).toLocaleDateString()}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoGallery;
