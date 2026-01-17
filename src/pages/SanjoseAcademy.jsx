import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';
import { FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';


const SanjoseAcademy = () => {
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
            <h4 className="text-danger fw-bold mb-3">SANJOSE ACADEMY</h4>

            <p>
              Sanjose Academy is a coaching program for the youth and the children run by the Archdiocese of Thalassery. The Academy gives training/coaching to candidates for various competitive examinations, entrance examinations, and conducts coaching for civil service, PSC and other examinations for all sections.
            </p>

            <p>
              It also renders academic, moral, technical, and educational services to the children and youth solely for philanthropic purposes and not for the purpose of profit. The Academy provides both theoretical and practical training, including vocational training.
            </p>

            <p>
              Sanjose Academy is managed by Sanjose Education and Charitable Trust, founded by the Archdiocese of Thalassery. The Trust is registered in 2018 (22549/06.08.2018) at the Sub-registry of Thalassery.
            </p>

               {/* CONTACT INFO */}
                        <h6 className="fw-bold mt-4">CONTACT INFO</h6>
                        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                            <li className="mb-2">
                                <FaMapMarkerAlt className="me-2 text-danger" />
                                Sanjose Academy, Archdiocesan Campus, Thalassery, Kerala
                            </li>
                            <li className="mb-2">
                                <FaPhone className="me-2 text-danger" />
                                +91 12345 67890
                            </li>
                            <li className="mb-2">
                                <FaEnvelope className="me-2 text-danger" />
                                contact@sanjoseacademy.com
                            </li>
                            <li className="mb-2">
                                <FaGlobe className="me-2 text-danger" />
                                <a
                                    href="https://www.sanjoseacademy.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none' }}
                                >
                                    www.sanjoseacademy.com
                                </a>
                            </li>
                        </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SanjoseAcademy;
