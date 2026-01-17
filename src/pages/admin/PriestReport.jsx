import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Table, Image
} from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import logo from '../../assets/logo.png';

const allFields = [
  'Sl No', 'Name', 'Official name', 'Photo', 'Home parish', 'House name', 'Place', 'Dob', 'Placeofbirth',
  'Baptism date', 'Placeofbaptism', 'Baptism name', 'Feast day', 'Present address', 'Blood', 'Phone', 'Mobile',
  'Whatsapp', 'Email', 'Batch', 'Patron', 'Father name', 'Mother name', 'Brothers', 'Sisters', 'Join seminary',
  'Ordination date', 'Ordination place', 'Celebrant', 'Profession date', 'Designation', 'Current Status',
  'Education', 'Expired', 'Death date', 'Place of death', 'Place of burial', 'Languages', 'Initiatives',
  'Publications', 'Academic Contributions', 'Remarks', 'Archival code', 'Facebook', 'Twitter', 'Linkedin',
  'Googleplus', 'Instagram'
];

const dummyData = [
  {
    'Sl No': 1,
    'Name': 'NJAMATHOLIL ABRAHAM',
    'Official name': 'SHINU THOMAS',
    'Photo': 'https://via.placeholder.com/50',
    'Home parish': 'VELIMANAM',
    'House name': 'NJAMATHOLIL',
    'Place': 'Studies - Rome',
    'Dob': '12/05/1987',
    'Placeofbirth': 'VELIMANAM',
    'Baptism date': '01/01/1988',
    'Placeofbaptism': 'VELIMANAM',
    'Baptism name': 'SHINU',
    'Feast day': '24/12',
    'Present address': 'VELIMANAM HOUSE',
    'Blood': 'O+',
    'Phone': '0490-123456',
    'Mobile': '9876543210',
    'Whatsapp': '9876543210',
    'Email': 'shinu@example.com',
    'Batch': '2005',
    'Patron': 'St. Thomas',
    'Father name': 'Thomas',
    'Mother name': 'Mary',
    'Brothers': '2',
    'Sisters': '1',
    'Join seminary': '01/06/2006',
    'Ordination date': '29/05/2014',
    'Ordination place': "ST. PETER'S BASILICA",
    'Celebrant': 'Pope Francis',
    'Profession date': '30/05/2015',
    'Designation': 'Priest',
    'Current Status': 'Active',
    'Education': 'M.Th',
    'Expired': 'No',
    'Death date': '',
    'Place of death': '',
    'Place of burial': '',
    'Languages': 'English, Malayalam',
    'Initiatives': 'Missionary Work',
    'Publications': 'Books',
    'Academic Contributions': 'Theology Lectures',
    'Remarks': 'No remarks',
    'Archival code': 'A123',
    'Facebook': 'shinu.fb',
    'Twitter': 'shinu_tw',
    'Linkedin': 'shinu_linkedin',
    'Googleplus': 'shinu_gplus',
    'Instagram': 'shinu_insta'
    
  },
  {
  'Sl No': 2,
    'Name': 'NJAMATHOLIL ABRAHAM',
    'Official name': 'SHINU THOMAS',
    'Photo': 'https://via.placeholder.com/50',
    'Home parish': 'VELIMANAM',
    'House name': 'NJAMATHOLIL',
    'Place': 'Studies - Rome',
    'Dob': '12/05/1987',
    'Placeofbirth': 'VELIMANAM',
    'Baptism date': '01/01/1988',
    'Placeofbaptism': 'VELIMANAM',
    'Baptism name': 'SHINU',
    'Feast day': '24/12',
    'Present address': 'VELIMANAM HOUSE',
    'Blood': 'O+',
    'Phone': '0490-123456',
    'Mobile': '9876543210',
    'Whatsapp': '9876543210',
    'Email': 'shinu@example.com',
    'Batch': '2005',
    'Patron': 'St. Thomas',
    'Father name': 'Thomas',
    'Mother name': 'Mary',
    'Brothers': '2',
    'Sisters': '1',
    'Join seminary': '01/06/2006',
    'Ordination date': '29/05/2014',
    'Ordination place': "ST. PETER'S BASILICA",
    'Celebrant': 'Pope Francis',
    'Profession date': '30/05/2015',
    'Designation': 'Priest',
    'Current Status': 'Active',
    'Education': 'M.Th',
    'Expired': 'No',
    'Death date': '',
    'Place of death': '',
    'Place of burial': '',
    'Languages': 'English, Malayalam',
    'Initiatives': 'Missionary Work',
    'Publications': 'Books',
    'Academic Contributions': 'Theology Lectures',
    'Remarks': 'No remarks',
    'Archival code': 'A123',
    'Facebook': 'shinu.fb',
    'Twitter': 'shinu_tw',
    'Linkedin': 'shinu_linkedin',
    'Googleplus': 'shinu_gplus',
    'Instagram': 'shinu_insta'
  }
  
];

