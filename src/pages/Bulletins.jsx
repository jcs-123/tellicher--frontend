import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Modal, Pagination } from 'react-bootstrap';
import SideNavDownloads from '../components/SideNavDownloads';
import { motion } from 'framer-motion';
import { FiDownload, FiBookOpen, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Bulletins = () => {
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBulletin, setSelectedBulletin] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchBulletins = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bulletins/public');
        const data = await res.json();
        setBulletins(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bulletins:', error);
        setLoading(false);
      }
    };

    fetchBulletins();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bulletins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bulletins.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openBulletin = (bulletin) => {
    setSelectedBulletin(bulletin);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  const cardHover = {
    scale: 1.02,
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    transition: { type: 'spring', stiffness: 300 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container fluid className="py-4 px-4">
        <Row>
          <Col md={3} sm={12} className="mb-4">
            <SideNavDownloads />
          </Col>

          <Col md={9} sm={12}>
            <motion.div variants={itemVariants}>
              <h4 className="fw-bold text-danger mb-4 text-uppercase d-flex align-items-center" style={{ fontSize: '20px' }}>
                <FiBookOpen className="me-2" size={24} />
                Archdiocesan Monthly Bulletin
              </h4>
            </motion.div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
                <p className="mt-3">Loading bulletins...</p>
              </div>
            ) : (
              <>
                <Row className="gy-4">
                  {currentItems.map((item, index) => (
                    <Col key={index} lg={3} md={4} sm={6} xs={12}>
                      <motion.div variants={itemVariants} whileHover={cardHover} whileTap={{ scale: 0.98 }}>
                        <Card
                          className="h-100"
                          style={{
                            border: '1px solid #dc3545',
                            borderRadius: '10px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                            cursor: 'pointer',
                          }}
                          onClick={() => openBulletin(item)}
                        >
                          <div style={{
                            height: '240px',
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            padding: '8px',
                          }}>
                            <Card.Img
                              variant="top"
                              src={`http://localhost:5000${item.coverImageUrl}`}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => (e.target.src = '/placeholder.png')}
                            />
                          </div>
                          <Card.Body className="text-center px-2 py-2">
                            <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '14px', minHeight: '20px' }}>
                              {item.title}
                            </h6>
                            <div className="text-center text-muted mb-2" style={{ fontSize: '12px' }}>
                              <strong>{item.month} {item.year}</strong>
                            </div>
                            <div className="d-flex justify-content-center gap-2 mt-2">
                              <button
                                className="btn btn-sm"
                                style={{
                                  backgroundColor: '#fff',
                                  border: '1px solid #dc3545',
                                  color: '#dc3545',
                                  fontSize: '12px',
                                  padding: '3px 10px'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`http://localhost:5000${item.fileUrl}`, '_blank');
                                }}
                              >
                                Read Now
                              </button>
                              <button
                                className="btn btn-sm ms-1"
                                style={{
                                  backgroundColor: '#dc3545',
                                  border: '1px solid #dc3545',
                                  color: '#fff',
                                  fontSize: '12px',
                                  padding: '3px 10px'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.location.href = `http://localhost:5000${item.fileUrl}`;
                                }}
                              >
                                Download
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {bulletins.length > itemsPerPage && (
                  <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                      <Pagination.Prev
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <FiChevronLeft />
                      </Pagination.Prev>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <Pagination.Item
                          key={number}
                          active={number === currentPage}
                          onClick={() => paginate(number)}
                        >
                          {number}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <FiChevronRight />
                      </Pagination.Next>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>

        {/* Modal */}
        <Modal show={showModal} onHide={closeModal} size="lg" centered>
          <Modal.Header closeButton style={{ borderBottom: '2px solid #dc3545' }}>
            <Modal.Title className="text-danger">
              {selectedBulletin?.title} - {selectedBulletin?.month} {selectedBulletin?.year}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: '70vh' }}>
            {selectedBulletin && (
              <iframe
                src={`http://localhost:5000${selectedBulletin.fileUrl}`}
                title={selectedBulletin.title}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            )}
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '2px solid #dc3545' }}>
            <button
              className="btn btn-danger d-flex align-items-center"
              onClick={() => window.location.href = `http://localhost:5000${selectedBulletin?.fileUrl}`}
            >
              <FiDownload className="me-1" /> Download
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </motion.div>
  );
};

export default Bulletins;
