import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const Sfo = () => {
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
                        <h4 className="text-danger fw-bold mb-3">SECULAR FRANCISCAN ORDER</h4>

                        {/* Description */}
                        <p>
                            The Secular Franciscan Order is a community of Catholic men and women, of any of the Rites in communion with Rome (Latin, Byzantine, Melkite, etc.), who seek to pattern their lives after Christ in the spirit of St. Francis of Assisi. 
                            Secular Franciscans are members of the Third Order of St. Francis founded by St. Francis of Assisi 850 years ago. Originally known as the Brothers and Sisters of Penance, the Order is officially recognized by the Holy See as <em>Ordo Franciscanus Saecularis</em> (OFS).
                        </p>
                        <p>
                            It is open to any Catholic not bound by religious vows to another Religious Order. It includes laity and secular clergy (deacons, priests, bishops). Although they make a public profession, Secular Franciscans are not bound by public vows like religious orders living in community. The Third Order Regular (TOR), which emerged from the Third Order Secular, does make religious vows and lives in community.
                        </p>
                        <p>
                            The Holy See has entrusted the pastoral care and spiritual assistance of the Secular Franciscan Order to the Franciscan First Order (Friars Minor) and Franciscan TOR because they belong to the same spiritual family.
                        </p>

                        <h6 className="fw-bold mt-4">ORIGIN & MISSION</h6>
                        <p>
                            The preaching and example of St. Francis and his disciples attracted many married men and women who wanted to live the Franciscan way. Francis offered them a way of life—a rule inspired by Gospel living at home and at work, spreading Gospel values by word and example.
                            He was helped in this by Cardinal Ugolino, who later became Pope Gregory IX.
                        </p>
                        <p>
                            The Rule inspired people to embrace prayer, humility, peacemaking, charity, self-denial, and service to others—especially lepers and the outcast.
                        </p>

                        <h6 className="fw-bold mt-4">HISTORY IN INDIA</h6>
                        <p>
                            During the pontificate of Pope Leo XIII (1878–1903), a member of the OFS himself, the Third Order was officially implanted in India. He strongly advocated for its spread and commissioned the Capuchins of Lombardy, Italy, to initiate it in North India.
                        </p>
                        <p>
                            Although the movement declined in North India after the Italian Capuchins left, it flourished in South India. The beginnings of OFS in India by region:
                        </p>
                        <ul>
                            <li><strong>&gt;&gt;</strong> Goa – <strong>1770</strong></li>
                            <li><strong>&gt;&gt;</strong> Kerala – <strong>1868</strong></li>
                            <li><strong>&gt;&gt;</strong> North India – <strong>1886</strong></li>
                            <li><strong>&gt;&gt;</strong> Karnataka – <strong>1927</strong></li>
                            <li><strong>&gt;&gt;</strong> Tamil Nadu – <strong>1933</strong></li>
                            <li><strong>&gt;&gt;</strong> Maharashtra – <strong>1964</strong></li>
                        </ul>

                        <h6 className="fw-bold mt-4">PRESENT STATUS</h6>
                        <p>
                            Today, in India, there are <strong>87 Regions</strong>, <strong>725 local fraternities</strong>, and over <strong>18,000+ members</strong>.
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Sfo;
