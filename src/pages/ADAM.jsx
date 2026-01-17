import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const ADAM = () => {
    return (
        <Container fluid className="p-4">
            <Row>
                <Col md={3}>
                    <DepartmentSidebar />
                </Col>

                <Col md={9}>
                    <Card className="p-4 shadow-sm">
                        {/* Heading */}
                        <h4 className="text-danger fw-bold mb-3">ADAM</h4>

                        {/* Intro */}
                        <p>
                            <strong>Accompanying Differently - abled and Awakening Mission (ADAM).</strong> On 16 September 2017 His Grace Mar George Njaralakkattu inaugurated the new mission of the archdiocese of Thalassery called Accompanying Differently-abled and Awakening mission.
                        </p>

                        {/* Body */}
                        <p>
                            Inspired by the compassionate love of Jesus Christ ADAM ministry serve differently-abled, especially the deaf and mentally challenged.
                            We provide Holy Mass, Confession, and other Sacraments, Pre-marital courses, Catechism, Bible studies, Retreats, moral teachings,
                            counselling, etc. in Indian Sign Language. ADAM supports the Deaf community through Sign Language interpretation in hospitals, government
                            offices, courts, etc...
                        </p>

                        {/* YouTube */}
                        <p>
                            Through our YouTube channel{' '}
                            <a
                                href="https://youtube.com/channel/UCVLFKVfFn2IxebKk08d4YJw"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://youtube.com/channel/UCVLFKVfFn2IxebKk08d4YJw
                            </a>{' '}
                            "Ephphatha Sign Language Mission" , We give important news, season-based messages, Holy Mass, Bible Studies, etc...
                            ADAM has Sign Language Holy Mass Centers and deaf Bible study forums in different parts of India.
                        </p>

                        {/* Motto Box */}
                        <div
                            className="text-white fw-bold text-center my-4 mx-auto"
                            style={{
                                background: 'linear-gradient(135deg, #a11d2f, #ea7e94)',
                                padding: '25px',
                                borderRadius: '10px',
                                width: '50%',
                                boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                                fontSize: '15px',
                            }}
                        >
                            <h5 className="fw-bold mb-2">MOTTO</h5>
                            <p className="mb-0 text-white text-center">
                                "To accompany the differently-abled to improve their<br />
                                social, spiritual, and economic status of life"
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ADAM;
