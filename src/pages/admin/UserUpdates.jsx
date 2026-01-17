import React, { useEffect, useState } from 'react';
import { 
  Container, Table, Form, Row, Col, Button, 
  Spinner, Alert, Pagination, Badge, Card
} from 'react-bootstrap';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import { motion } from 'framer-motion';
import { fadeIn, stagger } from '../../utils/animations';
import { FiSearch, FiRefreshCw, FiClock, FiUser, FiActivity } from 'react-icons/fi';

const UserUpdates = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    username: '',
    operation: '',
    fromDate: '',
    toDate: '',
  });

  // Fetch logs from backend
  const fetchLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://tellicheri.onrender.com/api/logs', { params: filters });
      setLogs(res.data);
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError('Failed to fetch logs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user list
  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://tellicheri.onrender.com/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch user list.');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle search button
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchLogs();
  };

  // Handle reset filters
  const handleReset = () => {
    setFilters({
      username: '',
      operation: '',
      fromDate: '',
      toDate: '',
    });
    setCurrentPage(1);
    fetchLogs();
  };

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Operation badge colors
  const getOperationBadge = (operation) => {
    switch(operation) {
      case 'Sign In': return 'success';
      case 'Sign Out': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <AdminLayout>
      <Container className="py-4">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="mb-0 fw-bold text-dark">
                    <FiClock className="me-2" />
                    User Activity Logs
                  </h4>
                  <p className="text-muted mb-0">Track system user activities and operations</p>
                </div>
                <Button variant="outline-primary" onClick={fetchLogs}>
                  <FiRefreshCw className="me-1" /> Refresh
                </Button>
              </div>

              {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSearch}>
                <Row className="mb-4 g-3 align-items-end">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>User</Form.Label>
                      <Form.Select 
                        name="username" 
                        value={filters.username} 
                        onChange={handleChange}
                      >
                        <option value="">All Users</option>
                        {users.map((user) => (
                          <option key={user._id} value={user.username}>
                            {user.username}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Operation</Form.Label>
                      <Form.Select 
                        name="operation" 
                        value={filters.operation} 
                        onChange={handleChange}
                      >
                        <option value="">All Operations</option>
                        <option value="Sign In">Sign In</option>
                        <option value="Sign Out">Sign Out</option>
                        <option value="Update">Update</option>
                        <option value="Create">Create</option>
                        <option value="Delete">Delete</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="fromDate"
                        value={filters.fromDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>To Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="toDate"
                        value={filters.toDate}
                        onChange={handleChange}
                        min={filters.fromDate}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={1} className="d-grid">
                    <Button type="submit" variant="primary">
                      <FiSearch className="me-1" /> Search
                    </Button>
                  </Col>

                  <Col md={1} className="d-grid">
                    <Button variant="outline-secondary" onClick={handleReset}>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>

              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading activity logs...</p>
                </div>
              ) : (
                <motion.div variants={stagger}>
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead className="table-light">
                        <motion.tr variants={fadeIn}>
                          <th>#</th>
                          <th><FiUser className="me-1" /> User</th>
                          <th><FiActivity className="me-1" /> Activity</th>
                          <th>Operation</th>
                          <th>Timestamp</th>
                        </motion.tr>
                      </thead>
                      <tbody>
                        {currentLogs.length === 0 ? (
                          <motion.tr variants={fadeIn}>
                            <td colSpan="5" className="text-center py-4">
                              <img 
                                src="/images/no-data.svg" 
                                alt="No logs found" 
                                style={{ height: '120px' }}
                                className="mb-3"
                              />
                              <h5>No activity logs found</h5>
                              <p className="text-muted">Try adjusting your search criteria</p>
                            </td>
                          </motion.tr>
                        ) : (
                          currentLogs.map((log, index) => (
                            <motion.tr 
                              key={log._id}
                              variants={fadeIn}
                              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                              transition={{ duration: 0.2 }}
                            >
                              <td>{indexOfFirstLog + index + 1}</td>
                              <td className="fw-semibold">{log.username}</td>
                              <td>{log.activity}</td>
                              <td>
                                <Badge bg={getOperationBadge(log.operation)}>
                                  {log.operation}
                                </Badge>
                              </td>
                              <td>
                                {new Date(log.createdAt).toLocaleString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {logs.length > logsPerPage && (
                    <div className="d-flex justify-content-center mt-4">
                      <Pagination>
                        <Pagination.First 
                          onClick={() => paginate(1)} 
                          disabled={currentPage === 1} 
                        />
                        <Pagination.Prev 
                          onClick={() => paginate(currentPage - 1)} 
                          disabled={currentPage === 1} 
                        />
                        
                        {[...Array(totalPages)].map((_, i) => (
                          <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </Pagination.Item>
                        ))}
                        
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
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </AdminLayout>
  );
};

export default UserUpdates;