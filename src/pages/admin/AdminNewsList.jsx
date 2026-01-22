import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import { Container, Table, Form, Row, Col, Button, Pagination, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminNewsList.css';

const AdminNewsList = () => {
    const [news, setNews] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filters, setFilters] = useState({ 
        publishedDate: '',
        validUpto: '',
        status: '',
        type: '',
        category: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [showModal, setShowModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/news')
            .then((res) => {
                setNews(res.data);
                setFiltered(res.data);
            })
            .catch((err) => {
                console.error('❌ Error fetching news:', err);
            });
    }, []);

    const handleFilter = () => {
        let filteredData = [...news];
        
        // Published Date filter
        if (filters.publishedDate) {
            const filterDate = new Date(filters.publishedDate).toDateString();
            filteredData = filteredData.filter(n => {
                const newsDate = new Date(n.publishedDate).toDateString();
                return newsDate === filterDate;
            });
        }
        
        // Valid Upto date filter
        if (filters.validUpto) {
            const filterDate = new Date(filters.validUpto).toDateString();
            filteredData = filteredData.filter(n => {
                if (!n.validUpto) return false;
                const newsDate = new Date(n.validUpto).toDateString();
                return newsDate === filterDate;
            });
        }
        
        // Status filter
        if (filters.status) {
            filteredData = filteredData.filter(n => n.status === filters.status);
        }
        
        // Type filter
        if (filters.type) {
            filteredData = filteredData.filter(n => n.type === filters.type);
        }
        
        // Category filter
        if (filters.category) {
            filteredData = filteredData.filter(n => n.category === filters.category);
        }
        
        setFiltered(filteredData);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setFilters({ 
            publishedDate: '',
            validUpto: '',
            status: '',
            type: '',
            category: ''
        });
        setFiltered(news);
        setCurrentPage(1);
    };

    const handlePublish = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/news/${id}/publish`);
            const updated = filtered.map(n => (n._id === id ? res.data.news : n));
            setFiltered(updated);
            toast.success('✅ News published successfully!');
        } catch (err) {
            console.error('❌ Error publishing:', err);
            toast.error('❌ Failed to publish news');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const openModal = (newsItem) => {
        setSelectedNews(newsItem);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedNews(null);
    };

    return (
        <AdminLayout>
            <Container fluid="md" className="py-3 px-3 px-md-4">
                <motion.h5 className="mb-3 mb-md-4 fw-bold text-primary" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    News <span className="text-muted">List</span>
                </motion.h5>

                <motion.div className="mb-3 mb-md-4 shadow-sm bg-white p-2 p-md-3 rounded" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                    <Form>
                        <Row className="g-2 align-items-end">
                            {/* Published Date Filter */}
                            <Col xs={12} sm={6} md={3}>
                                <Form.Label className="small text-muted">Published Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={filters.publishedDate}
                                    onChange={(e) => setFilters({ ...filters, publishedDate: e.target.value })}
                                    className="mb-2 mb-md-0"
                                />
                            </Col>
                            
                            {/* Valid Upto Date Filter */}
                            <Col xs={12} sm={6} md={3}>
                                <Form.Label className="small text-muted">Valid Upto Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={filters.validUpto}
                                    onChange={(e) => setFilters({ ...filters, validUpto: e.target.value })}
                                    className="mb-2 mb-md-0"
                                />
                            </Col>
                            
                            {/* Status Filter */}
                            <Col xs={6} sm={4} md={2}>
                                <Form.Label className="small text-muted">Status</Form.Label>
                                <Form.Select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    className="mb-2 mb-md-0"
                                >
                                    <option value="">All Status</option>
                                    <option value="Published">Published</option>
                                    <option value="Pending">Pending</option>
                                </Form.Select>
                            </Col>
                            
                            {/* Type Filter */}
                            <Col xs={6} sm={4} md={2}>
                                <Form.Label className="small text-muted">Type</Form.Label>
                                <Form.Select
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                    className="mb-2 mb-md-0"
                                >
                                    <option value="">All Types</option>
                                    <option value="Image">Image</option>
                                    <option value="PDF">PDF</option>
                                    <option value="Video">Video</option>
                                    <option value="Flash">Flash</option>
                                </Form.Select>
                            </Col>
                            
                            {/* Category Filter */}
                            <Col xs={6} sm={4} md={2}>
                                <Form.Label className="small text-muted">Category</Form.Label>
                                <Form.Select
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                    className="mb-2 mb-md-0"
                                >
                                    <option value="">All Categories</option>
                                    <option value="Roopatha Website">Roopatha Website</option>
                                    <option value="Circular">Circular</option>
                                </Form.Select>
                            </Col>
                            
                            {/* Action Buttons */}
                            <Col xs={6} sm={6} md={2} className="d-flex gap-1">
                                <Button
                                    variant="primary"
                                    onClick={handleFilter}
                                    className="flex-grow-1"
                                    style={{ height: 'calc(100% - 0.5rem)' }}
                                >
                                    <i className="bi bi-search me-1"></i> Search
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleResetFilters}
                                    className="flex-grow-1"
                                    style={{ height: 'calc(100% - 0.5rem)' }}
                                >
                                    <i className="bi bi-arrow-counterclockwise"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </motion.div>

                {/* Rest of the component remains the same */}
                <motion.div className="table-responsive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
                    <Table striped bordered hover className="bg-white shadow-sm">
                        <thead>
                            <tr>
                                <th className="text-nowrap">Sl No</th>
                                <th>News</th>
                                <th className="d-none d-md-table-cell">Category</th>
                                <th className="d-none d-sm-table-cell">Type</th>
                                <th>Published Date</th>
                                <th>Valid Upto</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? currentItems.map((item, index) => (
                                <motion.tr key={item._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td className="text-truncate" style={{ maxWidth: '150px' }} title={item.title}>
                                        {item.title}
                                    </td>
                                    <td className="d-none d-md-table-cell">{item.category}</td>
                                    <td className="d-none d-sm-table-cell">{item.type}</td>
                                    <td>{new Date(item.publishedDate).toLocaleDateString()}</td>
                                    <td>{item.validUpto ? new Date(item.validUpto).toLocaleDateString() : '--'}</td>
                                    <td>
                                        <span className={`badge ${item.status === 'Published' ? 'bg-success' : 'bg-warning'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="d-flex gap-1 flex-wrap">
                                        <Button size="sm" variant="info" onClick={() => openModal(item)} className="px-2">
                                            <i className="bi bi-eye-fill d-md-none"></i>
                                            <span className="d-none d-md-inline">View</span>
                                        </Button>
                                        {item.status === 'Pending' ? (
                                            <Button size="sm" variant="success" onClick={() => handlePublish(item._id)} className="px-2">
                                                <i className="bi bi-check-circle-fill d-md-none"></i>
                                                <span className="d-none d-md-inline">Publish</span>
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="outline-secondary" disabled className="px-2">
                                                <i className="bi bi-check2-all d-md-none"></i>
                                                <span className="d-none d-md-inline">Published</span>
                                            </Button>
                                        )}
                                    </td>
                                </motion.tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">No news available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </motion.div>

                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination className="flex-wrap">
                            <Pagination.Prev
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            />

                            {currentPage > 3 && (
                                <Pagination.Item onClick={() => setCurrentPage(1)}>1</Pagination.Item>
                            )}
                            {currentPage > 4 && <Pagination.Ellipsis />}

                            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                                const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + idx;
                                if (page > totalPages) return null;
                                return (
                                    <Pagination.Item
                                        key={page}
                                        active={page === currentPage}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Pagination.Item>
                                );
                            })}

                            {currentPage < totalPages - 3 && <Pagination.Ellipsis />}
                            {currentPage < totalPages - 2 && (
                                <Pagination.Item onClick={() => setCurrentPage(totalPages)}>
                                    {totalPages}
                                </Pagination.Item>
                            )}

                            <Pagination.Next
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            />
                        </Pagination>
                    </div>
                )}

                {/* View Modal */}
                <Modal show={showModal} onHide={closeModal} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>News Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedNews && (
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 className="text-primary">{selectedNews.title}</h5>
                                    <p><strong>Category:</strong> {selectedNews.category}</p>
                                    <p><strong>Type:</strong> {selectedNews.type}</p>
                                    <p><strong>Status:</strong>
                                        <span className={`badge ${selectedNews.status === 'Published' ? 'bg-success' : 'bg-warning'} ms-2`}>
                                            {selectedNews.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Published:</strong> {new Date(selectedNews.publishedDate).toLocaleDateString()}</p>
                                    <p><strong>Valid Upto:</strong> {selectedNews.validUpto ? new Date(selectedNews.validUpto).toLocaleDateString() : '--'}</p>
                                    {selectedNews.description && (
                                        <div className="mb-3">
                                            <strong>Description:</strong>
                                            <p className="text-muted">{selectedNews.description}</p>
                                        </div>
                                    )}
                                </div>

                                {(selectedNews.image || selectedNews.file) && (
                                    <div className="col-12 mt-3">
                                        {selectedNews.image && (
                                            <div className="mb-3">
                                                <strong>Image:</strong>
                                                <div className="ratio ratio-16x9 bg-light mt-2">
                                                    <img
                                                        src={`http://localhost:5000/uploads/${selectedNews.image}`}
                                                        alt="news"
                                                        className="img-fluid object-fit-contain"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {selectedNews.file && (
                                            <div className="mb-2">
                                                <strong>PDF File:</strong><br />
                                                <a
                                                    href={`http://localhost:5000/uploads/${selectedNews.file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-primary btn-sm mt-2"
                                                >
                                                    <i className="bi bi-download me-1"></i> Download File
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* Toast */}
                <ToastContainer position="top-right" autoClose={800} />
            </Container>
        </AdminLayout>
    );
};

export default AdminNewsList;