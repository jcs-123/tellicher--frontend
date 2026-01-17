import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const VincentDePaul = () => {
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
                        {/* Title */}
                        <h4 className="text-danger fw-bold mb-3">ST. VINCENT DE PAUL SOCIETY</h4>

                        {/* Description */}
                        <p>
                            The Society of Saint Vincent de Paul is an international organisation formed of lay Catholics,
                            who seek personal and spiritual growth through service to those most in need.
                        </p>
                        <p>
                            <strong>Paris, France – 23 April 1833:</strong> A group of young university students, seeing the social inequality and injustice around them,
                            decided to take action. They formed the first <em>“Conference of Charity”</em>, a group of friends who wanted to share their faith and put it into action.
                        </p>
                        <p>
                            Prayer and action came together in their visits to the Mouffetard district, one of the poorest parts of Paris.
                            It was a Daughter of Charity, <strong>Sister Rosalie Rendu</strong>, who guided and supported them, instructing them about the teachings of <strong>Saint Vincent de Paul</strong>.
                        </p>

                        <h6 className="fw-bold mt-4">FORMATION & GROWTH</h6>
                        <p>
                            In 1834, the Conferences took St. Vincent as their patron saint and dedicated themselves to the Blessed Virgin Mary.
                            In 1835, the first Rule was drafted. By 1839, the <strong>International Council General</strong> was officially formed.
                        </p>

                        <h6 className="fw-bold mt-4">PRESENT GLOBAL PRESENCE</h6>
                        <p>
                            Today, the Society of Saint Vincent de Paul is active in over <strong>150 countries</strong>, with:
                        </p>
                        <ul>
                            <li><strong>800,000 members</strong></li>
                            <li><strong>1,500,000 volunteers</strong></li>
                            <li><strong>30+ million people</strong> helped every day</li>
                        </ul>
                        <p>
                            The SSVP is an associate member of <strong>UNESCO</strong> and a special adviser to the <strong>UN Economic and Social Council (ECOSOC)</strong>.
                            It is also aligned with the <strong>17 Sustainable Development Goals</strong> (SDGs) under the <strong>UN Agenda 2030</strong>, and is part of the Global Catholic Climate Movement.
                        </p>

                        <h6 className="fw-bold mt-4">CONTACT INFO</h6>
                        <p>
                            🌐{' '}
                            <a href="https://www.ssvpglobal.org" target="_blank" rel="noopener noreferrer">
                                www.ssvpglobal.org
                            </a>
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default VincentDePaul;
