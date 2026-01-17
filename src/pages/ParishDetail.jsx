// src/pages/ParishDetail.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Alert, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import SideNavParish from '../components/SideNavParish';
import './ParishDetail.css';

const ParishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parish, setParish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for former priests (you'll need to add this to your backend)
  const formerPriestsData = [
    { from: '02/02/1991', to: '07/05/1993', name: 'Fr. Vadakkemuriyil Thomas', designation: 'VICAR', home_parish: 'PERAVOOR' },
    { from: '08/05/1993', to: '04/11/1995', name: 'Fr. Mundaplackal Kuriakose', designation: 'VICAR', home_parish: 'KONNAKKAD' },
    { from: '04/11/1995', to: '16/05/1998', name: 'Fr. Kalarickal Kuriakose', designation: 'VICAR', home_parish: 'PAISAKARY' },
    { from: '17/05/1998', to: '19/05/2001', name: 'Fr. Parathepathickal Antony', designation: 'VICAR', home_parish: 'THAYYENI' },
    { from: '20/05/2001', to: '22/05/2004', name: 'Fr. Mundolickal John', designation: 'VICAR', home_parish: 'PULIKKURUMBA' },
    { from: '23/05/2004', to: '26/02/2006', name: 'Fr. Parappalliyath Martin', designation: 'PRO-VICAR', home_parish: 'VAYATTUPARAMBA' },
    { from: '26/02/2006', to: '23/05/2009', name: 'Fr. Kalarinuriyil George', designation: 'PRO-VICAR', home_parish: 'KANNIVAYAL' },
    { from: '24/05/2009', to: '18/05/2013', name: 'Fr. Kovattu George', designation: 'VICAR', home_parish: 'PAISAKARY' },
    { from: '19/05/2013', to: '11/05/2019', name: 'Fr. Nooranmackal Joseph', designation: 'PRO-VICAR', home_parish: 'PATHENPARA' },
    { from: '12/05/2019', to: '10/05/2025', name: 'Fr. Nellithanathi Dennis', designation: 'PRO-VICAR', home_parish: 'THAJAPRANMARC' },
    { from: '11/05/2025', to: 'Present', name: 'Fr. George', designation: 'VICAR', home_parish: 'ADAMPARA' },
    { from: '01/01/2020', to: '10/05/2025', name: 'Fr. John Mathew', designation: 'ASSISTANT VICAR', home_parish: 'KANNUR' }
  ];

  useEffect(() => {
    const fetchParishDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/import/parishes/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch parish details');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setParish(result.data);
        } else {
          throw new Error('Parish not found');
        }
      } catch (error) {
        console.error('Error fetching parish details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchParishDetail();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  // Filter former priests based on search
  const filteredPriests = formerPriestsData.filter(priest =>
    priest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    priest.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    priest.home_parish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPagePriests = filteredPriests.slice(0, entriesToShow);

  if (loading) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}>
            <SideNavParish />
          </Col>
          <Col md={9} className="text-center">
            <Spinner animation="border" variant="danger" />
            <p className="mt-2">Loading parish details...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error || !parish) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}>
            <SideNavParish />
          </Col>
          <Col md={9}>
            <Alert variant="danger">
              {error || 'Parish not found'}
              <div className="mt-2">
                <Button variant="outline-danger" onClick={() => navigate('/parishes')}>
                  Back to Parishes List
                </Button>
              </div>
            </Alert>
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
          {/* Header with Back Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-danger fw-bold mb-0">{parish.name}</h4>
            <Button variant="outline-danger" size="sm" onClick={() => navigate('/parishes')}>
              Back to List
            </Button>
          </div>

          {/* Main Parish Information Card - Matching your screenshot */}
          <Card className="mb-4 parish-main-card">
            <Card.Body className="p-4">
              <Row>
                <Col md={8}>
                  <h5 className="text-danger mb-3">{parish.name}</h5>
                  <div className="parish-details">
                    <p className="mb-2">
                      <strong>Address:</strong> {parish.address || 'N/A'}
                    </p>
                    <p className="mb-2">
                      <strong>Website:</strong> {parish.website || 'N/A'}
                    </p>
                    <p className="mb-2">
                      <strong>E-mail:</strong> {parish.email || 'N/A'}
                    </p>
                    <p className="mb-2">
                      <strong>Phone:</strong> {parish.phone || 'N/A'}
                    </p>
                    <p className="mb-2">
                      <strong>Established Date:</strong> {formatDate(parish.estb_date)}
                    </p>
                    <p className="mb-2">
                      <strong>Former:</strong> {parish.forane_name || 'N/A'}
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  {/* Quick Stats Box */}
                  <div className="quick-stats-box">
                    <h6 className="text-danger mb-3">Quick Stats</h6>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-label">Assistant Vicar</div>
                        <div className="stat-value">-</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Fax</div>
                        <div className="stat-value">-</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Area sq. km</div>
                        <div className="stat-value">{parish.area || 0}</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Family Units</div>
                        <div className="stat-value">{parish.no_family_units || 0}</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Families</div>
                        <div className="stat-value">{parish.no_families || 0}</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Navigation Tabs */}
          <div className="parish-nav-tabs mb-4">
            <button className="nav-tab active">Overview</button>
            <button className="nav-tab">History</button>
            <button className="nav-tab">Former Priests</button>
            <button className="nav-tab">Gallery</button>
            <button className="nav-tab">Contact</button>
          </div>

          {/* Former Priests Section - Exact match to your screenshot */}
          <Card>
            <Card.Header className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0"># Overview History</h5>
                  <h4 className="text-danger mb-0">## Former Priests</h4>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted">Show</span>
                  <Form.Select 
                    size="sm" 
                    style={{ width: '80px' }}
                    value={entriesToShow}
                    onChange={(e) => setEntriesToShow(Number(e.target.value))}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Form.Select>
                  <span className="text-muted">entries</span>
                  <Form.Control
                    type="text"
                    placeholder="Search:"
                    size="sm"
                    style={{ width: '150px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table bordered hover className="mb-0">
                  <thead className="table-danger">
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Home Parish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPagePriests.map((priest, index) => (
                      <tr key={index}>
                        <td>{priest.from}</td>
                        <td>{priest.to}</td>
                        <td>{priest.name}</td>
                        <td>{priest.designation}</td>
                        <td>{priest.home_parish}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              
              {/* Table Footer */}
              <div className="table-footer p-3 bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">
                    Showing 1 to {currentPagePriests.length} of {filteredPriests.length} entries
                  </span>
                  <div className="pagination">
                    <button className="btn btn-sm btn-outline-secondary me-1">Previous</button>
                    <button className="btn btn-sm btn-danger me-1">1</button>
                    <button className="btn btn-sm btn-outline-secondary me-1">2</button>
                    <button className="btn btn-sm btn-outline-secondary">Next</button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ParishDetail;