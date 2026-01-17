import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Container, Row, Col, Table, Form, Button, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaDownload, FaPen, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const DownloadList = () => {
  const [downloads, setDownloads] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDownload, setCurrentDownload] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    isActive: false,
    file: null
  });
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const itemsPerPage = 10;

  const categories = ['Roopatha Website'];
  const statuses = ['Active', 'Inactive'];

  useEffect(() => {
    fetchDownloads();
  }, []);

  useEffect(() => {
    filterDownloads();
  }, [downloads, category, status, searchTerm]);

  const fetchDownloads = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('https://tellicheri.onrender.com/api/downloads/all');
      setDownloads(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching downloads:', err);
      setDownloads([]);
      toast.error('Failed to fetch downloads', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: 'slide',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterDownloads = () => {
    let result = [...downloads];

    if (category) result = result.filter((d) => d.category === category);
    if (status) result = result.filter((d) => (status === 'Active' ? d.isActive : !d.isActive));
    if (searchTerm) result = result.filter((d) => d.title.toLowerCase().includes(searchTerm.toLowerCase()));

    setFiltered(result);
    setCurrentPage(1);
  };

  const handleEditClick = (download) => {
    setCurrentDownload(download);
    setEditForm({
      title: download.title,
      category: download.category,
      isActive: download.isActive,
      file: null
    });
    setFileName(download.fileUrl ? download.fileUrl.split('/').pop() : 'No file selected');
    setShowEditModal(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setEditForm({...editForm, file: e.target.files[0]});
      setFileName(e.target.files[0].name);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('category', editForm.category);
      formData.append('isActive', editForm.isActive);
      if (editForm.file) {
        formData.append('file', editForm.file);
      }
      formData.append('oldFileUrl', currentDownload.fileUrl);

      await axios.put(`https://tellicheri.onrender.com/api/downloads/${currentDownload._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Download updated successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: 'slide',
      });
      fetchDownloads();
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating download:', err);
      toast.error('Failed to update download', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: 'slide',
      });
    }
  };

  const handleDownload = async (id) => {
    try {
      window.open(`https://tellicheri.onrender.com/api/downloads/file/${id}`, '_blank');
    } catch (err) {
      console.error('Error downloading file:', err);
      toast.error('Failed to download file', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: 'slide',
      });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`https://tellicheri.onrender.com/api/downloads/${id}`, {
        isActive: !currentStatus
      });
      toast.success(`Download ${currentStatus ? 'deactivated' : 'activated'} successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: 'slide',
      });
      fetchDownloads();
    } catch (err) {
      console.error('Error toggling download status:', err);
      toast.error('Failed to update download status', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: 'slide',
      });
    }
  };

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <AdminLayout>
      <Container fluid className="p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="mb-4">Downloads <span className="text-muted">List</span></h4>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Row className="mb-3 g-3">
            <Col md={4}>
              <Form.Select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="shadow-sm"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="shadow-sm"
              >
                <option value="">-- Select Status --</option>
                {statuses.map((st) => <option key={st} value={st}>{st}</option>)}
              </Form.Select>
            </Col>
            <Col md={4}>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="shadow-sm ps-4"
                />
                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
              </div>
            </Col>
          </Row>
        </motion.div>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-5"
          >
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading downloads...</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="table-responsive shadow-sm rounded"
          >
            <Table striped bordered hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>SI No</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginated.length > 0 ? (
                    paginated.map((item, index) => (
                      <motion.tr
                        key={item._id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.005, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                        className="bg-white"
                      >
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>
                          <Button 
                            variant={item.isActive ? "success" : "secondary"} 
                            size="sm"
                            onClick={() => toggleStatus(item._id, item.isActive)}
                            className="shadow-sm"
                          >
                            {item.isActive ? <FaCheck /> : <FaTimes />}
                            {item.isActive ? ' Active' : ' Inactive'}
                          </Button>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2 shadow-sm"
                            onClick={() => handleEditClick(item)}
                          >
                            <FaPen /> Edit
                          </Button>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            className="shadow-sm"
                            onClick={() => handleDownload(item._id)}
                          >
                            <FaDownload /> Download
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="5" className="text-center py-4">
                        No downloads found
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </Table>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="d-flex justify-content-between align-items-center mt-3 bg-light p-3 rounded"
        >
          <span className="text-muted">
            Showing {paginated.length} of {filtered.length} entries
          </span>
          <div>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                size="sm"
                className={`me-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Edit Modal */}
        <Modal 
          show={showEditModal} 
          onHide={() => setShowEditModal(false)}
          centered
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title>Edit Download</Modal.Title>
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
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select 
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    required
                    className="shadow-sm"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>File</Form.Label>
                  <Form.Control 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="shadow-sm"
                  />
                  <small className="text-muted">{fileName}</small>
                </Form.Group>
                <Form.Check 
                  type="switch"
                  id="active-switch"
                  label="Active"
                  checked={editForm.isActive}
                  onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                />
              </Modal.Body>
              <Modal.Footer className="border-0 pt-0">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowEditModal(false)}
                  className="shadow-sm"
                >
                  Cancel
                </Button>
                <motion.Button 
                  variant="primary" 
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="shadow-sm"
                >
                  Save Changes
                </motion.Button>
              </Modal.Footer>
            </Form>
          </motion.div>
        </Modal>
      </Container>
    </AdminLayout>
  );
};

export default DownloadList;