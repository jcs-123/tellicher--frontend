import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const Infam = () => {
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
            <h4 className="text-danger fw-bold mb-3">INFAM (Indian Farmers Movement)</h4>

            <p>
              <strong>INFAM</strong> was founded in the year <strong>2000</strong> under the support of the Catholic Church. During these years, it has
              assisted farmers in today's changing and challenging farming circumstances in a considerable way. Presently, farming is faced with
              various challenges. Unfortunately, the State and Central Governments often fail to take strong steps for improving agriculture and do not
              adequately address farmers’ issues.
            </p>

            <p>
              Over the years, INFAM has brought to light the real struggles and concerns of the farming community. It has helped raise awareness among
              farmers about their <strong>rights and obligations</strong>. It has also put pressure on the Government and NGOs to take
              <strong> constructive and dynamic measures</strong> to care for Indian farmers and agriculture.
            </p>

            <p>
              Farmers of Kerala are the backbone of our economy. Their toil and sweat contribute significantly to the growth and development of our
              country. Yet, many farmers continue to face hardships and are victims of neglect, as their problems remain unaddressed.
            </p>

            <p>
              In this context, the Church felt a divine responsibility to respond to farmers’ struggles, raise their concerns, and find sustainable
              solutions. This led to the founding of INFAM in the year <strong>2000</strong> under the leadership and guidance of the
              <strong> KCBC</strong> (Kerala Catholic Bishops' Council).
            </p>

            <p>
              With continuous support from ecclesial authorities, the movement gained momentum. Since its inception, INFAM has provided a common
              platform for farmers—<strong>regardless of religion or political background</strong>—to work together wholeheartedly toward shared goals
              and dreams.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Infam;
