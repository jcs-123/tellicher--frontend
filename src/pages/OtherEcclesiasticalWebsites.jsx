import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import SideNavDownloads from '../components/SideNavDownloads';
import axios from 'axios';

const OtherEcclesiasticalWebsites = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWebsites = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/website-links');
      const filtered = res.data.filter(link => link.pageType === 'Other Ecclesiastical Websites');
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
          <h4 className="fw-bold text-danger mb-4 text-uppercase">Other Ecclesiastical Websites</h4>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Row className="gy-4">
              {websites.map((site, index) => (
                <Col key={site._id} md={6}>
                  <div className="equal-card">
                    <div>
                      <div className="site-title-style mb-2 text-uppercase">{site.title}</div>
                      <a
                        href={site.webLink}
                        target="_blank"
                        rel="noreferrer"
                        className="website-link"
                      >
                        {site.webLink}
                      </a>
                    </div>
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
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OtherEcclesiasticalWebsites;
