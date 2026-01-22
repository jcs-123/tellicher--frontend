import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SideNavDownloads from '../components/SideNavDownloads';
import { FaArrowLeft } from 'react-icons/fa';

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/gallery/${id}`);
        setGallery(response.data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [id]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const hoverEffect = {
    scale: 1.02,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    transition: { duration: 0.3 }
  };

  const handleImageError = (e) => {
    e.target.src = '/placeholder-image.jpg';
    e.target.className = 'gallery-image bg-light';
    e.target.alt = 'Image not available';
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <h5 className="text-danger">Error Loading Gallery</h5>
        <p className="text-muted">{error}</p>
        <Button variant="outline-danger" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Container>
    );
  }

  if (!gallery) {
    return (
      <Container className="text-center py-5">
        <h5 className="text-muted">Gallery not found</h5>
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Back to Gallery
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4 px-4 gallery-detail-container">
      <Row>
        {/* Sidebar */}
        <Col md={3} sm={12} className="mb-4">
          <SideNavDownloads />
        </Col>

        {/* Main Content */}
        <Col md={9} sm={12}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold text-dark mb-0">
                <span className="border-bottom border-3 border-danger pb-1">
                  {gallery.title}
                </span>
              </h2>
              <Button 
                variant="outline-danger" 
                onClick={() => navigate(-1)}
                className="d-flex align-items-center"
              >
                <FaArrowLeft className="me-2" /> Back to Gallery
              </Button>
            </div>

            {gallery.description && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted mb-4" 
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {gallery.description}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Row className="gy-4 gx-3">
              <AnimatePresence>
                {gallery.imageUrls.map((url, idx) => (
                  <Col md={4} sm={6} xs={12} key={idx}>
                    <motion.div
                      variants={item}
                      whileHover={hoverEffect}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="image-container">
                        <Image
                          src={`http://localhost:5000${url}`}
                          className="gallery-image"
                          alt={`Gallery image ${idx + 1}`}
                          onError={handleImageError}
                          loading="lazy"
                          thumbnail
                        />
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </AnimatePresence>
            </Row>
          </motion.div>
        </Col>
      </Row>

      <style jsx>{`
        .gallery-detail-container {
          background-color: #f8f9fa;
        }
        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          height: 0;
          padding-bottom: 100%; /* Square aspect ratio (1:1) */
        }
        .gallery-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .gallery-image:hover {
          transform: scale(1.03);
        }
        .btn-outline-danger {
          border-width: 2px;
          font-weight: 500;
        }
      `}</style>
    </Container>
  );
};

export default GalleryDetail;