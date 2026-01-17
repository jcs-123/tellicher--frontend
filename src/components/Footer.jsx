import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-section text-white">
      <Container>
        <Row>
          {/* Contact Info */}
          <Col md={4} className="footer-contact text-start">
            <h5>
              <span className="text-danger fst-italic">The Archdiocese of</span><br />
              <strong>TELLICHERRY</strong>
            </h5>
            <p><span>📞</span> 0091-490 2341058 (R)</p>
            <p><span>📞</span> 0091-490 2344977 (Personal)</p>
            <p><span>📞</span> 0091-490 2342440 (Curia)</p>
            <p><span>☎</span> 0091-490 2341412</p>
            <p><span>📧</span> curiaadtly@gmail.com</p>
            <p><span>📬</span> P.B.No.70, Tellicherry - 670101</p>
          </Col>

          {/* Quick Message Form */}
          <Col md={4} className="footer-form text-start"> {/* Added text-start */}
            <h5>Quick Message</h5>
            <Form>
              <Form.Control type="text" placeholder="Name" className="mb-2" />
              <Form.Control type="email" placeholder="Email" className="mb-2" />
              <Form.Control as="textarea" rows={2} placeholder="Comments" className="mb-2" />
              <Button variant="secondary" size="sm">SUBMIT</Button>
            </Form>
          </Col>


          {/* Social + Map */}
          <Col md={4} className="footer-social">
            <h5>Follow Us</h5>

            {/* Instagram Link Styled */}
            <div className="mb-3">
              <a
                href="https://www.instagram.com/thalasserykcym"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-link"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  className="insta-icon"
                />
                <div>
                  <div className="insta-title">KCYM Thalassery</div>
                  <div className="insta-sub">Follow us on Instagram</div>
                </div>
              </a>
            </div>

            {/* Google Map */}
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.8915712952973!2d75.4788307757393!3d11.74509964147686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba42f94d055f231%3A0x5c3e7d90dbf42b86!2sArchdiocese%20of%20Tellicherry!5e0!3m2!1sen!2sin!4v1719398700000!5m2!1sen!2sin"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Col>
        </Row>

        {/* Footer Credit */}
        <Row className="mt-4 text-center">
          <Col>
            <small>
              Designed & Developed by <a href="mailto:tbi@jec.ac.in" className="text-info">tbi@jec</a>, Jyothi Engineering College
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
