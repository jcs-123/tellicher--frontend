import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const CatechismDepartment = () => {
    return (
        <Container fluid className="p-4">
            <Row>
                {/* Sidebar with small left margin */}
                <Col md={3} className="ms-2">
                    <DepartmentSidebar />
                </Col>

                {/* Main Content inside a Card */}
                <Col md={8}>
                    <Card className="p-4 shadow rounded border-0">
                        {/* Heading */}
                        <h4 className="text-danger fw-bold mb-3">CATECHISM DEPARTMENT</h4>
                        <p>
                            The Catechetical Centre is the central office of the Department of Catechesis of the Archeparchy of Tellicherry.
                            It is situated at SandesaBhavan, the Archdiocesan Pastoral Centre.
                        </p>

                        {/* MOTTO Box */}
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
                                "To Grow in Christian Maturity through Faith Formation"<br />
                                <span className="text-white">(Lk 2:52)</span>
                            </p>
                        </div>

                        {/* Contact Info */}
                        <h6 className="fw-bold mt-4">CONTACT INFO</h6>
                        <p className="mb-2">
                            📍 Department of Catechesis Catechetical and Pastoral Centre SandesaBhavan, Thalassery-670101, Kerala, INDIA
                            <br />
                            🌐{' '}
                            <a
                                href="http://www.catechismthalassery.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.catechismthalassery.org
                            </a>
                        </p>

                        {/* Aims & Objectives */}
                        <h6 className="fw-bold mt-4">AIMS & OBJECTIVES</h6>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            <li>
                                <span className="text-danger fw-bold">{'>>'}</span>{' '}
                                To Co-ordinate all the Catechetical activities of the Archeparchy
                            </li>
                            <li>
                                <span className="text-danger fw-bold">{'>>'}</span>{' '}
                                To promote and organize Sunday school catechism programs on parish, Forane and Archdiocesan level.
                            </li>
                            <li>
                                <span className="text-danger fw-bold">{'>>'}</span>{' '}
                                To organize training programs and theological study programs for Catechism teachers.
                            </li>
                        </ul>

                        {/* Organization & Functioning */}
                        <h6 className="fw-bold mt-5 text-uppercase">Organization & Functioning</h6>

                        {/* Section 1 - General Observations */}
                        <h6 className="fw-bold text-danger mt-4">
                            1. GENERAL OBSERVATIONS
                        </h6>
                        <p>
                            The Archeparchy has a well organized system of catechesis for children and youth up to the age of eighteen. 98% of the children and youth in the Archeparchy attend Catechism classes regularly. This regular formation program is of twelve years duration. Young people above the age of 18 are catechized by means of seminars, short term courses, conventions, and retreats. Adult catechesis is provided at the basic Christian Community Gatherings. Further formation is given through retreats, seminars, and conventions conducted in parishes, Forane Centers and the Archeparchial Catechetical and Pastoral Centre. The co-ordination of all these programs is the responsibility of the Archeparchial Catechetical Centre.
                        </p>

                        {/* Section 2 - The System of Sunday Schools */}
                        <h6 className="fw-bold text-danger mt-4">
                            2. THE SYSTEM OF SUNDAY SCHOOLS
                        </h6>
                        <p>
                            Catechetical formation is given to children mainly through Sunday Schools and therefore the whole program is usually known as Sunday School Catechesis. In all the parishes and filial churches we have Sunday school catechesis under the supervision of the parish priests. On every Sunday we have special Holy Masses for children from 5 to 17 years old. After the Mass they attend Catechism classes for two hours. There are 12 classes from standard I to XII. We are following the text books of the Syro-Malabar Catechetical Committee. At the end of every academic year we conduct an annual examination and thus the promotion to the next standard is duly determined. Those who complete successfully the XII standard are awarded with a Diploma in Catechism.
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CatechismDepartment;
