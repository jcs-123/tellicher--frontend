import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const CharismaticMovement = () => {
    return (
        <Container fluid className="p-4">
            <Row>
                {/* Sidebar */}
                <Col md={3}>
                    <DepartmentSidebar />
                </Col>

                {/* Main Content */}
                <Col md={9}>
                    <Card
                        className="p-4"
                        style={{
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                            borderRadius: '10px',
                            border: 'none',
                        }}
                    >
                        <h4 className="text-danger fw-bold mb-3">Charismatic Movement</h4>

                        <p>
                            The Charismatic Movement in the Archdiocese of Thalassery is dedicated to spiritual renewal through the power of the Holy Spirit. 
                            It encourages personal conversion, prayer, and active faith through worship and evangelization.
                        </p>

                        <h6 className="fw-bold mt-4">Objectives:</h6>
                        <ul>
                            <li>Deepen personal relationship with Jesus through the Holy Spirit.</li>
                            <li>Encourage active sacramental and parish life.</li>
                            <li>Spread the Gospel through prayer and spiritual gifts.</li>
                        </ul>

                        <h6 className="fw-bold mt-4">Major Activities:</h6>
                        <ul>
                            <li>Weekly prayer meetings and intercessions.</li>
                            <li>Conventions, retreats, and healing services.</li>
                            <li>Formation of prayer groups across parishes.</li>
                        </ul>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CharismaticMovement;
