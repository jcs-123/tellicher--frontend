import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Form, Button,
  Table, InputGroup, FormControl, Spinner
} from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';

const ParishList = () => {
  const [filters, setFilters] = useState({
    foraneName: '',
    parishType: '',
    status: '',
    isShrine: false,
  });

  const [parishData, setParishData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchParishes = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/parishes');
      setParishData(res.data);
    } catch (error) {
      console.error('Error fetching parish data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParishes();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilters({ ...filters, [name]: type === 'checkbox' ? checked : value });
  };

  const filteredData = parishData.filter((item) => {
    return (
      (filters.foraneName ? item.forane_id === filters.foraneName : true) &&
      (filters.parishType ? item.type === filters.parishType : true) &&
      (filters.status ? item.status === filters.status : true) &&
      (filters.isShrine ? item.shrine?.trim() !== '' : true) &&
      (searchText
        ? item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.place.toLowerCase().includes(searchText.toLowerCase()) ||
          (item.vicar_id || '').toString().includes(searchText)
        : true)
    );
  });

  return (
    <AdminLayout>
      <Container fluid>
        <h4 className="mt-4 mb-3">Parish <small className="text-muted">List</small></h4>

        <Form className="p-3 border rounded bg-light mb-3">
          <Row>
            <Col md={3} className="mb-2">
              <Form.Control
                name="foraneName"
                placeholder="Filter by Forane ID"
                value={filters.foraneName}
                onChange={handleFilterChange}
              />
            </Col>
            <Col md={3} className="mb-2">
              <Form.Control
                name="parishType"
                placeholder="Filter by Type"
                value={filters.parishType}
                onChange={handleFilterChange}
              />
            </Col>
            <Col md={3} className="mb-2">
              <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">-- Select Status --</option>
                <option value="A">Active</option>
                <option value="I">Inactive</option>
              </Form.Select>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Shrine"
                name="isShrine"
                checked={filters.isShrine}
                onChange={handleFilterChange}
              />
            </Col>
            <Col md={1} className="text-end">
              <Button variant="primary" className="w-100" onClick={fetchParishes}>Search</Button>
            </Col>
          </Row>
        </Form>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Form.Select style={{ width: '100px' }}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </Form.Select>
          <InputGroup style={{ width: '300px' }}>
            <FormControl
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="bg-white">
            <thead className="table-light">
              <tr>
                <th>Sl No</th>
                <th>Parish Name</th>
                <th>Place</th>
                <th>Forane Name</th>
                <th>Parish Type</th>
                <th>Vicar Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((parish, index) => (
                <tr key={parish._id}>
                  <td>{index + 1}</td>
                  <td>{parish.name}</td>
                  <td>{parish.place}</td>
                  <td>{parish.forane_id || '-'}</td>
                  <td>{parish.type}</td>
                  <td>{parish.vicar_id || '-'}</td>
                  <td>{parish.status === 'A' ? 'Active' : 'Inactive'}</td>
                  <td className="text-success" style={{ cursor: 'pointer' }}>
                    <FaUpload className="me-1" /> Upload
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </AdminLayout>
  );
};

export default ParishList;
