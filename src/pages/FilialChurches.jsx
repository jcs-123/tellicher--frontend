// src/pages/FilialChurches.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideNavParish from '../components/SideNavParish';
import './Parishes.css';

const FilialChurches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filialChurches, setFilialChurches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFilialChurches = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        'http://localhost:5000/api/import/parishes'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch parishes');
      }

      const result = await response.json();

      if (result.success) {
        // ✅ FILTER ONLY FILIAL CHURCHES
        const filial = result.data.filter(
          (p) =>
            p.parish_type &&
            p.parish_type.toLowerCase().includes('filial')
        );

        setFilialChurches(filial);
      }
    } catch (error) {
      console.error('Error fetching filial churches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilialChurches();
  }, []);

  // 🔎 Search
  const filteredChurches = filialChurches.filter((church) =>
    church.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 👉 Navigate to Parish Detail page
  const handleChurchClick = (parishId) => {
    navigate(`/parish/${parishId}`);
  };

  if (loading) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}>
            <SideNavParish />
          </Col>
          <Col md={9} className="text-center">
            <Spinner animation="border" variant="danger" />
            <p className="mt-2">Loading filial churches...</p>
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
          <h4 className="text-danger fw-bold mb-3">
            FILIAL CHURCHES
          </h4>

          {/* SEARCH */}
          <div className="d-flex justify-content-end mb-2">
            <Form.Control
              type="text"
              placeholder="Search:"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="table-search"
            />
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <Table
              bordered
              className="custom-parish-table text-nowrap align-middle"
            >
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Church Name</th>
                  <th>Vicar</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredChurches.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No filial churches found
                    </td>
                  </tr>
                ) : (
                  filteredChurches.map((church, index) => (
                    <tr key={church._id}>
                      <td>{index + 1}</td>

                      {/* ✅ CLICKABLE LIKE PARISH TABLE */}
                      <td>
                        <button
                          className="btn btn-link text-primary p-0 text-decoration-none"
                          style={{ border: 'none', background: 'none' }}
                          onClick={() =>
                            handleChurchClick(church._id)
                          }
                        >
                          {church.name}
                        </button>
                      </td>

                      <td>
                        {church.vicar_name
                          ? `Fr. ${church.vicar_name}`
                          : 'N/A'}
                      </td>
                      <td>{church.address || 'N/A'}</td>
                      <td>
                        {church.phone ||
                          church.mobile ||
                          'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FilialChurches;
