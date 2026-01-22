import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  Toast,
  ToastContainer,
  Modal,
  OverlayTrigger,
  Tooltip,
  Badge,
  Pagination,
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiLink, FiUpload, FiX, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
};

const WebsiteLinks = () => {
  const [title, setTitle] = useState('');
  const [webLink, setWebLink] = useState('');
  const [pageType, setPageType] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [links, setLinks] = useState([]);
  const [success, setSuccess] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:5000/api/website-links');
      setLinks(res.data);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = links.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(links.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('pageType', pageType);

    if (pdfFile) {
      formData.append('pdfFile', pdfFile);
    } else {
      formData.append('webLink', webLink);
    }

    try {
      setIsLoading(true);
      if (editMode) {
        await axios.put(`http://localhost:5000/api/website-links/${editId}`, {
          title,
          pageType,
          webLink,
          status: 'Active',
        });
      } else {
        await axios.post('http://localhost:5000/api/website-links', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setSuccess(true);
      setShowToast(true);
      resetForm();
      fetchLinks();
      setCurrentPage(1); // Reset to first page after adding/editing
    } catch (err) {
      console.error(err.message);
      setSuccess(false);
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (link) => {
    setEditMode(true);
    setEditId(link._id);
    setTitle(link.title);
    setPageType(link.pageType);
    setWebLink(link.webLink);
    setPdfFile(null);
    setPdfPreview(null);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:5000/api/website-links/${deleteId}`);
      setShowDeleteModal(false);
      fetchLinks();
      // Adjust current page if the last item on the current page was deleted
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setWebLink('');
    setPageType('');
    setPdfFile(null);
    setPdfPreview(null);
    setEditMode(false);
    setEditId(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setWebLink('');
      setPdfPreview(URL.createObjectURL(file));
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfPreview(null);
  };

  const getBadgeColor = (pageType) => {
    switch (pageType) {
      case 'Archdiocesan Websites':
        return 'primary';
      case 'Other Ecclesiastical Websites':
        return 'success';
      case 'Liturgical Calendar':
        return 'warning';
      case 'MPC Registrations':
        return 'info';
      default:
        return 'secondary';
    }
  };

  // Pagination items generator
  const renderPaginationItems = () => {
    let items = [];
    const maxVisiblePages = 5; // Maximum number of visible page buttons

    // Previous button
    items.push(
      <Pagination.Item
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </Pagination.Item>
    );

    // Always show first page
    items.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => handlePageChange(1)}
      >
        {1}
      </Pagination.Item>
    );

    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    // Adjust if we're at the end
    if (endPage === totalPages - 1 && startPage > 2) {
      startPage = Math.max(2, endPage - maxVisiblePages + 3);
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    // Page numbers
    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Item
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </Pagination.Item>
    );

    return items;
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-2">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-4 p-4 border rounded bg-white shadow-sm"
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0 text-dark fw-bold">
              {editMode ? 'Edit Resource' : 'Add New Resource'}
            </h5>
            {editMode && (
              <Button variant="outline-secondary" size="sm" onClick={resetForm}>
                <FiX className="me-1" /> Cancel
              </Button>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group controlId="pageType">
                  <Form.Label className="fw-semibold">Category</Form.Label>
                  <Form.Select
                    value={pageType}
                    onChange={(e) => setPageType(e.target.value)}
                    required
                    className="border-2"
                  >
                    <option value="">Select a category</option>
                    <option value="Archdiocesan Websites">Archdiocesan Websites</option>
                    <option value="Other Ecclesiastical Websites">Other Ecclesiastical Websites</option>
                    <option value="Liturgical Calendar">Liturgical Calendar</option>
                    <option value="MPC Registrations">MPC Registrations</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="title">
                  <Form.Label className="fw-semibold">Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-2"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="webLink">
                  <Form.Label className="fw-semibold">Website URL</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FiLink />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="https://example.com"
                      value={webLink}
                      onChange={(e) => setWebLink(e.target.value)}
                      disabled={pdfFile !== null}
                      className="border-2"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="pdfFile">
                  <Form.Label className="fw-semibold">Or Upload PDF</Form.Label>
                  <div className="d-flex align-items-center gap-3">
                    <div className="flex-grow-1">
                      <Form.Control
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        disabled={editMode}
                        className="border-2"
                      />
                    </div>
                    {pdfPreview && (
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-truncate" style={{ maxWidth: '150px' }}>
                          {pdfFile.name}
                        </span>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={removePdf}
                          disabled={editMode}
                        >
                          <FiX />
                        </Button>
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <div className="d-flex justify-content-end gap-2 pt-2">
                  <Button
                    variant={editMode ? 'warning' : 'primary'}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : editMode ? 'Update Resource' : 'Add Resource'}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </motion.div>

        {/* Toast Message */}
        <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 11 }}>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={800}
            autohide
            bg={success ? 'success' : 'danger'}
          >
            <Toast.Body className="d-flex align-items-center">
              {success ? (
                <>
                  <FiCheck className="me-2" /> Resource saved successfully!
                </>
              ) : (
                <>
                  <FiX className="me-2" /> Failed to save resource.
                </>
              )}
            </Toast.Body>
          </Toast>
        </ToastContainer>

        {/* Data Table */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-3 bg-white rounded shadow-sm border"
        >
          <div className="p-3 border-bottom bg-light">
            <h6 className="mb-0 fw-bold">Manage Resources</h6>
          </div>

          {isLoading && links.length === 0 ? (
            <div className="p-5 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th width="50">#</th>
                      <th>Title</th>
                      <th>Link/File</th>
                      <th>Category</th>
                      <th width="120">Status</th>
                      <th width="150">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, idx) => (
                      <motion.tr
                        key={item._id}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="align-middle"
                      >
                        <td className="text-muted">{indexOfFirstItem + idx + 1}</td>
                        <td className="fw-semibold">{item.title}</td>
                        <td>
                          {item.webLink ? (
                            <a
                              href={item.webLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-decoration-none d-flex align-items-center gap-1"
                            >
                              <FiLink size={14} />
                              <span className="text-truncate" style={{ maxWidth: '200px' }}>
                                {item.webLink}
                              </span>
                            </a>
                          ) : (
                            <span className="text-muted">PDF Uploaded</span>
                          )}
                        </td>
                        <td>
                          <Badge bg={getBadgeColor(item.pageType)} className="text-uppercase">
                            {item.pageType}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            bg={item.status === 'Active' ? 'success' : 'secondary'}
                            className="text-uppercase"
                          >
                            {item.status || 'Active'}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Edit</Tooltip>}
                            >
                              <Button
                                size="sm"
                                variant="outline-primary"
                                className="p-1 px-2"
                                onClick={() => handleEdit(item)}
                                disabled={isLoading}
                              >
                                <FiEdit2 size={16} />
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Delete</Tooltip>}
                            >
                              <Button
                                size="sm"
                                variant="outline-danger"
                                className="p-1 px-2"
                                onClick={() => {
                                  setDeleteId(item._id);
                                  setShowDeleteModal(true);
                                }}
                                disabled={isLoading}
                              >
                                <FiTrash2 size={16} />
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {links.length > itemsPerPage && (
                <div className="d-flex justify-content-center py-3 border-top">
                  <Pagination className="mb-0">
                    {renderPaginationItems()}
                  </Pagination>
                </div>
              )}
            </>
          )}

          {!isLoading && links.length === 0 && (
            <div className="p-5 text-center text-muted">
              <FiLink size={24} className="mb-2" />
              <p className="mb-0">No resources found</p>
            </div>
          )}
        </motion.div>

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-2">
            <Modal.Title className="text-danger">Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-3">
            <p className="mb-1">Are you sure you want to delete this resource?</p>
            <p className="small text-muted mb-0">This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default WebsiteLinks;