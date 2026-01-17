import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';
import DepartmentSidebar from '../components/SideNavDepartment';

const TRAC = () => {
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
                        <h4 className="text-danger fw-bold mb-3">TRAC</h4>
                        <p>
                            <strong>Thalassery Renewal and Animation Centre (TRAC)</strong> is the official retreat and renewal centre of the Archdiocese of Thalassery.
                            It was inaugurated with the mission of animating and spiritually renewing priests, religious, and the laity through retreats, seminars, and
                            formation programs. TRAC is envisioned as a spiritual powerhouse for the diocese.
                        </p>
                        <p>
                            The centre organizes annual retreats for priests and religious, charismatic conventions, Bible-based retreats, youth animation programs,
                            counselling sessions, marriage preparation courses, and leadership training programs. It fosters an atmosphere of spiritual awakening and pastoral
                            empowerment, helping participants to deepen their relationship with God and the Church.
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

export default TRAC;
