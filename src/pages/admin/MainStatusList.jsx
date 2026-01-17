import React, { useState } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const MainStatusList = () => {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');

  const data = [
    { id: 1, status: 'Priest in the Diocese', displayOrder: 1, state: 'Active' },
    { id: 2, status: 'Priest Abroad', displayOrder: 2, state: 'Active' },
    { id: 3, status: 'Priest outside diocese in India', displayOrder: 3, state: 'Active' },
    { id: 4, status: 'Deceased', displayOrder: 4, state: 'Active' },
    { id: 5, status: 'Hidden', displayOrder: 5, state: 'Active' },
    { id: 6, status: 'On Leave', displayOrder: 6, state: 'Active' },
  ];

  const filteredData = data.filter((item) =>
    item.status.toLowerCase().includes(search.toLowerCase()) &&
    (state === '' || item.state === state)
  );

  return (
    <AdminLayout>
      <Container fluid className="py-4">
        <h4 className="mb-3">Main Status <small className="text-muted">List</small></h4>
        
        <Row className="mb-3">
          <Col md={4}>
            <Form.Select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">--select a state --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button className="w-100">Search</Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="entriesSelect">
              <Form.Label>Show</Form.Label>
              <Form.Select size="sm" className="d-inline-block w-auto mx-2">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </Form.Select>
              <span>entries</span>
            </Form.Group>
          </Col>
          <Col md={6}>
            <InputGroup className="float-end w-50">
              <Form.Control
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Main Status</th>
              <th>Display Order</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.status}</td>
                <td>{item.displayOrder}</td>
                <td>{item.state}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between align-items-center">
          <span>Showing 1 to {filteredData.length} of {data.length} entries</span>
          <div>
            <Button size="sm" variant="outline-secondary" className="me-1" disabled>Previous</Button>
            <Button size="sm" variant="primary" className="me-1">1</Button>
            <Button size="sm" variant="outline-secondary">Next</Button>
          </div>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default MainStatusList;
