import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Table, Form } from 'react-bootstrap';
import '../pages/PastoralCouncil.css';
import SideNavAdmin from '../components/SideNavAdmin';

const councilData = {
  'Ex-Officio Member': [
    {
      name: 'Archbishop Mar Joseph Pamplany',
      designation: 'President',
      address: '',
    },
    {
      name: 'Msgr MUTHUKUNNEL ANTONY',
      designation: 'Vice President (Proto Syncellus)',
      address: '',
    },
    {
      name: 'Msgr PALAKKILLY SEBASTIAN',
      designation: 'Vice President (Syncellus)',
      address: '',
    },
  ],
  'Religious Major Superior': [],
  'Forane Vicar': [],
  'Elected Member': [],
  'Representatives of Religious': [],
  'Nominated Member': [],
  'Permanent Invitee': [],
  'Elected': [],
  
};

const PastoralCouncil = () => {
  const [search, setSearch] = useState('');
  const [activeKey, setActiveKey] = useState('0'); // for maroon effect

  const filterMembers = (members) =>
    members.filter(
      (member) =>
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.designation.toLowerCase().includes(search.toLowerCase())
    );

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
                key={category}
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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form.Group>

                  {members.length > 0 ? (
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
                          {filterMembers(members).map((member, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{member.name}</td>
                              <td>{member.designation}</td>
                              <td>{member.address || '-'}</td>
                            </tr>
                          ))}
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
    </Container>
  );
};

export default PastoralCouncil; 