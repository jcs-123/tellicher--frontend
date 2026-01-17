import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Spinner, Table, Button } from 'react-bootstrap';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
  FaInstagram
} from 'react-icons/fa';

import SideNavPriests from '../components/SideNavPriests';
import './Priests.css';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/import';

const PriestDetail = () => {
  const { id } = useParams();
  const [priest, setPriest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPriest();
  }, [id]);

  const fetchPriest = async () => {
    try {
      const res = await axios.get(`${API_URL}/priests/${id}`);
      if (res.data.success) {
        setPriest(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching priest:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (!priest) {
    return <p className="text-center py-5">Priest not found</p>;
  }

  return (
    <Container fluid className="my-4">
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <SideNavPriests />
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <h4 className="text-danger fw-bold text-uppercase mb-3">
            Fr. {priest.name}
          </h4>

          <Row>
            {/* Image */}
            <Col md={4} className="text-center">
              <img
                src={priest.photo || '/default-priest.png'}
                alt={priest.name}
                className="img-fluid shadow"
                style={{ maxHeight: 320 }}
              />
            </Col>

            {/* Details */}
            <Col md={8} className="priest-detail-lines">
              <p><strong>Designation :</strong> {priest.designation || '-'}</p>
              <p><strong>Current Working Place :</strong> {priest.current_place || '-'}</p>
              <p><strong>Home Parish :</strong> {priest.home_parish || '-'}</p>
              <p><strong>Current Status :</strong> Priest in the Diocese</p>
              <p>
                <strong>Date of Birth :</strong>{' '}
                {priest.dob ? new Date(priest.dob).toLocaleDateString() : '-'}
                &nbsp;&nbsp;
                <strong>Feast Day :</strong>{' '}
                {priest.feast_day || '-'} {priest.feast_month || ''}
              </p>
              <p><strong>Mobile :</strong> {priest.mobile || '-'}</p>
              <p><strong>Email Id :</strong> {priest.email || '-'}</p>
              <p><strong>Present Address :</strong> {priest.present_address || '-'}</p>

              {/* Social Icons */}
              <div className="social-icons mt-3">
                {priest.facebook && <a href={priest.facebook}><FaFacebookF /></a>}
                {priest.twitter && <a href={priest.twitter}><FaTwitter /></a>}
                {priest.linkedin && <a href={priest.linkedin}><FaLinkedinIn /></a>}
                {priest.googleplus && <a href={priest.googleplus}><FaGooglePlusG /></a>}
                {priest.instagram && <a href={priest.instagram}><FaInstagram /></a>}
              </div>

              <Link to="/archdiocesan-priests">
                <Button size="sm" variant="secondary" className="mt-3">
                  ← Back to Priests
                </Button>
              </Link>
            </Col>
          </Row>

          {/* SERVICE HISTORY */}
          <div className="mt-4">
            <h5 className="service-header">SERVICE HISTORY</h5>

            <Table bordered striped hover responsive>
              <thead className="table-danger text-center">
                <tr>
                  <th>#</th>
                  <th>Service Type</th>
                  <th>Place</th>
                  <th>Designation</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {priest.serviceHistory?.length ? (
                  priest.serviceHistory.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.category_type || 'MINISTRY'}</td>
                      <td>{item.place || '-'}</td>
                      <td>{item.designation || '-'}</td>
                      <td>
                        {item.start_date
                          ? new Date(item.start_date).toLocaleDateString()
                          : '-'}{' '}
                        to{' '}
                        {item.end_date
                          ? new Date(item.end_date).toLocaleDateString()
                          : 'Continuing'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No service history available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PriestDetail;
