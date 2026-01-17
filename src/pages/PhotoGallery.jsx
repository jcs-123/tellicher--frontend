import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Image } from 'react-bootstrap';
import { FaCalendarAlt, FaCamera, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SideNavDownloads from '../components/SideNavDownloads';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PhotoGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://tellicheri.onrender.com/api/gallery?type=Image&status=Published');
        setGalleryItems(response.data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery. Please try again later.');
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredItems = galleryItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 120,
        damping: 10
      } 
    }
  };

  const hoverEffect = {
    scale: 1.03,
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
    transition: { duration: 0.3 }
  };

  const imageHoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };

  const handleImageError = (e) => {
    e.target.src = '/placeholder-image.jpg';
    e.target.className = 'gallery-image bg-light';
    e.target.alt = 'Image not available';
  };

  return (
    <Container fluid className="py-4 px-4 gallery-container">
      <Row>
        <Col md={3} sm={12} className="mb-4">
          <SideNavDownloads />
        </Col>
        
        <Col md={9} sm={12}>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold text-dark mb-0">
                <span className="border-bottom border-3 border-danger pb-1">Photo Gallery</span>
              </h4>
              
              <div className="search-box position-relative">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search galleries..."
                  className="form-control ps-4 border-secondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-5"
            >
              <FaExclamationTriangle className="text-danger mb-3" size={48} />
              <h5 className="text-danger mb-3">Error Loading Gallery</h5>
              <p className="text-muted">{error}</p>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </motion.div>
          ) : loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" size="sm" />
              <p className="mt-2 text-muted small">Loading galleries...</p>
            </div>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-5"
                >
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                    alt="No galleries found" 
                    style={{ width: '100px', opacity: 0.6 }} 
                  />
                  <h6 className="mt-3 text-muted">No galleries found</h6>
                  {searchTerm && (
                    <button 
                      className="btn btn-sm btn-outline-danger mt-2"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear search
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="gallery-grid"
                >
                  <Row className="g-3">
                    <AnimatePresence>
                      {filteredItems.map((galleryItem) => (
                        <Col key={galleryItem._id} xl={3} lg={4} md={6} sm={6} xs={12}>
                          <motion.div
                            variants={item}
                            whileHover={hoverEffect}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className="gallery-card cursor-pointer h-100 border border-light"
                              onClick={() => navigate(`/photo-gallery/${galleryItem._id}`)}
                            >
                              <motion.div 
                                className="image-container"
                                whileHover={imageHoverEffect}
                              >
                                <Image
                                  src={`https://tellicheri.onrender.com${galleryItem.thumbnailUrl}`}
                                  className="gallery-image"
                                  alt={galleryItem.title}
                                  onError={handleImageError}
                                  loading="lazy"
                                />
                                <div className="image-overlay">
                                  <span className="badge bg-dark bg-opacity-75 small">
                                    <FaCamera className="me-1" /> {galleryItem.imageUrls?.length || 0}
                                  </span>
                                </div>
                              </motion.div>
                              <Card.Body className="p-3">
                                <h6 className="fw-bold text-dark mb-1 text-truncate">{galleryItem.title}</h6>
                                <div className="d-flex align-items-center text-muted small">
                                  <FaCalendarAlt className="me-2 text-danger" style={{ fontSize: '0.8rem' }} />
                                  <span>{new Date(galleryItem.eventDate).toLocaleDateString()}</span>
                                </div>
                              </Card.Body>
                            </Card>
                          </motion.div>
                        </Col>
                      ))}
                    </AnimatePresence>
                  </Row>
                </motion.div>
              )}
            </>
          )}
        </Col>
      </Row>

      <style jsx>{`
        .gallery-container {
          background-color: #f8f9fa;
        }
        .gallery-card {
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid #e9ecef !important;
        }
        .gallery-card:hover {
          border-color: #dc3545 !important;
        }
        .image-container {
          position: relative;
          overflow: hidden;
          background-color: #f1f1f1;
          height: 200px; /* Fixed height for all images */
          width: 100%;
        }
        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .image-overlay {
          position: absolute;
          bottom: 8px;
          right: 8px;
          opacity: 0.9;
        }
        .search-box {
          width: 250px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 10px;
          color: #6c757d;
          font-size: 0.9rem;
        }
        .search-box input {
          font-size: 0.9rem;
          height: 36px;
        }
      `}</style>
    </Container>
  );
};

export default PhotoGallery;