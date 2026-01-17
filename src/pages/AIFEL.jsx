import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';
import DepartmentSidebar from '../components/SideNavDepartment';

const AIFEL = () => {
    return (
        <Container fluid className="p-4">
            <Row>
                {/* Sidebar */}
                <Col md={3}>
                    <DepartmentSidebar />
                </Col>

                {/* Main Content */}
                <Col md={9}>
                    <Card className="p-4 shadow-sm">
                        <h4 className="text-danger fw-bold mb-3">AIFEL</h4>
                        <p>
                            <strong>Alpha Institute for Evangelization & Leadership (AIFEL)</strong> is an Archdiocesan Institute of the Archdiocese of Thalassery
                            for empowering the faithful with knowledge, skills, and leadership rooted in the values of the Gospel. The Institute offers a
                            variety of programs and training sessions aimed at enhancing the faith formation, leadership potential, and evangelization zeal
                            of laypeople, religious, and clergy.
                        </p>
                        <p>
                            AIFEL conducts workshops, certificate courses, leadership development modules, and evangelization campaigns that are grounded
                            in biblical theology, Catholic social teaching, and the pastoral needs of our communities. It aims to cultivate spiritually mature
                            and socially responsible leaders who can actively participate in building the Church and transforming society.
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

export default AIFEL;
