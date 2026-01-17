import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, Button, Table, InputGroup } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const PriestList = () => {
  const [search, setSearch] = useState('');

  const dummyData = [
    {
      name: 'ACHANDIYIL GEORGE',
      designation: 'VICAR',
      homeParish: 'PADUPPU',
      dob: '31-05-1981',
      feast: 'April 24',
      ordination: '01-01-2009',
      status: 'Priest in the Diocese - Parish( Vicar )',
    },
    {
      name: 'ANACHARIL JOSEPH',
      designation: 'VICAR',
      homeParish: 'KARUVANCHAL',
      dob: '30-05-1989',
      feast: 'March 19',
      ordination: '27-12-2014',
      status: 'Priest in the Diocese - Parish( Vicar )',
    },
    {
      name: 'ANAKKALLIL JAMES',
      designation: 'RETIRED',
      homeParish: 'THERMALA',
      dob: '10-08-1946',
      feast: 'July 25',
      ordination: '22-12-1972',
      status: 'Priest in the Diocese - Retired',
    },
    {
      name: 'ANAKKALLIL ANTONY',
      designation: 'VICAR',
      homeParish: 'MANGOD',
      dob: '15-12-1966',
      feast: 'June 13',
      ordination: '30-12-1992',
      status: 'Priest in the Diocese - Parish( Vicar )',
    },
    {
      name: 'ANANICKAL JOSE',
      designation: 'PASTORAL MINISTRY- ABROAD',
      homeParish: 'KONNAKKAD',
      dob: '23-12-1983',
      feast: 'March 19',
      ordination: '02-01-2010',
      status: 'Abroad Ministry',
    },
  ];

  const filteredData = dummyData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <Container fluid className="py-4">
        <Card className="shadow-sm">
          <Card.Header><h5 className="mb-0">Priest <small className="text-muted">List</small></h5></Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="homeParish">
                  <Form.Label>Home Parish</Form.Label>
                  <Form.Select>
                    <option>-- Select Home parish --</option>
                    <option>PADUPPU</option>
                    <option>KARUVANCHAL</option>
                    <option>THERMALA</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="mainStatus">
                  <Form.Label>Main Status</Form.Label>
                  <Form.Select>
                    <option>--Select Main Status--</option>
                    <option>Active</option>
                    <option>Retired</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="secondaryStatus">
                  <Form.Label>Secondary Status</Form.Label>
                  <Form.Select>
                    <option>--Select Secondary Status--</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="secondarySubStatus">
                  <Form.Label>Secondary Sub Status</Form.Label>
                  <Form.Select>
                    <option>--Select Secondary Sub Status--</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" className="mb-3">Search</Button>

            <Row className="mb-2">
              <Col xs={6}>
                <Form.Select style={{ width: '80px' }}>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </Form.Select>
              </Col>
              <Col xs={6} className="text-end">
                <InputGroup className="mb-2" style={{ maxWidth: '250px', float: 'right' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>

            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Sl No</th>
                  <th>Priest Name</th>
                  <th>Designation</th>
                  <th>Home Parish</th>
                  <th>Date of Birth</th>
                  <th>Feast</th>
                  <th>Ordination Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((priest, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{priest.name}</td>
                    <td>{priest.designation}</td>
                    <td>{priest.homeParish}</td>
                    <td>{priest.dob}</td>
                    <td>{priest.feast}</td>
                    <td>{priest.ordination}</td>
                    <td>{priest.status}</td>
                    <td>
                      <a href="#!" className="text-success">
                        <i className="bi bi-cloud-arrow-up-fill"></i> Upload
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default PriestList;
