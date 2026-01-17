import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout'; // Use your existing AdminLayout
// import './SecondaryStatusList.css'; // optional, for minor custom styling

const dummyData = [
  { id: 1, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Parish', order: 1, state: 'Active' },
  { id: 2, mainStatus: 'Priest outside diocese in India', secondaryStatus: 'Ministry', order: 1, state: 'Active' },
  { id: 3, mainStatus: 'Priest Abroad', secondaryStatus: 'Ministry', order: 1, state: 'Active' },
  { id: 4, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Institution', order: 2, state: 'Active' },
  { id: 5, mainStatus: 'Priest in the Diocese', secondaryStatus: 'Departments', order: 2, state: 'Active' },
  { id: 6, mainStatus: 'Priest Abroad', secondaryStatus: 'Study', order: 2, state: 'Active' },
  { id: 7, mainStatus: 'Priest outside diocese in India', secondaryStatus: 'Study', order: 2, state: 'Active' },
  { id: 8, mainStatus: 'Priest outside diocese in India', secondaryStatus: 'Institution', order: 3, state: 'Active' },
  { id: 9, mainStatus: 'Priest outside diocese in India', secondaryStatus: 'Ministry & Study', order: 3, state: 'Active' },
  { id: 10, mainStatus: 'Priest Abroad', secondaryStatus: 'Ministry & Study', order: 3, state: 'Active' },
];

const SecondaryStatusList = () => {
  const [mainStatus, setMainStatus] = useState('');
  const [state, setState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = dummyData.filter(item =>
    item.mainStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.secondaryStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <Container fluid className="mt-4">
        <div className="p-3 shadow-sm bg-white mb-4">
          <h5 className="mb-3">Secondary Status <small className="text-muted">List</small></h5>
          <Row className="align-items-end">
            <Col md={4}>
              <Form.Label>Main Status</Form.Label>
              <Form.Select value={mainStatus} onChange={e => setMainStatus(e.target.value)}>
                <option>-- Select a main status --</option>
                <option>Priest in the Diocese</option>
                <option>Priest outside diocese in India</option>
                <option>Priest Abroad</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>State</Form.Label>
              <Form.Select value={state} onChange={e => setState(e.target.value)}>
                <option>--select a state --</option>
                <option>Active</option>
                <option>Inactive</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Button variant="primary" className="w-100">Search</Button>
            </Col>
          </Row>
        </div>

        <div className="p-3 shadow-sm bg-white">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Show</Form.Label>
              <Form.Select className="d-inline w-auto mx-2">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </Form.Select>
              entries
            </Col>
            <Col md={6} className="text-end">
              <InputGroup className="w-50 ms-auto">
                <FormControl
                  placeholder="Search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Main status</th>
                <th>Secondary status</th>
                <th>Display Order</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.mainStatus}</td>
                    <td>{item.secondaryStatus}</td>
                    <td>{item.order}</td>
                    <td>{item.state}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No records found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default SecondaryStatusList;
