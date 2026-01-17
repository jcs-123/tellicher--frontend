import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout'; // Adjust path based on your structure

const SecondarySubStatusList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dummyData = [
    { id: 1, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Parish', subStatus: 'Vicar', displayOrder: 1, state: 'Active' },
    { id: 2, mainStatus: 'Priest Abroad', secondaryStatus: 'Study', subStatus: 'ITALY', displayOrder: 1, state: 'Active' },
    { id: 3, mainStatus: 'Priest Abroad', secondaryStatus: 'Ministry', subStatus: 'AUSTRALIA', displayOrder: 1, state: 'Active' },
    { id: 4, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Institution', subStatus: 'MANAGER', displayOrder: 1, state: 'Active' },
    { id: 5, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Departments', subStatus: 'Director', displayOrder: 1, state: 'Active' },
    { id: 6, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Institution', subStatus: 'Director', displayOrder: 1, state: 'Active' },
    { id: 7, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Institution', subStatus: 'Adj. Judicial Vicar', displayOrder: 1, state: 'Active' },
    { id: 8, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Institution', subStatus: 'Asst. Procurator', displayOrder: 1, state: 'Active' },
    { id: 9, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Institution', subStatus: 'Judicial Vicar', displayOrder: 1, state: 'Active' },
    { id: 10, mainStatus: 'Priest outside diocese in India', secondaryStatus: 'Institution', subStatus: 'ASSOCIATE PROFESSOR', displayOrder: 1, state: 'Active' },
  ];

  const filteredData = dummyData.filter(row =>
    Object.values(row).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <AdminLayout>
      <Container fluid className="mt-4">
        <h4 className="mb-3">Secondary Sub Status <small className="text-muted">List</small></h4>

        {/* Filter Form */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="mainStatus">
              <Form.Label>Main Status</Form.Label>
              <Form.Select>
                <option>-- Select a main status --</option>
                <option>Priest in the Diocese</option>
                <option>Priest Abroad</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="secondaryStatus">
              <Form.Label>Secondary Status</Form.Label>
              <Form.Select>
                <option>-- Select a secondary status --</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Select>
                <option>--select a state --</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={1} className="d-flex align-items-end">
            <Button variant="primary" className="w-100">Search</Button>
          </Col>
        </Row>

        {/* Table */}
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                Show <Form.Select style={{ width: '80px', display: 'inline-block' }} size="sm">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </Form.Select> entries
              </div>
              <InputGroup style={{ width: '300px' }}>
                <FormControl
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Main status</th>
                  <th>Secondary status</th>
                  <th>Secondary Sub status</th>
                  <th>Display Order</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.mainStatus}</td>
                    <td>{row.secondaryStatus}</td>
                    <td>{row.subStatus}</td>
                    <td>{row.displayOrder}</td>
                    <td>{row.state}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default SecondarySubStatusList;
