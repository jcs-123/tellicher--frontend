import React, { useState } from 'react';
import Sidebar from '../pages/admin/Sidebar';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const username = localStorage.getItem('username');

  const handleLogout = async () => {
    try {
      if (username) {
        await axios.post('https://tellicheri.onrender.com/api/auth/logout', { username });
      }
    } catch (err) {
      console.error('Logout log failed:', err);
    }
    localStorage.clear();
    window.location.href = '/admin/login';
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.put(`https://tellicheri.onrender.com/api/users/by-username/${username}/password`, {
        newPassword
      });
      toast.success("Password changed successfully!");
      setShowResetModal(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error("Error updating password");
      console.error(err);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.8rem' }}>
      <ToastContainer autoClose={800} position="top-right" pauseOnHover={false} />

      {/* Sidebar */}
      {showSidebar && (
        <div style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: '230px',
          background: '#343a40',
          color: 'white',
          zIndex: 1000
        }}>
          <Sidebar />
        </div>
      )}

      {/* Main Content with Top Navbar */}
      <div style={{
        marginLeft: showSidebar ? '230px' : '0px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        background: '#f4f6f9',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Navbar */}
        <div style={{
          background: '#3c8dbc',
          color: '#fff',
          padding: '8px 15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FaBars style={{ marginRight: '8px' }} />
            Menu
          </div>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem' }}
              onClick={() => setShowDropdown(prev => !prev)}
            >
              <img
                src="https://www.archdioceseoftellicherry.org/assets/dist/img/avatar5.png"
                alt="avatar"
                style={{
                  borderRadius: '50%',
                  height: '25px',
                  width: '25px',
                  marginRight: '6px'
                }}
              />
              <span>{username}</span>
            </div>

            {showDropdown && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '35px',
                backgroundColor: '#3c8dbc',
                minWidth: '200px',
                borderRadius: '5px',
                zIndex: 10,
                textAlign: 'center',
                padding: '10px 10px',
                color: 'white',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                fontSize: '0.8rem'
              }}>
                <img
                  src="https://www.archdioceseoftellicherry.org/assets/dist/img/avatar5.png"
                  alt="Profile"
                  style={{
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    marginBottom: '8px'
                  }}
                />
                <p style={{ margin: 0, fontWeight: 'bold' }}>{username} - Administrator</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '10px',
                  borderTop: '1px solid #fff',
                  paddingTop: '8px'
                }}>
                  <button
                    onClick={() => setShowResetModal(true)}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {children}
        </div>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#f9f9f9',
          borderTop: '1px solid #ddd',
          padding: '10px 20px',
          fontSize: '13px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#333'
        }}>
          <div>
            <strong>Copyright © 2025</strong>{' '}
            <a href="#" style={{ color: '#3c8dbc', textDecoration: 'none' }}>
              Archdiocese of Tellichery
            </a>. All rights reserved.
          </div>
          <div style={{ fontSize: '12px' }}>
            Developed By{' '}
            <a href="mailto:tbi@jecc" style={{ color: '#3c8dbc', textDecoration: 'none' }}>
              tbi@jecc Jyothi Engineering College
            </a>
          </div>
        </footer>
      </div>

      {/* Reset Password Modal */}
      <Modal show={showResetModal} onHide={() => setShowResetModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handlePasswordReset}>Update Password</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminLayout;