const PriestReport = () => {
  const [formData, setFormData] = useState({
    reportTitle: 'PRIEST LIST',
    fields: new Set(allFields)
  });

  const handleFieldChange = (field) => {
    setFormData((prev) => {
      const updatedFields = new Set(prev.fields);
      if (updatedFields.has(field)) {
        updatedFields.delete(field);
      } else {
        updatedFields.add(field);
      }
      return { ...prev, fields: updatedFields };
    });
  };

  const handleSelectAll = () => {
    setFormData((prev) => ({
      ...prev,
      fields: new Set(prev.fields.size < allFields.length ? allFields : [])
    }));
  };

  return (
    <AdminLayout>
      <Container fluid className="mt-3">
        <h4 className="mb-3">Priest Report</h4>

        {/* ========== FORM ========== */}
        <Form>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Home Parish</Form.Label>
              <Form.Select><option>-- Select Home parish --</option></Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Main Status</Form.Label>
              <Form.Select><option>--Select Main Status--</option></Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Secondary Status</Form.Label>
              <Form.Select><option>--Select Secondary Status--</option></Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Secondary Sub Status</Form.Label>
              <Form.Select><option>--Select Secondary Sub Status--</option></Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Priest Name (Max. 10 priests)</Form.Label>
              <Form.Control type="text" placeholder="Select a Priest" />
            </Col>
            <Col md={3}>
              <Form.Label>Ordination Date From</Form.Label>
              <Form.Control type="date" />
            </Col>
            <Col md={3}>
              <Form.Label>Ordination Date Upto</Form.Label>
              <Form.Control type="date" />
            </Col>
            <Col md={3}>
              <Form.Label>Date of Birth</Form.Label>
              <div className="d-flex gap-2">
                <Form.Select><option>Day</option></Form.Select>
                <Form.Select><option>--select a Month--</option></Form.Select>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Date of Death</Form.Label>
              <div className="d-flex gap-2">
                <Form.Select><option>Day</option></Form.Select>
                <Form.Select><option>--select a Month--</option></Form.Select>
              </div>
            </Col>
            <Col md={3}>
              <Form.Label>Feast Date</Form.Label>
              <div className="d-flex gap-2">
                <Form.Select><option>Day</option></Form.Select>
                <Form.Select><option>Month</option></Form.Select>
              </div>
            </Col>
            <Col md={3}>
              <Form.Label>Report Type</Form.Label>
              <Form.Select><option>Priest Report</option></Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Report Title</Form.Label>
              <Form.Control type="text" value={formData.reportTitle} />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Check
                type="checkbox"
                label="Select all fields"
                onChange={handleSelectAll}
                checked={formData.fields.size === allFields.length}
              />
            </Col>
          </Row>

          <Row>
            {allFields.map((field, idx) => (
              <Col md={3} key={idx}>
                <Form.Check
                  type="checkbox"
                  label={field}
                  checked={formData.fields.has(field)}
                  onChange={() => handleFieldChange(field)}
                />
              </Col>
            ))}
          </Row>
        </Form>

        {/* ========== EXPORT BUTTONS ========== */}
        <div className="d-flex gap-2 mt-4 mb-4">
          <Button variant="danger">Create PDF</Button>
          <Button variant="success">Create DOC</Button>
          <Button variant="warning">Create Excel</Button>
        </div>

        {/* ========== HEADER ========== */}
        <div className="text-center mb-4">
        <img src={logo} alt="logo" height={60} className="mb-2" />
          <h4>ARCHDIOCESE OF TELLICHERRY</h4>
     
          <strong>{formData.reportTitle} 2025</strong>
        </div>

        {/* ========== TABLE ========== */}
        <Table bordered responsive>
          <thead>
            <tr>
              {[...formData.fields].map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyData.map((priest, rowIndex) => (
              <tr key={rowIndex}>
                {[...formData.fields].map((field, colIndex) => (
                  <td key={colIndex}>
                    {field === 'Photo'
                      ? <Image src={priest[field]} fluid rounded style={{ height: '50px' }} />
                      : priest[field] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default PriestReport;
