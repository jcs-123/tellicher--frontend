import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Nav, Pagination, Spinner } from 'react-bootstrap';
import axios from 'axios';
import SideNavObituary from '../components/SideNavPriests';
import './Obituary.css';

const Obituary = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('after');
  const [currentPage, setCurrentPage] = useState(1);
  const [priests, setPriests] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchObituary();
  }, [activeTab]);

  const fetchObituary = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching obituary with filter:", activeTab);
      const res = await axios.get('https://tellicheri.onrender.com/api/import/priests/obituary', {
        params: { filter: activeTab }
      });
      console.log("✅ API response:", res.data);
      if (res.data.success) {
        setPriests(res.data.data);
      }
    } catch (err) {
      console.error('❌ Error fetching obituary:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search
  const searched = priests.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(searched.length / itemsPerPage);
  const paginated = searched.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <SideNavObituary />
        </Col>
        <Col md={9}>
          <h4 className="text-danger fw-bold mb-3">OBITUARY</h4>

          {/* Tabs */}
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={(key) => {
              setActiveTab(key);
              setCurrentPage(1);
            }}
          >
            <Nav.Item>
              <Nav.Link eventKey="after" className="text-danger fw-semibold">
                After 2020
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="before" className="fw-semibold text-dark">
                Before 2020
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Search */}
          <div className="d-flex justify-content-end mt-3">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={{ width: '220px' }}
            />
          </div>

          {/* Table */}
          <div className="table-responsive obituary-table-wrapper mt-3">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
              </div>
            ) : (
              <Table bordered hover className="obituary-table align-middle">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Name</th>
                    <th>Home Parish</th>
                    <th>Date of Birth</th>
                    <th>Ordination Date</th>
                    <th>Date of Death</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length > 0 ? (
                    paginated.map((priest, index) => (
                      <tr key={priest._id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{priest.name}</td>
                        <td>{priest.home_parish}</td>
                        <td>
                          {priest.dob
                            ? new Date(priest.dob).toLocaleDateString()
                            : '-'}
                        </td>
                        <td>
                          {priest.ordination_date
                            ? new Date(priest.ordination_date).toLocaleDateString()
                            : '-'}
                        </td>
                        <td>
                          {priest.death_date
                            ? new Date(priest.death_date).toLocaleDateString()
                            : '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}

            {/* Pagination Footer */}
            {!loading && (
              <div className="d-flex justify-content-between align-items-center px-2 py-1">
                <small>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, searched.length)} of{' '}
                  {searched.length} entries
                </small>
                <Pagination size="sm" className="mb-0">
                  <Pagination.Prev
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <Pagination.Item
                      key={idx + 1}
                      active={currentPage === idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Obituary;
