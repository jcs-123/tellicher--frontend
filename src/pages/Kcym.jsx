import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const KCYM = () => {
    return (
        <Container fluid className="p-4">
            <Row>
                {/* Sidebar */}
                <Col md={3} className="ms-2">
                    <DepartmentSidebar />
                </Col>

                {/* Main Content */}
                <Col md={8}>
                    <Card className="p-4 shadow rounded border-0">
                        {/* Title */}
                        <h4 className="text-danger fw-bold mb-3">KERALA CATHOLIC YOUTH MOVEMENT</h4>

                        {/* Description */}
                        <p>
                            The Kerala Catholic Youth Movement (KCYM) is an organization for the Catholic youth from three rites
                            (Roman, Syro-Malabar, and Syro-Malankara) of the Christian community of Kerala in India.
                            It is a federation of 32 Catholic diocesan youth movements of Kerala.
                            The patron saint of the Kerala Catholic Youth Movement is Saint Thomas More.
                        </p>

                        <p>
                            The youth ministries in the Arch Diocese of Thalassery was initiated in 1982 under the leadership
                            of Rev. Fr. Joseph Madakassery. The first director of KCYM was Rev. Fr. Joseph Manjappilly.
                            Since then, KCYM imprinted its mark on a variety of activities such as leadership training for youth,
                            interventions in social issues, church ministry, renewal of families, etc.
                        </p>

                        <p>
                            It consists of youngsters between the age group of 15–35 years who subscribe to Catholic values
                            and principles. However, the beneficiaries of the organization include the youth of other religions as well.
                        </p>

                        <p>
                            The main aim of KCYM is <strong>“The Integral Development of The Catholic Youth and The Total Liberation of Human Society in accordance with the Christian values.”</strong>{' '}
                            It is to coordinate and empower the human potentials of youth based on the Gospel values,
                            to make them effective agents of change in the socio-religious-political-economic and cultural
                            reality of India, especially of Kerala through National integration.
                        </p>

                        {/* Contact Info */}
                        <h6 className="fw-bold mt-4">CONTACT INFO</h6>
                        <p className="mb-2">
                            🌐{' '}
                            <a
                                href="http://www.kcymthalassery.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.kcymthalassery.com
                            </a>
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default KCYM;
