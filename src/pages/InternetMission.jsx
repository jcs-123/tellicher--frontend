import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const InternetMission = () => {
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
            <h4 className="text-danger fw-bold mb-3">INTERNET MISSION</h4>

            <p>
              The <strong>Syro-Malabar Church Internet Mission (SMCIM)</strong> was started as per the decision of the XIV Synod of Bishops of the Syro-Malabar Church in <strong>August 2006</strong>.
              The official web portal of the mission is{' '}
              <a href="https://www.smcim.org" target="_blank" rel="noopener noreferrer">
                www.smcim.org
              </a>. The Internet Mission of the <strong>Archdiocese of Thalassery</strong> functions as a divisional unit of this mission.
            </p>

            <h6 className="fw-bold text-uppercase mt-4">Organization & Functioning</h6>
            <p>Its functions are divided into two main categories:</p>

            {/* Section 1 */}
            <h6 className="fw-bold text-danger mt-3">1. Online Media and Social Communication</h6>
            <p>
              The Internet Mission supports various operations of the Syro-Malabar Internet Mission related to the Tellichery Archdiocese,
              including <strong>data collection</strong> and <strong>mobile app updates</strong>.
            </p>
            <p>
              It manages several official platforms of the Archdiocese:
              <ul>
                <li>Official <strong>YouTube Channel</strong></li>
                <li><strong>Facebook Page</strong></li>
                <li><strong>Archdiocesan Website</strong></li>
                <li><strong>Internet Radio Station - Ephphatha Radio</strong></li>
              </ul>
            </p>

            {/* Section 2 */}
            <h6 className="fw-bold text-danger mt-3">2. Online Accounting</h6>
            <p>
              The Internet Mission handles the <strong>centralized accounting system</strong> for churches under the Archdiocese.
              It also provides <strong>technical and operational support</strong> to parishes for resolving accounting-related issues.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InternetMission;
