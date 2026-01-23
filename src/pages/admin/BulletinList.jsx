import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiTrash2, FiDownload, FiEye, FiSearch, FiFilter, FiX, FiCheck } from 'react-icons/fi';
import Modal from 'react-modal';

// Set app element for accessibility
Modal.setAppElement('#root');

const BulletinList = () => {
    const [bulletins, setBulletins] = useState([]);
    const [filteredBulletins, setFilteredBulletins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBulletin, setSelectedBulletin] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: '',
        year: '',
        month: '',
        displayOrder: '',
        status: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const itemsPerPage = 10;

    const years = Array.from({ length: 101 }, (_, i) => 1950 + i); // 1950 to 2050
    const months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    const statuses = ['Published', 'Pending'];

    useEffect(() => {
        fetchBulletins();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, yearFilter, monthFilter, statusFilter, bulletins]);

    const fetchBulletins = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('https://tellicheri.onrender.com/api/bulletins');

            const data = res.data;

            let bulletinArray = [];

            if (Array.isArray(data)) {
                bulletinArray = data;
            } else if (Array.isArray(data.bulletins)) {
                bulletinArray = data.bulletins;
            } else if (Array.isArray(data.data)) {
                bulletinArray = data.data;
            }

            if (bulletinArray.length) {
                setBulletins(bulletinArray);
            } else {
                console.error("Unexpected API format:", data);
                setBulletins([]);
            }
        } catch (error) {
            console.error('Error fetching bulletins:', error);
            setBulletins([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filterData = () => {
        let filtered = bulletins;

        if (searchQuery) {
            filtered = filtered.filter((b) =>
                b.title?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (yearFilter) {
            filtered = filtered.filter((b) => String(b.year) === yearFilter);
        }

        if (monthFilter) {
            filtered = filtered.filter((b) => b.month === monthFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter((b) => b.status === statusFilter);
        }

        setFilteredBulletins(filtered);
        setCurrentPage(1);
    };

    const paginatedBulletins = filteredBulletins.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredBulletins.length / itemsPerPage);

    // Modal handlers
    const openViewModal = (bulletin) => {
        setSelectedBulletin(bulletin);
        setIsViewModalOpen(true);
    };

    const openEditModal = (bulletin) => {
        setSelectedBulletin(bulletin);
        setEditFormData({
            title: bulletin.title,
            year: bulletin.year,
            month: bulletin.month,
            displayOrder: bulletin.displayOrder,
            status: bulletin.status
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (bulletin) => {
        setSelectedBulletin(bulletin);
        setIsDeleteModalOpen(true);
    };

    const closeModals = () => {
        setIsViewModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedBulletin(null);
    };

    // Form handlers
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            await axios.put(`https://tellicheri.onrender.com/api/bulletins/${selectedBulletin._id}`, editFormData);
            fetchBulletins();
            closeModals();
        } catch (error) {
            console.error('Error updating bulletin:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        setIsProcessing(true);
        try {
            await axios.delete(`https://tellicheri.onrender.com/api/bulletins/${selectedBulletin._id}`);
            fetchBulletins(); // Refresh the list
            closeModals();
        } catch (error) {
            console.error('Error deleting bulletin:', error);
            // Add user feedback
            alert(`Failed to delete bulletin: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };
    const handlePublish = async (bulletinId) => {
        setIsProcessing(true);
        try {
            await axios.put(`https://tellicheri.onrender.com/api/bulletins/${bulletinId}`, {
                status: 'Published'
            });
            fetchBulletins();
        } catch (error) {
            console.error('Error publishing bulletin:', error);
        } finally {
            setIsProcessing(false);
        }
    };

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
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const tableRowVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 10 }
    };

    // Modal styles
    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90%',
            width: '600px',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            padding: '25px'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        }
    };

    return (
        <AdminLayout>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="container-fluid p-4"
            >
                <motion.div variants={itemVariants}>
                    <h4 className="mb-4 fw-bold text-primary">Bulletin Management</h4>
                </motion.div>

                {/* Filter Section */}
                <motion.div
                    variants={itemVariants}
                    className="card mb-4 shadow-sm"
                >
                    <div className="card-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <FiFilter />
                                    </span>
                                    <select
                                        className="form-control"
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                    >
                                        <option value="">All Years</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <FiFilter />
                                    </span>
                                    <select
                                        className="form-control"
                                        value={monthFilter}
                                        onChange={(e) => setMonthFilter(e.target.value)}
                                    >
                                        <option value="">All Months</option>
                                        {months.map((month) => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <FiFilter />
                                    </span>
                                    <select
                                        className="form-control"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="">All Statuses</option>
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <FiSearch />
                                    </span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search bulletins..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Table Section */}
                <motion.div variants={itemVariants}>
                    <div className="card shadow-sm">
                        <div className="card-body p-0">
                            {isLoading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-3">Loading bulletins...</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th width="5%">#</th>
                                                <th width="25%">Title</th>
                                                <th width="10%">Year</th>
                                                <th width="15%">Month</th>
                                                <th width="15%">Status</th>
                                                <th width="30%">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <AnimatePresence>
                                                {paginatedBulletins.length > 0 ? (
                                                    paginatedBulletins.map((b, index) => (
                                                        <motion.tr
                                                            key={b._id}
                                                            variants={tableRowVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                            <td className="fw-semibold">{b.title}</td>
                                                            <td>{b.year}</td>
                                                            <td>
                                                                <span className="badge bg-primary bg-opacity-10 text-primary">
                                                                    {b.month}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${b.status === 'Published' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                                                    {b.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <motion.button
                                                                        className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={() => openViewModal(b)}
                                                                    >
                                                                        <FiEye className="me-1" /> View
                                                                    </motion.button>
                                                                    <motion.button
                                                                        className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={() => openEditModal(b)}
                                                                    >
                                                                        <FiEdit className="me-1" /> Edit
                                                                    </motion.button>
                                                                    {b.status === 'Pending' && (
                                                                        <motion.button
                                                                            className="btn btn-sm btn-success d-flex align-items-center"
                                                                            whileHover={{ scale: 1.05 }}
                                                                            whileTap={{ scale: 0.95 }}
                                                                            onClick={() => handlePublish(b._id)}
                                                                            disabled={isProcessing}
                                                                        >
                                                                            <FiCheck className="me-1" /> Publish
                                                                        </motion.button>
                                                                    )}
                                                                    <motion.button
                                                                        className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={() => openDeleteModal(b)}
                                                                    >
                                                                        <FiTrash2 className="me-1" /> Delete
                                                                    </motion.button>
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    ))
                                                ) : (
                                                    <motion.tr
                                                        variants={tableRowVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                    >
                                                        <td colSpan="6" className="text-center py-4">
                                                            <div className="text-muted">
                                                                No bulletins found matching your criteria.
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                )}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Pagination */}
                {!isLoading && (
                    <motion.div
                        variants={itemVariants}
                        className="d-flex justify-content-between align-items-center mt-4"
                    >
                        <div className="text-muted">
                            Showing <span className="fw-semibold">{paginatedBulletins.length}</span> of{' '}
                            <span className="fw-semibold">{filteredBulletins.length}</span> entries
                        </div>
                        <div className="d-flex">
                            <motion.button
                                className="btn btn-sm btn-outline-primary mx-1"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Previous
                            </motion.button>

                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <motion.button
                                        key={pageNum}
                                        className={`btn btn-sm mx-1 ${pageNum === currentPage ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setCurrentPage(pageNum)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {pageNum}
                                    </motion.button>
                                );
                            })}

                            <motion.button
                                className="btn btn-sm btn-outline-primary mx-1"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* View Modal */}
                <Modal
                    isOpen={isViewModalOpen}
                    onRequestClose={closeModals}
                    style={modalStyles}
                    contentLabel="View Bulletin"
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Bulletin Details</h5>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={closeModals}
                        >
                            <FiX />
                        </button>
                    </div>

                    {selectedBulletin && (
                        <div>
                            <div className="mb-3">
                                <h6 className="fw-bold">{selectedBulletin.title}</h6>
                                <div className="d-flex gap-3 mb-2">
                                    <span className="badge bg-primary bg-opacity-10 text-primary">
                                        {selectedBulletin.month} {selectedBulletin.year}
                                    </span>
                                    <span className={`badge ${selectedBulletin.status === 'Published' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                        {selectedBulletin.status}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-bold">Cover Image</h6>
                                <img
                                    src={`https://tellicheri.onrender.com${selectedBulletin.coverImageUrl}`}
                                    alt="Cover"
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '200px' }}
                                />
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-bold">File</h6>
                                <a
                                    href={`https://tellicheri.onrender.com${selectedBulletin.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-primary"
                                >
                                    <FiDownload className="me-1" /> Download File
                                </a>
                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={closeModals}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Edit Modal */}
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={closeModals}
                    style={modalStyles}
                    contentLabel="Edit Bulletin"
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Edit Bulletin</h5>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={closeModals}
                        >
                            <FiX />
                        </button>
                    </div>

                    <form onSubmit={handleEditSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={editFormData.title}
                                onChange={handleEditChange}
                                required
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Year</label>
                                <select
                                    className="form-control"
                                    name="year"
                                    value={editFormData.year}
                                    onChange={handleEditChange}
                                    required
                                >
                                    <option value="">Select Year</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Month</label>
                                <select
                                    className="form-control"
                                    name="month"
                                    value={editFormData.month}
                                    onChange={handleEditChange}
                                    required
                                >
                                    <option value="">Select Month</option>
                                    {months.map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Display Order</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="displayOrder"
                                    value={editFormData.displayOrder}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={editFormData.status}
                                    onChange={handleEditChange}
                                    required
                                >
                                    <option value="Published">Published</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={closeModals}
                                disabled={isProcessing}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={closeModals}
                    style={modalStyles}
                    contentLabel="Delete Bulletin"
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Confirm Deletion</h5>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={closeModals}
                        >
                            <FiX />
                        </button>
                    </div>

                    {selectedBulletin && (
                        <div>
                            <p>Are you sure you want to delete the bulletin <strong>"{selectedBulletin.title}"</strong>?</p>
                            <p className="text-danger">This action cannot be undone.</p>

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={closeModals}
                                    disabled={isProcessing}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default BulletinList;