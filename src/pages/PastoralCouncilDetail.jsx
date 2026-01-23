import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Spinner, Alert, Table } from 'react-bootstrap'; // Added Table import
import SideNavPriests from '../components/SideNavPriests';
import axios from 'axios';
// import './PastoralCouncilDetail.css';

const PastoralCouncilDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://tellicheri.onrender.com/api/pastoralCouncil/${id}`);
        setMember(data);
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMemberDetails();
    } else {
      setError('No member ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Container fluid className="py-4">
        <Row>
          <Col md={3} lg={3} className="sidebar-container" style={{ paddingLeft: '0px' }}>
            <SideNavPriests />
          </Col>
          <Col md={9} lg={9} className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (error || !member) {
    return (
      <Container fluid className="py-4">
        <Row>
          <Col md={3} lg={3} className="sidebar-container" style={{ paddingLeft: '0px' }}>
            <SideNavPriests />
          </Col>
          <Col md={9} lg={9}>
            <Button variant="secondary" className="mb-3" onClick={() => navigate('/pastoral-council')}>
              ← Back to Council
            </Button>
            <Alert variant="danger">{error || 'No member data available'}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4 pastoral-detail-container">
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={3} className="sidebar-container" style={{ paddingLeft: '0px' }}>
          <SideNavPriests />
        </Col>

        {/* Main Content */}
        <Col md={9} lg={9}>
          <Button variant="secondary" className="mb-3" onClick={() => navigate('/pastoral-council')}>
            ← Back to Council
          </Button>

          <div className="member-header mb-4">
            <h2 className="text-primary fw-bold">{member.name || 'Unnamed Member'}</h2>
            <Badge bg="dark" className="designation-badge">{member.designation || '-'}</Badge>
          </div>

          <Row>
            <Col md={8}>
              <Card className="mb-4">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Personal Information</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Category:</strong></Col>
                    <Col sm={8}>{member.category || '-'}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Current Working Place:</strong></Col>
                    <Col sm={8}>{member.place || member.workingPlace || 'Thalassery'}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Home Parish:</strong></Col>
                    <Col sm={8}>{member.parish || member.homeParish || 'CHEMPERI'}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Current Status:</strong></Col>
                    <Col sm={8}>{member.status || 'Priest in the Diocese'}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Date of Birth:</strong></Col>
                    <Col sm={8}>{member.dob || '14 Mar'}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Feast Day:</strong></Col>
                    <Col sm={8}>{member.feastDay || 'June 13'}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Mobile:</strong></Col>
                    <Col sm={8}>{member.phone || '9447359733'}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={4}><strong>Email:</strong></Col>
                    <Col sm={8}>{member.email || '-'}</Col>
                  </Row>
                  <Row>
                    <Col sm={4}><strong>Address:</strong></Col>
                    <Col sm={8}>{member.address || "Archbishop's House, Archbishop's House, Plc, No. 70, Thalassery 670101"}</Col>
                  </Row>
                </Card.Body>
              </Card>

              {member.serviceHistory && member.serviceHistory.length > 0 && (
                <Card>
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">SERVICE HISTORY</h5>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Place</th>
                          <th>Designation</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {member.serviceHistory.map((service, index) => (
                          <tr key={index}>
                            <td>{service.type || '-'}</td>
                            <td>{service.place || '-'}</td>
                            <td>{service.designation || '-'}</td>
                            <td>{service.duration || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
            </Col>

            <Col md={4}>
              <Card className="mb-4">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Profile Photo</h5>
                </Card.Header>
                <Card.Body className="text-center">
                  <div className="profile-placeholder">
                    {member.photo ? (
                      <img 
                        src={member.photo} 
                        alt={member.name} 
                        className="profile-image"
                      />
                    ) : (
                      <i className="bi bi-person-circle" style={{fontSize: '6rem', color: '#6c757d'}}></i>
                    )}
                  </div>
                  <Button variant="outline-primary" className="mt-3">Upload Photo</Button>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Quick Actions</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Button variant="outline-dark">
                      <i className="bi bi-pencil me-2"></i>Edit Profile
                    </Button>
                    <Button variant="outline-dark">
                      <i className="bi bi-printer me-2"></i>Print Profile
                    </Button>
                    <Button variant="outline-dark">
                      <i className="bi bi-envelope me-2"></i>Send Message
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PastoralCouncilDetail;