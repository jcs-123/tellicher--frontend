import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import './Landmark.css'; // custom styles

const timelineData = [
  {
    text: 'The Eparchy of Tellicherry was erected on 31.12.1953 by the Papal Bull Ad Christi Ecclesiam Regendam of Pope Pious XII.',
    side: 'left',
  },
  {
    text: 'Mar Sebastian Valloppilly took charge of the diocese as the administrator on 19.03.1954.',
    side: 'right',
  },
  {
    text: 'Mar Sebastian Valloppilly was Consecrated bishop on 08.01.1956.',
    side: 'left',
  },
  {
    text: 'The Eparchy was bifurcated in 1973 and the Eparchy of Mananthavady was erected.',
    side: 'right',
  },
  {
    text: 'The Eparchy was bifurcated in 1986 to form the Eparchy of Thamarassery.',
    side: 'left',
  },
  {
    text: 'Archbishop Mar George Valiamattam was consecrated as bishop of the Diocese on 01.05.1989.',
    side: 'right',
  },
  {
    text: 'The diocese was raised to the stature of Metropolitan Archeparchy by the Papal Bull Spirituali Bono Christi Fidelium of Pope John Paul II in 18.05.1995.',
    side: 'left',
  },
  {
    text: 'The Eparchy was bifurcated in 1999 to form the Eparchy of Belthangady.',
    side: 'right',
  },
  {
    text: 'The legendary First Bishop of Thalassery Mar Sebastian Valloppilly slept in the Lord on 04 April 2006 and was interred in the crypt of St. Joseph\'s Cathedral Thalassery.',
    side: 'left',
  },
  {
    text: 'Archbishop Mar George Valiamattam retired and Archbishop Mar George Njaralakatt was installed as the new Archbishop of Tellicherry on 30.10.2014.',
    side: 'right',
  },
  {
    text: 'Mar Joseph Pamplany was consecrated first Auxiliary bishop of the Archeparchy of Tellicherry on 08.11.2017.',
    side: 'left',
  },
  {
    text: 'Archbishop Mar George Njaralakatt retired and Archbishop Mar Joseph Pamplany was installed as the new Archbishop of Tellicherry on 20.04.2022.',
    side: 'right',
  },
];


const Landmark = () => {
  return (
    <div style={{ padding: '30px 0', backgroundColor: '#f9f9f9' }}>
      <Container>
        <Row>
          <Col md={3}>
            <SideNav />
          </Col>

          <Col md={9}>
            <h4 style={{ color: '#d72638', fontWeight: 'bold', marginBottom: '30px' }}>LANDMARK</h4>
            <div className="timeline">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item ${item.side === 'right' ? 'right' : 'left'}`}
                >
                  <Card className="timeline-card shadow-sm">
                    <Card.Body>
                      <Card.Text className="mb-0">{item.text}</Card.Text>
                    </Card.Body>
                  </Card>
                  <div className="timeline-dot"></div>
                </div>
              ))}
              <div className="timeline-line"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landmark;
