import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';
import DepartmentSidebar from '../components/SideNavDepartment';

const TSSS = () => {
    return (
        <Container fluid className="py-4 px-3">
            <Row>
                <Col md={3}>
                    <DepartmentSidebar />
                </Col>

                <Col md={9}>
                    <Card className="border-0 shadow-sm p-4">
                        <h3 className="text-danger fw-bold mb-3 border-bottom pb-2">TSSS – Tellicherry Social Service Society</h3>
                        
                        <section className="mb-4">
                            <p><strong>TSSS – An NGO since 1966 with 55+ years of service.</strong></p>
                            <p>
                                Tellicherry Social Service Society (TSSS) is the official social work arm of the Archdiocese of Tellicherry.
                                Founded in 1966, it aims to uplift economically and socially disadvantaged people regardless of caste, creed, or community.
                            </p>
                            <p>
                                With a shift from charity to a Human Rights-Based approach, TSSS focuses on the Malabar region in the Western Ghats.
                                It is part of NGO networks like Caritas, SAFP, and Kerala Social Service Forum. It addresses advocacy, regional issues,
                                environmental and gender concerns, and child rights while collaborating with Panchayat Raj institutions.
                            </p>
                        </section>

                        <Row className="mb-4">
                            <Col md={6} className="mb-3 mb-md-0">
                                <Card className="h-100 border-warning border-2 shadow-sm">
                                    <Card.Body>
                                        <h6 className="fw-bold text-warning mb-3">🌟 Our Vision</h6>
                                        <p className="mb-0">
                                            A society of equals founded on divine love where everybody enjoys absolute freedom.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="h-100 border-danger border-2 shadow-sm">
                                    <Card.Body>
                                        <h6 className="fw-bold text-danger mb-3">🎯 Our Mission</h6>
                                        <p className="mb-0">
                                            The holistic development of the community towards self-reliance with a preferential
                                            option for the deprived sections.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <section className="mb-4">
                            <h5 className="fw-bold mb-2"><FaGlobe className="me-2 text-primary" /> Contact Info</h5>
                            <a href="https://www.tsssthalassery.org" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                www.tsssthalassery.org
                            </a>
                        </section>

                        <section>
                            <h5 className="fw-bold mb-3">📌 Our Departments & Programs</h5>
                            <ul className="ps-3">
                                <li><strong>I. Human and Institutional Building</strong>
                                    <ul>
                                        <li>Credit Union</li>
                                        <li>Women Development Programs</li>
                                        <li>Children’s Group (Balamithra)</li>
                                    </ul>
                                </li>
                                <li>II. Family Development Programs (FDP)</li>
                                <li>III. Community Based Rehabilitation (CBR)</li>
                                <li>IV. Natural Resource Management (NRM)</li>
                                <li>V. Entrepreneurship & Livelihood Development Program (ELDP)</li>
                                <li>VI. Human Resource Development & Management</li>
                                <li>VII. Community Health & Insurance Department (CHID)</li>
                                <li>VIII. Housing and Sanitation</li>
                                <li>IX. School Social Work</li>
                                <li>X. Childline
                                    <ul>
                                        <li>FCC & SPC</li>
                                    </ul>
                                </li>
                                <li>XI. Kerala Labour Movement (KLM)</li>
                                <li>XII. Training, Research & Documentation</li>
                                <li><strong>XIII. Institutions</strong>
                                    <ul>
                                        <li>Sanjose Employment & Production Centre</li>
                                        <li>Matha Umbrellas</li>
                                        <li>Madonna Fashion Institute</li>
                                        <li>Bhagawathpatha ITC, Paisakkary</li>
                                        <li>Family Counseling Centre</li>
                                        <li>Aishwarya Curry Powder Unit, Nellicampoyil</li>
                                        <li>Haritha Cashew Processing Unit, Kunnoth</li>
                                        <li>Matha Training Centre (MTC)</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TSSS;
