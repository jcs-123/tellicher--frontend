import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const FamilyApostolate = () => {
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
            <h4 className="text-danger fw-bold mb-3">FAMILY APOSTOLATE</h4>

            <p>
              The Department of Family Apostolate in the <strong>Archdiocese of Thalassery</strong> is an umbrella organisation for several family-focused ministries, including:
              <ul>
                <li>Mathruvedhi</li>
                <li>Pithruvedhi</li>
                <li>Amala Prolife</li>
                <li>Marian Singles</li>
                <li>Widows Forum (Navomi Koottayma)</li>
                <li>Home Mission</li>
                <li>Family Counselling</li>
              </ul>
            </p>

            <p>
              One of the key missions of the department is to provide <strong>Catholic faith formation for families</strong>. As part of this mission,
              the Family Apostolate organizes <strong>Marriage Preparation Courses</strong> in various centers throughout the Archdiocese.
            </p>

            <p>
              These institutions are well structured at the diocesan level with dedicated executive members and general bodies for each sub-organization.
              <strong> Vivaha Sahaya Nidhi</strong> plays a vital role in offering financial assistance to support marriage for underprivileged girls.
            </p>

            <p>
              <strong>Online Services:</strong>
              <ul>
                <li>Marriage Preparation Course Registration: <a href="https://www.familytly.com" target="_blank" rel="noopener noreferrer">www.familytly.com</a></li>
                <li>Marriage Bureau: <a href="https://www.anugrahamarry.com" target="_blank" rel="noopener noreferrer">www.anugrahamarry.com</a></li>
                <li>Email: <a href="mailto:family.anugraha@gmail.com">family.anugraha@gmail.com</a></li>
                <li>Facebook Page: <strong>familytlythalassery</strong></li>
                <li>YouTube Channel: <a href="https://www.youtube.com/channel/UCcNwd34Uab-pxgFFGnxjLBw" target="_blank" rel="noopener noreferrer">Onlife Media</a></li>
              </ul>
            </p>

            <h6 className="fw-bold mt-4">CONTACT INFO</h6>
            <p>
              🌐{' '}
              <a
                href="https://www.familytly.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.familytly.com
              </a>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FamilyApostolate;
