// src/pages/FilialChurches.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Pagination } from 'react-bootstrap';
import SideNavParish from '../components/SideNavParish';
import './Parishes.css';

const filialData = [
  {
    name: 'KOTTOORVAYAL, ST. MARYS',
    vicar: 'Fr. Joseph Manchapillil',
    address: 'Sreekandapuram , 670631',
    phone: '',
  },
  // Add more entries here if needed
];

const FilialChurches = () => {
  const [search, setSearch] = useState('');

  const filtered = filialData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <SideNavParish />
        </Col>
        <Col md={9}>
          <h4 className="text-danger fw-bold mb-4">FILIAL CHURCHES</h4>
          <div className="d-flex justify-content-end mb-2">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '200px' }}
            />
          </div>
          <div className="table-responsive">
            <Table bordered className="parish-table align-middle text-nowrap">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Church Name</th>
                  <th>Vicar</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? '' : 'bg-light'}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.vicar}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between px-2 py-1">
              <small>
                Showing {filtered.length > 0 ? 1 : 0} to {filtered.length} of {filtered.length} entries
              </small>
              <Pagination size="sm">
                <Pagination.Prev disabled />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Next disabled />
              </Pagination>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FilialChurches;
