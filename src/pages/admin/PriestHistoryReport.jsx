import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button
} from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const allHistoryFields = [
  'Designation',
  'Service Type',
  'Category Type',
  'Category Name',
  'Start Date',
  'End Date',
];

const PriestHistoryReport = () => {
  const [formData, setFormData] = useState({
    priestName: '',
    serviceType: '',
    categoryType: '',
    categoryName: '',
    fields: new Set(allHistoryFields),
  });

  const handleFieldChange = (field) => {
    const updatedFields = new Set(formData.fields);
    if (updatedFields.has(field)) {
      updatedFields.delete(field);
    } else {
      updatedFields.add(field);
    }
    setFormData({ ...formData, fields: updatedFields });
  };

  const handleSelectAll = () => {
    setFormData((prev) => ({
      ...prev,
      fields:
        prev.fields.size < allHistoryFields.length
          ? new Set(allHistoryFields)
          : new Set(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // TODO: Fetch report data based on formData
  };

  return (
    <AdminLayout>
      <Container fluid className="mt-3">
        <h4 className="mb-3">Priest History <small className="text-muted">Report</small></h4>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Priest Name</Form.Label>
              <Form.Select required>
                <option value="">Select a Priest</option>
                <option>SHINU THOMAS</option>
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Label>Service Type <span className="text-danger">*</span></Form.Label>
              <Form.Select required>
                <option value="">--Select Service Type--</option>
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Label>Category Type <span className="text-danger">*</span></Form.Label>
              <Form.Select required>
                <option value="">--Select Category Type--</option>
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Label>Category Name <span className="text-danger">*</span></Form.Label>
              <Form.Select required>
                <option value="">--Select Category Name--</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="align-items-end mb-3">
            <Col md={2}>
              <Form.Check
                type="checkbox"
                label="Select all fields"
                onChange={handleSelectAll}
                checked={formData.fields.size === allHistoryFields.length}
              />
            </Col>

            {allHistoryFields.map((field, idx) => (
              <Col key={idx} md={2}>
                <Form.Check
                  type="checkbox"
                  label={field}
                  checked={formData.fields.has(field)}
                  onChange={() => handleFieldChange(field)}
                />
              </Col>
            ))}

            <Col md={2}>
              <Button type="submit" className="w-100 btn-primary">Search</Button>
            </Col>
          </Row>
        </Form>

        {/* Placeholder for result table */}
        <hr />
        <p className="text-center text-muted">Report will be displayed here...</p>
      </Container>
    </AdminLayout>
  );
};

export default PriestHistoryReport;
