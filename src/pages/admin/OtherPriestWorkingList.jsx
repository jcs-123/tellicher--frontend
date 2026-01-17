import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Table
} from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';

const dummyData = [
  {
    id: 1,
    name: 'ADAPPUR FRANCIS O. CARM.',
    designation: 'VICAR',
    place: 'KANAKAPPALLY, ST.THOMAS',
    mobile: '9446867266',
    status: 'Active'
  },
  {
    id: 2,
    name: 'AMMANATHUKUNNEL KURIAN MST',
    designation: 'VICAR',
    place: 'KODOPPALLY, ST.SEBASTIAN',
    mobile: '9446379089',
    status: 'Active'
  },
  {
    id: 3,
    name: 'CHARAMTHOTTIYIL JACOB CST',
    designation: 'VICAR',
    place: 'KOTTOOR, ST.THOMAS',
    mobile: '9048508690',
    status: 'Active'
  }
  // 👉 Add more dummy data if needed
];

const OtherPriestWorkingList = () => {
  const [filters, setFilters] = useState({
    workCategory: '',
    placeOfWork: '',
    status: ''
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching with:', filters);
    // TODO: Add backend call for filtering
  };

  return (
    <AdminLayout>
      <Container fluid className="mt-3">
        <h4 className="mb-3">Other Priest Working <small className="text-muted">List</small></h4>

        <Form onSubmit={handleSearch}>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Works in</Form.Label>
              <Form.Select name="workCategory" value={filters.workCategory} onChange={handleChange}>
                <option value="">--select category--</option>
                <option value="VICAR">VICAR</option>
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Label>Place of Work</Form.Label>
              <Form.Select name="placeOfWork" value={filters.placeOfWork} onChange={handleChange}>
                <option value="">--select a place of work--</option>
                <option value="KANAKAPPALLY">KANAKAPPALLY</option>
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={filters.status} onChange={handleChange}>
                <option value="">--select a status--</option>
                <option value="Active">Active</option>
                <option value="Retired">Retired</option>
              </Form.Select>
            </Col>

            <Col md={3} className="d-flex align-items-end">
              <Button type="submit" className="btn btn-primary w-100">Search</Button>
            </Col>
          </Row>
        </Form>

        <Table bordered responsive className="mt-3">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Priest Name</th>
              <th>Designation</th>
              <th>Place of Work</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((priest, index) => (
              <tr key={priest.id}>
                <td>{index + 1}</td>
                <td>{priest.name}</td>
                <td>{priest.designation}</td>
                <td>{priest.place}</td>
                <td>{priest.mobile}</td>
                <td>{priest.status}</td>
                <td><Button variant="link" className="text-success"><FaUpload /> Upload</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default OtherPriestWorkingList;
