// src/pages/ArchdiocesanPriests.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Pagination, Spinner } from 'react-bootstrap';
import axios from 'axios';
import SideNavPriests from '../components/SideNavPriests';
import { Link } from 'react-router-dom';
import './Priests.css';

const ArchdiocesanPriests = () => {
  const [search, setSearch] = useState('');
  const [priests, setPriests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPriests();
  }, [search]);

  const fetchPriests = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/import/priests', {
        params: { search },
      });
      if (res.data.success) {
        setPriests(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching priests:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <SideNavPriests />
        </Col>
        <Col md={9}>
          <h4 className="text-danger fw-bold mb-4">ARCHDIOCESAN PRIESTS</h4>

          <div className="d-flex justify-content-end mb-2">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '220px' }}
            />
          </div>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : (
            <div>
              <Table bordered striped hover className="priest-table align-middle">
                <thead className="custom-header">
                  <tr>
                    <th style={{ width: "5%" }}>Sl No</th>
                    <th style={{ width: "20%" }}>Priest Name</th>
                    <th style={{ width: "20%" }}>Current Designation</th>
                    <th style={{ width: "35%" }}>Address</th>
                    <th style={{ width: "20%" }}>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {priests.length > 0 ? (
                    priests.map((priest, index) => (
                      <tr key={priest._id}>
                        <td>{index + 1}</td>
                   <td>
  <Link
    to={`/priests/${priest.id}`}
    className="text-decoration-none text-danger fw-bold"
  >
    Fr. {priest.house_name ? `${priest.house_name} ` : ""}
    {priest.name}
  </Link>
</td>

                        <td>{priest.designation}</td>
                        <td>{priest.present_address || priest.current_place}</td>
                        <td>{priest.mobile || priest.phone || priest.whatsapp}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No priests found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between px-2 py-1">
                <small>
                  Showing 1 to {priests.length} of {priests.length} entries
                </small>
                <Pagination size="sm" className="mb-0">
                  <Pagination.Prev disabled />
                  <Pagination.Item active>1</Pagination.Item>
                  <Pagination.Next disabled />
                </Pagination>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ArchdiocesanPriests;
