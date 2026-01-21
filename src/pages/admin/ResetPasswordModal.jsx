import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordModal = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('username'); // Admin user

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/users/by-username/${username}/password`, {
        newPassword,
      });

      if (res.status === 200) {
        setMessage('Password updated successfully');
      } else {
        setMessage('Failed to update password');
      }
    } catch (error) {
      setMessage('Error: ' + (error?.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          {message && <p>{message}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={styles.button}>Update</button>
            <button type="button" onClick={onClose} style={styles.buttonSecondary}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modal: {
    background: '#fff', padding: '20px', borderRadius: '8px', width: '300px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  },
  input: {
    width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc'
  },
  button: {
    padding: '8px 16px', background: '#3c8dbc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
  },
  buttonSecondary: {
    padding: '8px 16px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer'
  }
};

export default ResetPasswordModal;
