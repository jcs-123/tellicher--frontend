import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const Adsu = () => {
    return (
        <Container fluid className="p-4">
            <Row>
                {/* Sidebar */}
                <Col md={3} className="ms-2">
                    <DepartmentSidebar />
                </Col>

                {/* Main Content */}
                <Col md={8}>
                    <Card className="p-4 shadow border-0 rounded">
                        <h4 className="text-danger fw-bold mb-3">ANTI DRUGS STUDENTS UNION (ADSU)</h4>

                        <p>
                            The Anti Drugs Students Union is an association of students from schools under the corporate educational agency,
                            started on <strong>13th August 1994</strong>. The union fosters both <strong>social and personal values</strong> in young minds.
                            It was formed mainly to create awareness among students about the harmful effects of alcohol and drugs and to encourage
                            them to abstain from such substances.
                        </p>

                        <p>
                            Alcohol and drugs adversely affect a person’s health and mental state. Since a healthy mind thrives in a healthy body,
                            the members of this association take an <strong>oath every year on October 2<sup>nd</sup> (Gandhi Jayanthi)</strong> to never use alcohol or drugs.
                        </p>

                        <p>
                            Today, nearly <strong>15,000 students</strong> are actively involved in this movement. The association conducts regular
                            <strong>leadership training camps</strong> and <strong>value education programs</strong> for its members.
                        </p>

                        <p>
                            In addition to awareness campaigns, ADSU leads many value-based activities such as:
                        </p>
                        <ul>
                            <li>Work and study camps</li>
                            <li>Cartoon competitions</li>
                            <li>Literary competitions</li>
                            <li>Speech competitions</li>
                        </ul>

                        <p>
                            This powerful and inspiring student movement is guided by the <strong>Temperance Movement of the Archdiocese</strong>,
                            and the <strong>Archbishop himself is the patron</strong> of the association.
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Adsu;
