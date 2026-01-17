import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion, Table, Form, Modal, Button } from 'react-bootstrap';
import '../pages/PastoralCouncil.css';
import SideNavAdmin from '../components/SideNavAdmin';
import axios from 'axios';

const PastoralCouncil = () => {
  const [councilData, setCouncilData] = useState({});
  const [activeKey, setActiveKey] = useState('0'); // for maroon effect
  const [searchTerms, setSearchTerms] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchCouncil = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/pastoralCouncil');
        setCouncilData(data);
        console.log(councilData);
        
      } catch (err) {
        console.error('Error fetching pastoral council:', err);
      }
    };
    fetchCouncil();
  }, []);

  // Update search term for a category
  const handleSearchChange = (category, value) => {
    setSearchTerms({ ...searchTerms, [category]: value });
  };

  // Filter members per category
  const filterMembers = (members, category) =>
    members.filter(
      (member) =>
        member.name.toLowerCase().includes((searchTerms[category] || '').toLowerCase()) ||
        member.designation.toLowerCase().includes((searchTerms[category] || '').toLowerCase())
    );

  // Open modal with member details
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={3} className="sidebar-container" style={{ paddingLeft: '0px' }}>
          <div className="position-sticky" style={{ top: '0px' }}>
            <SideNavAdmin />
          </div>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={9}>
          <h4 className="text-danger fw-bold mb-4">PASTORAL COUNCIL</h4>
          <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
            {Object.entries(councilData).map(([category, members], index) => (
              <Accordion.Item
                eventKey={index.toString()}
                key={`${category}-${index}`}
                className={activeKey === index.toString() ? 'active-accordion' : ''}
              >
                <Accordion.Header>
                  <i className="bi bi-people-fill me-2"></i> {category}
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3" controlId={`searchBox-${index}`}>
                    <Form.Label><strong>Search:</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type name or designation"
                      value={searchTerms[category] || ''}
                      onChange={(e) => handleSearchChange(category, e.target.value)}
                    />
                  </Form.Group>

                  {members && members.length > 0 ? (
                    <div className="table-responsive">
                      <Table bordered hover className="text-center custom-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                       <tbody>
  {members && members.length > 0
    ? filterMembers(members, category).map((member, idx) => (
        <tr key={member._id || idx}>
          <td>{idx + 1}</td>
          <td>
            <span
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              onClick={() => handleMemberClick({ ...member, category })}
            >
              {member.name || '-'}
            </span>
          </td>
          <td>{member.designation || '-'}</td>
          <td>{member.address || '-'}</td>
        </tr>
      ))
    : (
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>No members found.</td>
        </tr>
      )}
</tbody>

                      </Table>
                    </div>
                  ) : (
                    <p className="text-muted">No members available for this category.</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>

      {/* Modal for Member Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Member Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && (
            <>
              <p><strong>Category:</strong> {selectedMember.category}</p>
              <p><strong>Name:</strong> {selectedMember.name}</p>
              <p><strong>Designation:</strong> {selectedMember.designation}</p>
              <p><strong>Address:</strong> {selectedMember.address || '-'}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PastoralCouncil;
