import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const Akcc = () => {
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
            <h4 className="text-danger fw-bold mb-3">ALL KERALA CATHOLIC CONGRESS (AKCC)</h4>

            <p>
              The <strong>All Kerala Catholic Congress (AKCC)</strong> is the official laity organization of the Syro-Malabar Church in Kerala.
              AKCC plays a vital role in uniting and empowering the Catholic laity to protect their rights and promote justice and peace in
              society.
            </p>

            <p>
              Within the <strong>Archdiocese of Thalassery</strong>, the AKCC maintains a strong and vibrant presence, working to foster
              <strong> social awareness</strong> among the faithful. The organization inspires people to stand together and work collectively
              towards securing their rightful place in the social and political landscape of Kerala.
            </p>

            <p>
              One of the primary objectives of AKCC is to <strong>resist unjust attacks against the Church</strong> through peaceful,
              coordinated, and united efforts. The organization encourages members to be actively involved in political life and civil society,
              aiming to bring about <strong>fundamental changes in governance and social structures</strong>.
            </p>

            <p>
              The AKCC operates with remarkable efficiency across the Archdiocese, having <strong>active units in more than 150 parishes</strong>.
              In addition, the organization is structured with <strong>16 Forane Committees</strong> and an <strong>elite Archdiocesan Committee</strong>
              composed of capable and dedicated members.
            </p>

            <p>
              The All Kerala Catholic Congress continues to be a pillar of strength for the Catholic community, preserving their rights, voicing
              their concerns, and contributing to the betterment of society at large.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Akcc;
