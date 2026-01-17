import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Container, Row, Col, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaDownload, FaToggleOn, FaToggleOff, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // ✅ Add animation

const CircularList = () => {
  const [circulars, setCirculars] = useState([]);
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCircular, setCurrentCircular] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    displayOrder: '',
    isActive: false,
    file: null
  });
  const [filePreview, setFilePreview] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCirculars();
  }, []);

  const fetchCirculars = async () => {
    try {
      const res = await axios.get('https://tellicheri.onrender.com/api/circulars');
      setCirculars(res.data);
    } catch (err) {
      console.error('Error fetching circulars:', err);
    }
  };

  const handleEditClick = (circular) => {
    setCurrentCircular(circular);
    setEditForm({
      title: circular.title,
      displayOrder: circular.displayOrder,
      isActive: circular.isActive,
      file: null
    });
    setFilePreview(circular.fileUrl ? `https://tellicheri.onrender.com${circular.fileUrl}` : '');
    setShowEditModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({...editForm, file});
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setEditForm({...editForm, file: null});
    setFilePreview('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('displayOrder', editForm.displayOrder);
      formData.append('isActive', editForm.isActive);
      if (editForm.file) {
        formData.append('file', editForm.file);
      }

      await axios.put(
        `https://tellicheri.onrender.com/api/circulars/${currentCircular._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      fetchCirculars();
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating circular:', err.response?.data || err.message);
      alert(`Error updating circular: ${err.response?.data?.error || err.message}`);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`https://tellicheri.onrender.com/api/circulars/${id}`, {
        isActive: !currentStatus
      });
      fetchCirculars();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const filteredCirculars = circulars.filter((circular) => {
    return (
      (!status || (status === 'Active' ? circular.isActive : !circular.isActive)) &&
      circular.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginated = filteredCirculars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCirculars.length / itemsPerPage);

  return (
    <AdminLayout>
      <Container fluid className="p-4">
        <h4 className="mb-3">Circulars <span className="text-muted">List</span></h4>

        <Row className="mb-4 align-items-center">
          <Col md={4}>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">--select status --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Button onClick={() => setCurrentPage(1)}>Search</Button>
          </Col>
          <Col md={4} className="text-end">
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        {/* Table with animation */}
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-light">
              <tr>
                <th>Si No</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => toggleStatus(item._id, item.isActive)}
                          className="p-0"
                        >
                          {item.isActive ? (
                            <FaToggleOn className="text-success" size={24} />
                          ) : (
                            <FaToggleOff className="text-secondary" size={24} />
                          )}
                        </Button>
                        <span className="ms-2">{item.isActive ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-success me-2"
                          onClick={() => handleEditClick(item)}
                        >
                          <FaEdit /> Edit
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger"
                          onClick={() => window.open(`https://tellicheri.onrender.com${item.fileUrl}`, '_blank')}
                        >
                          <FaDownload /> Download
                        </Button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No circulars found</td>
                  </tr>
                )}
              </tbody>
            </AnimatePresence>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>Showing {paginated.length} of {filteredCirculars.length} entries</span>
          <div>
            <Button
              size="sm"
              className="me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <Button
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Animated Modal */}
        <AnimatePresence>
          {showEditModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Modal show={true} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Edit Circular</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                  <Modal.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Display Order</Form.Label>
                      <Form.Control
                        type="number"
                        value={editForm.displayOrder}
                        onChange={(e) => setEditForm({...editForm, displayOrder: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>PDF File</Form.Label>
                      {filePreview && (
                        <div className="mb-2">
                          <a href={filePreview} target="_blank" rel="noopener noreferrer">
                            View Current File
                          </a>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-danger ms-2"
                            onClick={removeFile}
                          >
                            <FaTrash /> Remove
                          </Button>
                        </div>
                      )}
                      <Form.Control
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                      <Form.Text muted>
                        Upload a new PDF file to replace the current one
                      </Form.Text>
                    </Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Active"
                      checked={editForm.isActive}
                      onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </AdminLayout>
  );
};

export default CircularList;
