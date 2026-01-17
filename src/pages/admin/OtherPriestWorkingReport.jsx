import React, { useState } from 'react';
import {
    Container, Row, Col, Form, Button, Table, Image
} from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import logo from '../../assets/logo.png';

const allFields = [
    'Name', 'Designation', 'Photo', 'Place of Work',
    'Present Address', 'Phone', 'Mobile', 'Status'
];

const dummyData = [
    {
        'Sl No': 1,
        'Name': 'ADAPPUR FRANCIS O. CARM.',
        'Designation': 'VICAR',
        'Photo': '',
        'Place of Work': 'KANAKAPPALLY,KANAKAPPALLY,ST.THOMAS',
        'Present Address': 'ST. THOMAS CHURCH, KANAKAPPALLY P.O. 671533',
        'Mobile': '9446867266',
        'Phone': '',
        'Status': 'Active'
    },
    {
        'Sl No': 2,
        'Name': 'Amalbathinkal Joseph CRM',
        'Designation': 'Asst. Vicar',
        'Photo': '',
        'Place of Work': 'KANICHAR,KANICHAR,ST.GEORGE',
        'Present Address': '',
        'Mobile': '',
        'Phone': '',
        'Status': 'Active'
    },
    {
        'Sl No': 3,
        'Name': 'Ambattuparambil Devassy OFM Con',
        'Designation': 'Asst. Vicar',
        'Photo': '',
        'Place of Work': 'CHEMPERI,CHEMPERI,BASILICA OF OUR LADY OF LOURDE',
        'Present Address': '',
        'Mobile': '',
        'Phone': '',
        'Status': 'Active'
    }
];

const OtherPriestWorkingReport = () => {
    const [formData, setFormData] = useState({
        worksIn: '',
        placeOfWork: '',
        priestName: '',
        status: '',
        reportType: 'Priest Report',
        reportTitle: '',
        fields: new Set(['Name']) // default selected
    });

    const handleFieldToggle = (field) => {
        setFormData((prev) => {
            const updated = new Set(prev.fields);
            if (updated.has(field)) {
                updated.delete(field);
            } else {
                updated.add(field);
            }
            return { ...prev, fields: updated };
        });
    };

    const handleSelectAll = () => {
        setFormData((prev) => ({
            ...prev,
            fields: new Set(prev.fields.size < allFields.length ? allFields : [])
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching with:', formData);
        // Future: Add filtering logic or API call
    };

    return (
        <AdminLayout>
            <Container fluid className="mt-3">
                <h4 className="mb-3">Other Priest Working <small className="text-muted">Report</small></h4>

                {/* FORM */}
                <Form onSubmit={handleSearch}>
                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>Works in</Form.Label>
                            <Form.Select name="worksIn" onChange={handleInputChange}>
                                <option value="">--select category--</option>
                            </Form.Select>
                        </Col>

                        <Col md={3}>
                            <Form.Label>Place of Work</Form.Label>
                            <Form.Select name="placeOfWork" onChange={handleInputChange}>
                                <option value="">--select a place of work--</option>
                            </Form.Select>
                        </Col>

                        <Col md={3}>
                            <Form.Label>Priest Name (Max. 10 priests)</Form.Label>
                            <Form.Control
                                type="text"
                                name="priestName"
                                placeholder="Select a Priest"
                                onChange={handleInputChange}
                            />
                        </Col>

                        <Col md={3}>
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" onChange={handleInputChange}>
                                <option value="">--select a status--</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>Report Type</Form.Label>
                            <Form.Select name="reportType" value={formData.reportType} onChange={handleInputChange}>
                                <option value="Priest Report">Priest Report</option>
                            </Form.Select>
                        </Col>

                        <Col md={3} className="d-flex align-items-end">
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
                                    onChange={() => handleFieldToggle(field)}
                                />
                            </Col>
                        ))}
                    </Row>

                    <Row className="mt-4">
                        <Col md={6}>
                            <Form.Label>Report Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="reportTitle"
                                placeholder="Enter Report Title"
                                value={formData.reportTitle}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col md={3} className="d-flex align-items-end">
                            <Button variant="primary" type="submit" className="w-100">Search</Button>
                        </Col>
                    </Row>
                </Form>

                {/* EXPORT BUTTONS */}
                <div className="d-flex gap-3 mt-4 mb-4">
                    <Button variant="danger">Create PDF</Button>
                    <Button variant="success">Create DOC</Button>
                    <Button variant="warning">Create Excel</Button>
                </div>

                {/* HEADER SECTION */}
                <div className="text-center mb-4">

                    <img src={logo} alt="logo" height={60} className="mb-2" />
                    <h4>ARCHDIOCESE OF TELLICHERRY</h4>
                    <strong>{formData.reportTitle || 'PRIEST LIST'} 2025</strong>
                </div>

                {/* DATA TABLE */}
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            {[...formData.fields].map((field, index) => (
                                <th key={index}>{field}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dummyData.map((priest, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{priest['Sl No']}</td>
                                {[...formData.fields].map((field, colIndex) => (
                                    <td key={colIndex}>
                                        {field === 'Photo'
                                            ? <Image src={priest[field] || "https://via.placeholder.com/50"} fluid rounded style={{ height: '50px' }} />
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

export default OtherPriestWorkingReport;
