import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button, Modal, Spinner, OverlayTrigger, Tooltip, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { motion } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import { FaEdit, FaTrash, FaImage, FaEye, FaCheck, FaSearch, FaSync, FaTimes, FaVideo } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPlayer from 'react-player';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);
  const [filter, setFilter] = useState({ type: '', status: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newMedia, setNewMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    eventDate: new Date(),
    status: '',
    type: '',
    videoUrl: ''
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      // Sort galleries by creation date in ascending order (oldest first)
      const sortedGalleries = res.data.sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      setGalleries(sortedGalleries);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredList = galleries.filter((gallery) => {
    return (
      (filter.type === '' || gallery.type === filter.type) &&
      (filter.status === '' || gallery.status === filter.status) &&
      (filter.category === '' || gallery.category.toLowerCase().includes(filter.category.toLowerCase())) &&
      (searchTerm === '' || gallery.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredList.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredList.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatusChange = async (galleryId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/gallery/${galleryId}`, { status: newStatus });
      fetchGallery();
      setShowStatusModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const viewMedia = (gallery) => {
    setSelectedGallery(gallery);
    if (gallery.type === 'Image') {
      setSelectedImages(gallery.imageUrls || []);
    }
    setShowImageModal(true);
  };

  const handleEditClick = (gallery) => {
    setSelectedGallery(gallery);
    setEditFormData({
      title: gallery.title,
      category: gallery.category,
      description: gallery.description || '',
      location: gallery.location || '',
      eventDate: new Date(gallery.eventDate),
      status: gallery.status,
      type: gallery.type,
      videoUrl: gallery.videoUrl || ''
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/gallery/${selectedGallery._id}`, {
        ...editFormData,
        eventDate: editFormData.eventDate.toISOString()
      });
      fetchGallery();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating gallery:", error);
    }
  };

  const handleAddMedia = async () => {
    if (!selectedGallery) return;
    
    setUploading(true);
    try {
      if (selectedGallery.type === 'Image') {
        const formData = new FormData();
        newMedia.forEach((file) => {
          formData.append('images', file);
        });

        await axios.post(
          `http://localhost:5000/api/gallery/${selectedGallery._id}/images`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else if (selectedGallery.type === 'Video') {
        await axios.put(`http://localhost:5000/api/gallery/${selectedGallery._id}`, {
          videoUrl: editFormData.videoUrl
        });
      }

      fetchGallery();
      setShowAddMediaModal(false);
      setNewMedia([]);
    } catch (error) {
      console.error("Error adding media:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = async (mediaUrl) => {
    try {
      if (selectedGallery.type === 'Image') {
        await axios.delete(`http://localhost:5000/api/gallery/${selectedGallery._id}/images`, {
          data: { imageUrl: mediaUrl }
        });
        setSelectedImages(selectedImages.filter(img => img !== mediaUrl));
      } else if (selectedGallery.type === 'Video') {
        await axios.put(`http://localhost:5000/api/gallery/${selectedGallery._id}`, {
          videoUrl: ''
        });
        setSelectedGallery({...selectedGallery, videoUrl: ''});
      }
      fetchGallery();
    } catch (error) {
      console.error("Error removing media:", error);
    }
  };

  // Pagination items
  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <AdminLayout>
      <Container fluid className="py-4 px-4">
        <motion.h5 
          className="mb-3 fw-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Gallery Management <span className="text-muted">Dashboard</span>
        </motion.h5>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Row className="mb-4">
            <Col md={3}>
              <Form.Select
                value={filter.type}
                onChange={(e) => setFilter((prev) => ({ ...prev, type: e.target.value }))}
              >
                <option value="">Select Gallery Type</option>
                <option value="Image">Image Gallery</option>
                <option value="Video">Video Gallery</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filter.status}
                onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option value="">Select Status</option>
                <option value="Published">Published</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Control
                placeholder="Filter by Category"
                value={filter.category}
                onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))}
              />
            </Col>
            <Col md={3}>
              <Button 
                className="w-100 d-flex align-items-center justify-content-center" 
                onClick={fetchGallery}
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" className="me-2" /> : <FaSync className="me-2" />}
                Refresh
              </Button>
            </Col>
          </Row>
        </motion.div>

        {/* Entries and Search Row */}
        <Row className="mb-3 align-items-center">
          <Col sm={6}>
            <Form.Label className="me-2">Show</Form.Label>
            <Form.Select 
              size="sm" 
              style={{ width: '80px', display: 'inline-block' }}
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Form.Select>
            <span className="ms-2">entries</span>
          </Col>
          <Col sm={6} className="text-end">
            <div className="d-flex justify-content-end">
              <Form.Control
                size="sm"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: '250px', display: 'inline-block' }}
              />
              <Button variant="outline-secondary" size="sm" className="ms-2">
                <FaSearch />
              </Button>
            </div>
          </Col>
        </Row>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading gallery items...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Table bordered hover responsive className="mt-3">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Event Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No gallery items found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  currentEntries.map((item, index) => (
                    <motion.tr 
                      key={item._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td>{indexOfFirstEntry + index + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        <span className={`badge ${item.type === 'Image' ? 'bg-info' : 'bg-danger'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td>{item.category}</td>
                      <td>{new Date(item.eventDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${item.status === 'Published' ? 'bg-success' : 'bg-warning'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <OverlayTrigger overlay={<Tooltip>View {item.type === 'Image' ? 'Images' : 'Video'}</Tooltip>}>
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => viewMedia(item)}
                            >
                              {item.type === 'Image' ? <FaEye /> : <FaVideo />}
                            </Button>
                          </OverlayTrigger>
                          
                          <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                            <Button 
                              variant="outline-success" 
                              size="sm"
                              onClick={() => handleEditClick(item)}
                            >
                              <FaEdit />
                            </Button>
                          </OverlayTrigger>
                          
                          {item.status === 'Pending' && (
                            <OverlayTrigger overlay={<Tooltip>Publish</Tooltip>}>
                              <Button 
                                variant="outline-info" 
                                size="sm"
                                onClick={() => {
                                  setSelectedGallery(item);
                                  setShowStatusModal(true);
                                }}
                              >
                                <FaCheck />
                              </Button>
                            </OverlayTrigger>
                          )}
                          
                          <OverlayTrigger overlay={<Tooltip>Add {item.type === 'Image' ? 'Images' : 'Video'}</Tooltip>}>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => {
                                setSelectedGallery(item);
                                setShowAddMediaModal(true);
                              }}
                            >
                              {item.type === 'Image' ? <FaImage /> : <FaVideo />}
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            {filteredList.length > entriesPerPage && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredList.length)} of {filteredList.length} entries
                </div>
                <Pagination>
                  <Pagination.First 
                    onClick={() => paginate(1)} 
                    disabled={currentPage === 1} 
                  />
                  <Pagination.Prev 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1} 
                  />
                  {paginationItems}
                  <Pagination.Next 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                  />
                  <Pagination.Last 
                    onClick={() => paginate(totalPages)} 
                    disabled={currentPage === totalPages} 
                  />
                </Pagination>
              </div>
            )}
          </motion.div>
        )}
      </Container>

      {/* Media View Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedGallery?.type === 'Image' 
              ? `Gallery Images: ${selectedGallery?.title}` 
              : `Gallery Video: ${selectedGallery?.title}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGallery?.type === 'Image' ? (
            selectedImages.length === 0 ? (
              <div className="text-center py-4 text-muted">
                No images available for this gallery.
              </div>
            ) : (
              <Row>
                {selectedImages.map((image, index) => (
                  <Col md={4} key={index} className="mb-3">
                    <div className="position-relative">
                      <img 
                        src={`http://localhost:5000${image}`} 
                        alt={`Gallery ${index + 1}`} 
                        className="img-fluid rounded"
                        style={{ height: '150px', width: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 m-1"
                        onClick={() => removeMedia(image)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            )
          ) : (
            selectedGallery?.videoUrl ? (
              <div className="text-center">
                <ReactPlayer 
                  url={selectedGallery.videoUrl} 
                  controls 
                  width="100%"
                  style={{ maxWidth: '800px', margin: '0 auto' }}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="mt-3"
                  onClick={() => removeMedia(selectedGallery.videoUrl)}
                >
                  <FaTrash className="me-1" /> Remove Video
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 text-muted">
                No video available for this gallery.
              </div>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Status Change Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Gallery Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to change the status of <strong>{selectedGallery?.title}</strong> from "Pending" to "Published"?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => handleStatusChange(selectedGallery?._id, 'Published')}
          >
            Confirm Publish
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Media Modal */}
      <Modal show={showAddMediaModal} onHide={() => setShowAddMediaModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedGallery?.type === 'Image' 
              ? `Add Images to ${selectedGallery?.title}` 
              : `Add Video to ${selectedGallery?.title}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGallery?.type === 'Image' ? (
            <>
              <Form.Group>
                <Form.Label>Select Images</Form.Label>
                <Form.Control 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={(e) => setNewMedia(Array.from(e.target.files))}
                />
                <Form.Text className="text-muted">
                  You can select multiple images (JPEG, PNG)
                </Form.Text>
              </Form.Group>
              
              {newMedia.length > 0 && (
                <div className="mt-3">
                  <h6>Selected Images ({newMedia.length}):</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {Array.from(newMedia).map((file, index) => (
                      <div key={index} className="border p-1 rounded">
                        <small>{file.name}</small>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 ms-2 text-danger"
                          onClick={() => setNewMedia(newMedia.filter((_, i) => i !== index))}
                        >
                          <FaTimes />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Form.Group>
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                value={editFormData.videoUrl}
                onChange={(e) => setEditFormData({...editFormData, videoUrl: e.target.value})}
              />
              <Form.Text className="text-muted">
                Enter a valid video URL from supported platforms (YouTube, Vimeo, etc.)
              </Form.Text>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddMediaModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddMedia}
            disabled={
              (selectedGallery?.type === 'Image' && newMedia.length === 0) || 
              (selectedGallery?.type === 'Video' && !editFormData.videoUrl) ||
              uploading
            }
          >
            {uploading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {selectedGallery?.type === 'Image' ? 'Uploading...' : 'Saving...'}
              </>
            ) : (
              selectedGallery?.type === 'Image' ? 'Upload Images' : 'Save Video'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Gallery Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Gallery: {selectedGallery?.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.category}
                onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editFormData.description}
                onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={editFormData.location}
                    onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <DatePicker
                    selected={editFormData.eventDate}
                    onChange={(date) => setEditFormData({...editFormData, eventDate: date})}
                    className="form-control"
                    dateFormat="MMMM d, yyyy"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={editFormData.type}
                    onChange={(e) => setEditFormData({...editFormData, type: e.target.value})}
                    required
                  >
                    <option value="Image">Image</option>
                    <option value="Video">Video</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    required
                  >
                    <option value="Published">Published</option>
                    <option value="Pending">Pending</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {editFormData.type === 'Video' && (
              <Form.Group className="mb-3">
                <Form.Label>Video URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter video URL"
                  value={editFormData.videoUrl}
                  onChange={(e) => setEditFormData({...editFormData, videoUrl: e.target.value})}
                />
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default GalleryList;