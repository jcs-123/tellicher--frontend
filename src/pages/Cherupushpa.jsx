import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const Cherupushpa = () => {
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
                        <h4 className="text-danger fw-bold mb-3">CHERUPUSHPA MISSION LEAGUE</h4>

                        {/* Description */}
                        <p>
                            The Cherupushpa Mission League was started in the Archdiocese of Thalassery in 1958
                            with the special interest of the first Bishop of the Archdiocese of Thalassery,
                            Mar Sebastian Valloppally. Under the leadership of the first director Fr. Peter Kuttiyani
                            and President Mr. Thomas Thonipara, the Cherupushpa Mission League organization branched out
                            in the Archdiocese of Thalassery.
                        </p>

                        <p>
                            We, the CML, spread to 4 regions such as Kanjakad, Allakode, Iritty, and Chemberi,
                            16 Mekhala and 210 Shakhas with the mission of missionary activities, personality development,
                            promotion of vocations to priesthood & consecrated life. Every year with the master plan,
                            CML goes forward with the motto <strong>Love, Renunciation, Service, and Endurance </strong>
                             marching ahead with enthusiasm and commitment.
                        </p>

                        <p>
                            <em>"The harvest is plenty but the laborers are few"</em> — these Holy words of Jesus are the
                            inspiration for members of the CML to work in the Vinnayed of Jesus.
                        </p>

                        {/* Contact Info */}
                        <h6 className="fw-bold mt-4">CONTACT INFO</h6>
                        <p className="mb-2">
                            🌐{' '}
                            <a
                                href="http://www.cmlthalassery.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.cmlthalassery.org
                            </a>
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cherupushpa;
