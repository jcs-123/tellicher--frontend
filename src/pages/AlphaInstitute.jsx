import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';
import DepartmentSidebar from '../components/SideNavDepartment';

const AlphaInstitute = () => {
    return (
        <Container fluid className="p-4">
            <Row>
                <Col md={3}>
                    <DepartmentSidebar />
                </Col>

                <Col md={9}>
                    <Card className="p-4 shadow-sm">
                        {/* Heading */}
                        <h4 className="text-danger fw-bold mb-3">Alpha Institute</h4>

                        {/* Description */}
                        <p>
                            Alpha Institute was erected on 01-12-2006 by Archbishop Mar George Valiamattam in view of providing theological formation to everyone interested in Christian Theology. The Alpha Institute was a pioneering attempt in this field. The institute organizes the studies with an interdisciplinary and multidisciplinary approach.
                        </p>
                        <p>
                            The Alpha Institute has now grown to the echelon and extent of attracting a large clientele of students on a global level. The Institute is having study centers in various parts of the Middle East, USA, EU, Australia, Canada, etc., where contact classes are offered on a regular basis.
                        </p>
                        <p>
                            The textbooks in Malayalam and English covering all branches of theology and the theology classes in video format, covering the entire syllabus of the bachelor's and master's degree program, are made available to the students.
                        </p>

                        {/* Contact Info */}
                        <h6 className="fw-bold mt-4">CONTACT INFO</h6>
                        <p>
                            <FaGlobe className="me-2 text-danger" />
                            <a href="https://www.alphathalassery.org" target="_blank" rel="noopener noreferrer">
                                www.alphathalassery.org
                            </a>
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AlphaInstitute;
