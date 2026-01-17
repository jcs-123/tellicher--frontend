import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SideNavDownloads from '../components/SideNavDownloads';

const eventList = [
  {
    title: 'Annual Retreat for Clergy',
    date: '10/09/2025',
    description: 'A spiritual retreat for all diocesan clergy at Pastoral Centre.',
  },
  {
    title: 'Catechism Day Celebration',
    date: '18/08/2025',
    description: 'Special mass and cultural program for catechism students and teachers.',
  },
  {
    title: 'Chrism Mass 2025',
    date: '27/03/2025',
    description: 'Holy Chrism Mass at the Cathedral with all priests.',
  },
];

const EventCalendar = () => {
  return (
    <Container fluid className="py-4 px-4">
      <Row>
        <Col md={3} sm={12} className="mb-4">
          <SideNavDownloads />
        </Col>

        <Col md={9} sm={12}>
          <h4 className="fw-bold text-danger mb-4 text-uppercase">Event Calendar</h4>
          <Row className="gy-4">
            {eventList.map((event, index) => (
              <Col key={index} md={12}>
                <Card
                  style={{
                    border: '1px solid #ddd',
                    borderLeft: '5px solid #dc3545',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.05)',
                    padding: '1rem',
                  }}
                >
                  <h5 className="text-danger fw-bold">{event.title}</h5>
                  <p className="text-muted mb-1">
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p className="mb-0">{event.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EventCalendar;
