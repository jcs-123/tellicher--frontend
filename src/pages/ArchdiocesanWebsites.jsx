import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';
import SideNavDownloads from '../components/SideNavDownloads';
import axios from 'axios';

const ArchdiocesanWebsites = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWebsites = async () => {
    try {
      const res = await axios.get('https://tellicheri.onrender.com/api/website-links');
      const filtered = res.data.filter(link => link.pageType === 'Archdiocesan Websites');
      setWebsites(filtered);
    } catch (err) {
      console.error('Failed to fetch websites:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return (
    <Container fluid className="py-4 px-4">
      <Row>
        <Col md={3} sm={12} className="mb-4">
          <SideNavDownloads />
        </Col>

        <Col md={9} sm={12}>
          <h4 className="fw-bold text-danger mb-4 text-uppercase">Archdiocesan Websites</h4>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Row className="gy-4">
              {websites.map((site, index) => (
                <Col md={6} key={site._id}>
                  <Card className="custom-shadow-card border-0 p-3 rounded-3">
                    <Row className="align-items-center">
                      <Col xs={9}>
                        <div className="fw-bold text-uppercase site-title-style mb-2">
                          {site.title}
                        </div>
                        <a
                          href={site.webLink}
                          target="_blank"
                          rel="noreferrer"
                          className="website-link"
                        >
                          <FaGlobe className="me-2" />
                          {site.webLink}
                        </a>
                      </Col>
                      <Col xs={3} className="text-end">
                        <Button
                          variant="danger"
                          size="sm"
                          className="explore-btn"
                          href={site.webLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Explore
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ArchdiocesanWebsites;
