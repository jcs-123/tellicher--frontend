import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { FaDownload, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SideNavDownloads from '../components/SideNavDownloads';
import axios from 'axios';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const LiturgicalCalendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [filteredCalendars, setFilteredCalendars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchCalendars = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('https://tellicheri.onrender.com/api/website-links?pageType=Liturgical Calendar');
      setCalendars(res.data);
      setFilteredCalendars(res.data);
      setError(null);
      setToastMessage('Calendars loaded successfully!');
      setShowToast(true);
    } catch (err) {
      console.error('Failed to fetch calendars:', err.message);
      setError('Failed to load calendars. Please try again later.');
      setToastMessage('Error loading calendars.');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCalendars(calendars);
    } else {
      const filtered = calendars.filter(calendar =>
        calendar.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCalendars(filtered);
    }
  }, [searchTerm, calendars]);

  return (
    <Container fluid className="px-lg-5 px-md-3 px-2 py-4">
      <Row className="g-4">
        {/* Sidebar */}
        <Col lg={3} md={4} className="d-none d-md-block">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <SideNavDownloads />
          </motion.div>
        </Col>

        {/* Main Content */}
        <Col lg={9} md={8} xs={12}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
              <div className="d-flex align-items-center mb-3 mb-md-0">
                <FaCalendarAlt className="text-danger me-3" size={28} />
                <h3 className="fw-bold mb-0 text-uppercase">Liturgical Calendar</h3>
              </div>

              <div className="position-relative w-50 w-md-auto">
                <FaSearch className="position-absolute top-50 start-3 translate-middle-y text-muted ms-2" />
                <input
                  type="text"
                  placeholder="Search calendars..."
                  className="form-control ps-5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
                <p className="mt-3">Loading calendars...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger d-flex justify-content-between align-items-center">
                {error}
                <button className="btn btn-sm btn-outline-danger" onClick={fetchCalendars}>
                  Retry
                </button>
              </div>
            ) : filteredCalendars.length === 0 ? (
              <div className="text-center py-5">
                <FaCalendarAlt className="text-muted mb-3" size={48} />
                <h5 className="text-muted">
                  {searchTerm ? 'No matching calendars found' : 'No calendar files available'}
                </h5>
                {searchTerm && (
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Row className="g-3">
                    {filteredCalendars.map((item) => (
                      <Col key={item._id} sm={12} md={6} lg={6}>
                        <motion.div
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Card className="shadow-sm h-100 hover-shadow-sm">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="bg-light-danger rounded-circle p-3 me-3">
                                  <FaCalendarAlt className="text-danger" />
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-semibold">{item.title}</h6>
                                  <small className="text-muted">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                              <a
                                href={item.webLink}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-danger"
                              >
                                <FaDownload className="me-1" /> Download
                              </a>
                            </Card.Body>
                          </Card>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </Col>
      </Row>

      {/* Toast Message */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={error ? 'danger' : 'success'}
        >
          <Toast.Header>
            <strong className="me-auto">{error ? 'Error' : 'Success'}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default LiturgicalCalendar;
