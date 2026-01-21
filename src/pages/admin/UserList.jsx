import React, { useEffect, useState } from 'react';
import { 
  Container, Table, Button, Row, Col, Form, 
  InputGroup, Modal, Badge, Spinner, Alert
} from 'react-bootstrap';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';
import { FiEdit, FiKey, FiUser, FiSearch, FiFilter, FiRefreshCw, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filterGroup, setFilterGroup] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://tellicheri.onrender.com/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    try {
      await axios.patch(`https://tellicheri.onrender.com/api/users/${userId}/status`, {
        status: !currentStatus
      });
      fetchUsers();
    } catch (err) {
      console.error('Error toggling status:', err);
      setError('Failed to update user status.');
    }
  };

  const handleEditClick = (user) => {
    setEditUser({ ...user });
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`https://tellicheri.onrender.com/api/users/${editUser._id}`, editUser);
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user details.');
    }
  };

  const handlePasswordSave = async () => {
    try {
      await axios.patch(`https://tellicheri.onrender.com/api/users/${selectedUserId}/password`, { password: newPassword });
      setShowPasswordModal(false);
      setNewPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update password.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    (!filterGroup || user.userGroup === filterGroup) &&
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.username?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      <Container className="py-4">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="mb-0 fw-bold text-dark">
                <FiUser className="me-2" />
                User Management
              </h4>
              <p className="text-muted mb-0">Manage system users and permissions</p>
            </div>
            <Button variant="outline-primary" onClick={fetchUsers}>
              <FiRefreshCw className="me-1" /> Refresh
            </Button>
          </div>

          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <div className="mb-4">
            <Row className="g-3">
              <Col md={4}>
                <InputGroup>
                  <InputGroup.Text>
                    <FiFilter />
                  </InputGroup.Text>
                  <Form.Select 
                    value={filterGroup} 
                    onChange={(e) => setFilterGroup(e.target.value)}
                  >
                    <option value="">All User Groups</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Developer">Developer</option>
                    <option value="Guest">Guest</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <FiSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={2} className="d-grid">
                <Button variant="primary" onClick={fetchUsers}>
                  Search
                </Button>
              </Col>
            </Row>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading users...</p>
            </div>
          ) : (
            <div className="table-responsive rounded shadow-sm">
              <Table hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Username</th>
                    <th>Group</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <img 
                          src="/images/no-data.svg" 
                          alt="No users found" 
                          style={{ height: '120px' }}
                          className="mb-3"
                        />
                        <h5>No users found</h5>
                        <p className="text-muted">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, idx) => (
                      <tr key={user._id}>
                        <td>{idx + 1}</td>
                        <td className="fw-semibold">{user.name}</td>
                        <td>@{user.username}</td>
                        <td>
                          <Badge bg="info" className="text-uppercase">
                            {user.userGroup}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={user.status ? "success" : "secondary"}>
                            {user.status ? "ACTIVE" : "INACTIVE"}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex">
                            <Button
                              size="sm"
                              variant={user.status ? "outline-danger" : "outline-success"}
                              onClick={() => toggleStatus(user._id, user.status)}
                              className="me-2 d-flex align-items-center"
                            >
                              {user.status ? (
                                <>
                                  <FiToggleLeft className="me-1" /> INACTIVE
                                </>
                              ) : (
                                <>
                                  <FiToggleRight className="me-1" /> Activate
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              className="me-2"
                              onClick={() => handleEditClick(user)}
                            >
                              <FiEdit className="me-1" /> Edit
                            </Button>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => {
                                setSelectedUserId(user._id);
                                setShowPasswordModal(true);
                              }}
                            >
                              <FiKey className="me-1" /> Pass
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </motion.div>

        {/* Edit Modal */}
        <Modal 
          show={showEditModal} 
          onHide={() => setShowEditModal(false)}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton className="bg-light">
            <Modal.Title>
              <FiEdit className="me-2" />
              Edit User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editUser?.name || ''}
                  onChange={(e) => setEditUser(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={editUser?.username || ''}
                  onChange={(e) => setEditUser(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={editUser?.email || ''}
                  onChange={(e) => setEditUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User Role</Form.Label>
                <Form.Select
                  value={editUser?.userGroup || ''}
                  onChange={(e) => setEditUser(prev => ({ ...prev, userGroup: e.target.value }))}
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Developer">Developer</option>
                  <option value="Guest">Guest</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleEditSave}
              disabled={!editUser?.name || !editUser?.username}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Password Modal */}
        <Modal 
          show={showPasswordModal} 
          onHide={() => setShowPasswordModal(false)}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton className="bg-light">
            <Modal.Title>
              <FiKey className="me-2" />
              Change Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <Form.Text className="text-muted">
                Password must be at least 6 characters long
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handlePasswordSave}
              disabled={newPassword.length < 6}
            >
              Update Password
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </AdminLayout>
  );
};

export default UserList;