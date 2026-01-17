// src/pages/Parishes.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideNavParish from '../components/SideNavParish';
import './Parishes.css';

const Parishes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [parishes, setParishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchParishes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/import/parishes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch parishes');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setParishes(result.data);
      }
    } catch (error) {
      console.error('Error fetching parishes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParishes();
  }, []);

  const handleParishClick = (parishId) => {
    navigate(`/parish/${parishId}`);
  };

  const filteredParishes = parishes.filter((parish) =>
    parish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}>
            <SideNavParish />
          </Col>
          <Col md={9} className="text-center">
            <Spinner animation="border" variant="danger" />
            <p className="mt-2">Loading parishes...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <SideNavParish />
        </Col>
        <Col md={9}>
          <h4 className="text-danger fw-bold mb-4">PARISHES</h4>
          <div className="d-flex justify-content-end mb-2">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '220px' }}
            />
          </div>
          <div className="table-responsive parish-table-wrapper">
            <Table bordered className="parish-table text-nowrap align-middle">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Parish Name</th>
                  <th>Vicar</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredParishes.map((parish, index) => (
                  <tr key={parish._id}>
                    <td>{index + 1}</td>
                    <td>
                      <button
                        className="btn btn-link text-primary p-0 text-decoration-none"
                        onClick={() => handleParishClick(parish._id)}
                        style={{ border: 'none', background: 'none' }}
                      >
                        {parish.name}
                      </button>
                    </td>
                    <td>{parish.vicar_name ? `Fr. ${parish.vicar_name}` : 'N/A'}</td>
                    <td>{parish.address || 'N/A'}</td>
                    <td>{parish.phone || parish.mobile || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Parishes;