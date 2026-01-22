import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, InputGroup, Badge, Spinner, Pagination, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { BiSearch, BiUpload, BiReset, BiFilterAlt, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import AdminLayout from '../../layouts/AdminLayout';
import './AdminList.css';

const filterColors = {
    submenu: 'primary',
    category: 'success',
    headType: 'warning',
    search: 'info'
};

const AdminList = () => {
    const [administrationData, setAdministrationData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubMenu, setSelectedSubMenu] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedHeadType, setSelectedHeadType] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Image upload modal state
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/administration');
                if (!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();
                setAdministrationData(data);
                setFilteredData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle image upload
    const handleUpload = async () => {
        if (!selectedFile || !selectedItem) return;

        setUploading(true);
        setUploadError('');

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('id', selectedItem._id);

            const response = await fetch('http://localhost:5000/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();

            // Update the local state with the new image
            const updatedData = administrationData.map(item => {
                if (item._id === selectedItem._id) {
                    return { ...item, imageUrl: result.imageUrl };
                }
                return item;
            });

            setAdministrationData(updatedData);
            setFilteredData(updatedData);
            setShowUploadModal(false);
            setSelectedFile(null);
            setPreviewImage(null);
        } catch (err) {
            setUploadError(err.message);
        } finally {
            setUploading(false);
        }
    };

    // Open upload modal
    const openUploadModal = (item) => {
        setSelectedItem(item);
        setShowUploadModal(true);
        setSelectedFile(null);
        setPreviewImage(null);
        setUploadError('');
    };

    // Filter logic
    useEffect(() => {
        let result = administrationData.filter((item) => {
            return Object.values(item).some((val) =>
                val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

        const filters = [];

        if (selectedSubMenu) {
            result = result.filter(item => item.submenu === selectedSubMenu);
            filters.push({ type: 'submenu', value: selectedSubMenu });
        }

        if (selectedCategory) {
            result = result.filter(item => item.category === selectedCategory);
            filters.push({ type: 'category', value: selectedCategory });
        }

        if (selectedHeadType) {
            result = result.filter(item => item.headType === selectedHeadType);
            filters.push({ type: 'headType', value: selectedHeadType });
        }

        if (searchQuery) {
            filters.push({ type: 'search', value: searchQuery });
        }

        setActiveFilters(filters);
        setFilteredData(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchQuery, selectedSubMenu, selectedCategory, selectedHeadType, administrationData]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedSubMenu('');
        setSelectedCategory('');
        setSelectedHeadType('');
        setCurrentPage(1);
    };

    const removeFilter = (filterType) => {
        switch (filterType) {
            case 'submenu': setSelectedSubMenu(''); break;
            case 'category': setSelectedCategory(''); break;
            case 'headType': setSelectedHeadType(''); break;
            case 'search': setSearchQuery(''); break;
            default: break;
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        let startPage, endPage;

        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxVisibleBeforeCurrent = Math.floor(maxVisiblePages / 2);
            const maxVisibleAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

            if (currentPage <= maxVisibleBeforeCurrent) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (currentPage + maxVisibleAfterCurrent >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxVisibleBeforeCurrent;
                endPage = currentPage + maxVisibleAfterCurrent;
            }
        }

        // Previous button
        items.push(
            <Pagination.Prev
                key="prev"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                <BiChevronLeft />
            </Pagination.Prev>
        );

        // First page
        if (startPage > 1) {
            items.push(
                <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
                    1
                </Pagination.Item>
            );
            if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="start-ellipsis" />);
            }
        }

        // Page numbers
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            }
            items.push(
                <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => paginate(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            );
        }

        // Next button
        items.push(
            <Pagination.Next
                key="next"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                <BiChevronRight />
            </Pagination.Next>
        );

        return items;
    };

    return (
        <AdminLayout>
            <Container fluid className="mt-4">
                <Row className="mb-3">
                    <Col>
                        <motion.h5 className="fw-bold text-primary" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            Administration <span className="text-muted">List</span>
                        </motion.h5>
                    </Col>
                </Row>

                {activeFilters.length > 0 && (
                    <motion.div className="mb-3 p-3 bg-light rounded-3 shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="d-flex align-items-center gap-2">
                            <BiFilterAlt className="text-muted" />
                            <span className="text-muted small me-2">Active Filters:</span>
                            <div className="d-flex flex-wrap gap-2">
                                {activeFilters.map((filter, index) => (
                                    <Badge key={index} pill bg={filterColors[filter.type]} className="d-flex align-items-center gap-1">
                                        {filter.type}: {filter.value}
                                        <button className="btn-close btn-close-white btn-close-sm ms-1" onClick={() => removeFilter(filter.type)} aria-label="Remove filter" />
                                    </Badge>
                                ))}
                            </div>
                            <Button variant="link" size="sm" className="ms-auto text-danger" onClick={handleResetFilters}>Clear All</Button>
                        </div>
                    </motion.div>
                )}

                <Row className="mb-4 align-items-end g-3">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-muted small">Sub Menu</Form.Label>
                            <Form.Select value={selectedSubMenu} onChange={(e) => setSelectedSubMenu(e.target.value)} className="shadow-sm">
                                <option value="">All Sub Menus</option>
                                {[...new Set(administrationData.map(item => item.submenu))].map((submenu, idx) => (
                                    <option key={idx}>{submenu}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-muted small">Category</Form.Label>
                            <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="shadow-sm">
                                <option value="">All Categories</option>
                                {[...new Set(administrationData.map(item => item.category))].map((category, idx) => (
                                    <option key={idx}>{category}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-muted small">Head Type</Form.Label>
                            <Form.Select value={selectedHeadType} onChange={(e) => setSelectedHeadType(e.target.value)} className="shadow-sm">
                                <option value="">All Head Types</option>
                                {[...new Set(administrationData.map(item => item.headType))].map((type, idx) => (
                                    <option key={idx}>{type}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3} className="d-flex gap-2">
                        <Button variant="outline-secondary" onClick={handleResetFilters} className="d-flex align-items-center gap-1 shadow-sm">
                            <BiReset /> Reset
                        </Button>
                        <Button variant="primary" className="flex-grow-1 shadow-sm">
                            Apply Filters
                        </Button>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4} className="ms-auto">
                        <InputGroup className="shadow-sm">
                            <Form.Control placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <Button variant="outline-secondary"><BiSearch /></Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {loading ? (
                            <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
                        ) : error ? (
                            <div className="text-danger text-center py-4">{error}</div>
                        ) : (
                            <>
                                <motion.div className="table-responsive rounded-3 shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                                    <Table bordered hover className="mb-0">
                                        <thead className="table-primary">
                                            <tr>
                                                <th>Sl No</th>
                                                <th>Sub menu</th>
                                                <th>Category</th>
                                                <th>Head Name</th>
                                                <th>Head Type</th>
                                                <th>image</th>
                                                <th>Designation</th>
                                                <th>Phone No</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <AnimatePresence>
                                                {currentItems.length > 0 ? currentItems.map((item, index) => (
                                                    <motion.tr key={item._id || index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                                                        <td>{indexOfFirstItem + index + 1}</td>
                                                        <td> {item.section}</td>
                                                        <td>{item.category}</td>
                                                        <td className="fw-semibold">{item.name_title} {item.name}</td>
                                                        <td>
                                                            <span
                                                                className={`badge ${item.head_table_type === 'PT' ? 'bg-primary' : 'bg-success'
                                                                    }`}
                                                            >
                                                                {item.head_table_type}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {item.imageUrl ? (
                                                                <img src={item.imageUrl} alt="Admin" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                            ) : (
                                                                <span className="text-muted small">No Image</span>
                                                            )}
                                                        </td>

                                                        <td>{item.designation || '-'}</td>
                                                        <td>{item.phone || '-'}</td>
                                                        <td>
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                className="d-flex align-items-center gap-1"
                                                                onClick={() => openUploadModal(item)}
                                                            >
                                                                <BiUpload /> Upload
                                                            </Button>
                                                        </td>
                                                    </motion.tr>
                                                )) : (
                                                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                                        <td colSpan="8" className="text-center py-4 text-muted">
                                                            <div className="d-flex flex-column align-items-center">
                                                                <BiSearch className="fs-4 mb-2" />
                                                                No records found
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                )}
                                            </AnimatePresence>
                                        </tbody>
                                    </Table>
                                </motion.div>

                                {filteredData.length > itemsPerPage && (
                                    <div className="d-flex justify-content-center mt-3">
                                        <Pagination className="mb-0">
                                            {renderPaginationItems()}
                                        </Pagination>
                                    </div>
                                )}

                                <div className="text-muted small mt-2 text-center">
                                    Showing {currentItems.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                                </div>
                            </>
                        )}
                    </Col>
                </Row>

                {/* Image Upload Modal */}
                <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedItem && (
                            <div className="text-center mb-3">
                                <h6>{selectedItem.name_title} {selectedItem.name}</h6>
                                <p className="text-muted">{selectedItem.designation}</p>
                            </div>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Select Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                        </Form.Group>

                        {previewImage && (
                            <div className="text-center mb-3">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '200px' }}
                                />
                            </div>
                        )}

                        {uploadError && (
                            <div className="alert alert-danger">{uploadError}</div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowUploadModal(false)}
                            disabled={uploading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                        >
                            {uploading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span className="ms-2">Uploading...</span>
                                </>
                            ) : 'Upload'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </AdminLayout>
    );
};

export default AdminList;