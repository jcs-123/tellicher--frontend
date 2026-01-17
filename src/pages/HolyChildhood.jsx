import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const HolyChildhood = () => {
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
                        {/* Heading */}
                        <h4 className="text-danger fw-bold mb-3">HOLY CHILDHOOD</h4>

                        {/* Description */}
                        <p>
                            Tirubalasakayam is an organization of Catholic children, that aims to the growth of children in the model of Child Jesus.
                            It was officially inaugurated in the diocese in the year 1993 under the efficient leadership of Rev. Fr. Antony Thekkemury.
                            The organization grew and flourished into four regions namely Kanhangad, Alakkode, Chemperi, and Iritty, with 16 subregions and 214 branches.
                        </p>
                        <p>
                            The motto of Thirubalasakham is
                            <em> "let the children help the children and pray for one another"</em>.
                            With this in mind, the children carry out this motto with full enthusiasm and vigor,
                            under the patronage of Child Jesus and Mother Mary.
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
                                "Let the children help the children and pray for one another"
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HolyChildhood;
