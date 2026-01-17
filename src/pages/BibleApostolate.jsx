import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const BibleApostolate = () => {
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
            <h4 className="text-danger fw-bold mb-3">BIBLE APOSTOLATE</h4>

            <p>
              In response to Jesus’ instruction, <strong>“... and the gospel must first be preached to all the nations” (Mk 13:10)</strong>, the
              <strong> Archdiocese of Thalassery</strong> aims to ensure the Word of God is known, loved, pondered, and preserved in the hearts of all the faithful and every human person.
            </p>

            <p>
              The <strong>Department of Bible Apostolate</strong> is committed to proclaiming the <strong>Word of God</strong> in its purest form. To achieve this,
              the department utilizes a wide range of methods, including:
            </p>

            <ul>
              <li>Teaching and preaching</li>
              <li>Reading and sharing the Word</li>
              <li>Artistic expressions</li>
              <li>Social media platforms like YouTube, Twitter, Facebook, WhatsApp, Instagram</li>
            </ul>

            <p>
              This department is an effective arm of the Archdiocese to carry out the mission entrusted by the Lord.
              Some of its major initiatives and contributions include:
            </p>

            <ul>
              <li><strong>Bible Chithra-Kadha</strong> – Illustrated Bible Stories</li>
              <li><strong>Alpha Institute of Theology</strong></li>
              <li><strong>Ajapalakan</strong> – Homiletic Reflections on Sunday Syro-Malabar Readings</li>
              <li><strong>Theological Publications</strong></li>
              <li><strong>Logos Quiz Program</strong></li>
              <li><strong>Bible Sandhya</strong> – Conducted at the parish level</li>
              <li><strong>Biblical and Foreign Language Courses</strong></li>
            </ul>

            <h6 className="fw-bold mt-4">CONTACT INFO</h6>
            <p>
              🌐{' '}
              <a
                href="http://www.alphathalassery.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.alphathalassery.org
              </a>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BibleApostolate;
