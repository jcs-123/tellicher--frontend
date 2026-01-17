import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const MediaApostolate = () => {
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
            <h4 className="text-danger fw-bold mb-3">MEDIA APOSTOLATE</h4>
            <p>
              Media Apostolate is one of the departments of the Archdiocese of Thalassery. It deals with the creation and distribution of media content related to the archdiocese. It also provides services to the various departments of archdiocese like:
            </p>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li>
                <span className="text-danger fw-bold">{'>>'}</span> Live streaming of programs
              </li>
              <li>
                <span className="text-danger fw-bold">{'>>'}</span> Video and images services
              </li>
              <li>
                <span className="text-danger fw-bold">{'>>'}</span> Video editing
              </li>
              <li>
                <span className="text-danger fw-bold">{'>>'}</span> Photo editing
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MediaApostolate;
