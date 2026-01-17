import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const CatholicTeachersGuild = () => {
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
                            border: 'none'
                        }}
                    >
                        <h4 className="text-danger fw-bold mb-3">Catholic Teachers Guild</h4>
                        <p>
                            This is an organization commenced with the aim of forming Catholic teachers to be of service to the Church, society, and the nation.
                            The slogan of Catholic Teachers Guild is <strong>'A better Catholic, A better Teacher'</strong>.
                        </p>
                        <p>
                            The Kerala Catholic Teachers Guild, which was started in 1968, had its Thalassery Archdiocesan governing body members elected on 12/11/1999,
                            after which the activities of the organization gained momentum. Under this organization, all the teachers under the Corporate Educational Agency
                            were given awareness and training programs.
                        </p>
                        <p>
                            The organization is led by the Corporate Manager who is the diocesan Chaplain, along with the elected executive members from among the teachers,
                            having a President and Secretary. Thalassery Archdiocese hosted the 2004 state summit of the Kerala Catholic Teachers Guild.
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CatholicTeachersGuild;
