import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Card, Badge, Form } from 'react-bootstrap';
import { FaDownload, FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileAlt, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Downloads.css'; // Your custom styles

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDownloads, setFilteredDownloads] = useState([]);

  useEffect(() => {
    fetchDownloads();
  }, []);

  useEffect(() => {
    const results = downloads.filter(download =>
      download.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (download.category && download.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredDownloads(results);
  }, [searchTerm, downloads]);

  const fetchDownloads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/downloads');
      setDownloads(res.data);
      setFilteredDownloads(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching downloads:', err);
      setError('Failed to load downloads. Please try again later.');
      setDownloads([]);
      setFilteredDownloads([]);
    } finally {
      setLoading(false);
    }
  };

  const getFileType = (url) => {
    if (!url) return '';
    const parts = url.split('.');
    return parts[parts.length - 1];
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return <FaFileAlt className="text-secondary" size={24} />;
    const type = fileType.toLowerCase();
    switch (type) {
      case 'pdf': return <FaFilePdf className="text-danger" size={24} />;
      case 'doc':
      case 'docx': return <FaFileWord className="text-primary" size={24} />;
      case 'xls':
      case 'xlsx': return <FaFileExcel className="text-success" size={24} />;
      case 'jpg':
      case 'png':
      case 'gif': return <FaFileImage className="text-warning" size={24} />;
      default: return <FaFileAlt className="text-secondary" size={24} />;
    }
  };

  const getFileColor = (fileType) => {
    if (!fileType) return 'file-icon-secondary';
    const type = fileType.toLowerCase();
    switch (type) {
      case 'pdf': return 'file-icon-danger';
      case 'doc':
      case 'docx': return 'file-icon-primary';
      case 'xls':
      case 'xlsx': return 'file-icon-success';
      case 'jpg':
      case 'png':
      case 'gif': return 'file-icon-warning';
      default: return 'file-icon-secondary';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="downloads-page">
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar-column p-0">
            <div className="sidebar-content">
              <h5 className="sidebar-header">ARCHDIOCESE OF THALASSERY</h5>
              <div className="sidebar-menu">
                <div className="sidebar-item active">Downloads</div>
              </div>
            </div>
          </Col>

          <Col md={9} className="main-content-column">
            <div className="content-header">
              <h2>Downloads</h2>
              <Form.Group className="search-box">
                <Form.Control
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </Form.Group>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading downloads...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : filteredDownloads.length > 0 ? (
              <Row className="downloads-grid">
                {filteredDownloads.map((item, index) => {
                  const fileType = getFileType(item.fileUrl);
                  return (
                    <Col key={item._id || index} md={6} lg={4} className="mb-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="download-card h-100">
                          <Card.Body className="d-flex flex-column">
                            <div className={`file-icon ${getFileColor(fileType)}`}>
                              {getFileIcon(fileType)}
                            </div>
                            <Card.Title className="mt-3">{item.title}</Card.Title>
                            {item.category && (
                              <Badge bg="light" text="dark" className="mb-2 align-self-start">
                                {item.category}
                              </Badge>
                            )}
                            <div className="download-footer mt-auto">
                              <small className="text-muted">{fileType.toUpperCase()}</small>
                              <motion.a
                                href={`http://localhost:5000${item.fileUrl}`}
                                download
                                whileHover={{ scale: 1.05 }}
                                className="download-btn"
                              >
                                <FaDownload className="me-1" /> Download
                              </motion.a>
                            </div>
                          </Card.Body>
                        </Card>
                      </motion.div>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <div className="empty-state text-center py-5">
                <FaFileAlt size={48} className="text-muted mb-3" />
                <h5>No files found</h5>
                <p className="text-muted">
                  {searchTerm ? 'Try a different search term' : 'No downloads available at this time'}
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Downloads;
