import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import historyImage from '../assets/history-building.jpg';
import bishopImg from '../assets/bishopimg.jpg';
import marPapaImg from '../assets/marpapa.jpg'; // ⬅️ Add your Pope Francis image

const History = () => {
  return (
    <div style={{ padding: '30px 0', backgroundColor: '#fdfdfd' }}>
      <Container>
        <Row>
          <Col md={3}>
            <SideNav />

            {/* Pope Francis Card */}
            <Card
              style={{
                border: '1px solid #d72638',
                marginTop: '20px',
                padding: '15px',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
                borderRadius: '6px',
                height: '259px',
              }}
            >
              <div className="text-center">
                <Image
                  src={marPapaImg}
                  alt="Pope Francis"
                  roundedCircle
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <h6 style={{ fontWeight: 'bold', marginBottom: '0' }}>Leo XIV</h6>
                <p style={{ fontWeight: '500', fontSize: '14px' }}>Holy Father</p>
                <p style={{ fontSize: '13px', fontStyle: 'italic', textAlign: 'justify' }}>
                  We oppose hatred and destruction with goodness. We live in societies of different cultures and religions, but we are brothers and sisters.
                </p>
              </div>
            </Card>
          </Col>

          <Col md={9}>
            <h4 style={{ color: '#d72638', fontWeight: 'bold', marginBottom: '20px' }}>HISTORY</h4>

            {/* History Image and Text */}
            <Row>
              <Col md={5}>
                <Image
                  src={historyImage}
                  alt="History Building"
                  fluid
                  style={{
                    borderRadius: '4px',
                    marginBottom: '20px',
                    width: '100%',
                    maxWidth: '400px',
                  }}
                />
              </Col>
              <Col md={7}>
                <p style={{ fontSize: '15px', lineHeight: '1.8', textAlign: 'justify' }}>
                  <strong>The Archdiocese of Tellicherry</strong> is an ecclesiastical province of the Syro-Malabar Church in Kerala, India.
                  The Diocese of Tellicherry was erected on 31.12.1953 by the Papal Bull <em>Ad Christi Ecclesiam Regendam</em> of Pope Pius XII,
                  against the backdrop of large-scale migration of thousands of Syro-Malabar Catholics from South to the Northern forestlands of Kerala.
                  Bishop Mar Sebastian Valloppilly was appointed as its first Apostolic Administrator.
                  He took charge of the diocese on 19.03.1954. Later he was elected as the first bishop of Tellicherry on 16.10.1955 and ordained on 08.01.1956
                  at St. Peter’s Basilica by Cardinal Eugene Tisserant.
                </p>
              </Col>
            </Row>

            {/* More Description */}
            <Row className="mt-3">
              <Col>
                <p style={{ fontSize: '15px', lineHeight: '1.8', textAlign: 'justify' }}>
                  The diocese grew up fast and became a stronghold of Catholic Church in this region within a short period.
                  The boundaries of the diocese were extended in 1955 to some districts in the states of Karnataka and Tamil Nadu,
                  for the pastoral care of the migrants settled there. The diocese was bifurcated in 1973 and the diocese of Mananthavady was erected on 01.03.1973.
                  Again, the Diocese of Tellicherry was bifurcated twice, on 28.04.1986 to form the diocese of Thamarassery and on 24.04.1999 to form the diocese of Balthangady.
                  On 01.05.1989 Mar Sebastian Valloppilly retired and Mar George Valiamattam was consecrated as his successor.
                  The diocese was raised to the stature of Metropolitan Archdiocese by the Papal Bull <em>Spirituali Bono Christi Fidelium</em> of Pope John Paul II on 18.05.1995.The Archdiocese enjoyed the gracious leadership of Archbishop Mar George Valiamattam from 01.05.1989 to 30.10.2014. On his retirement, Archbishop Mar George Njaralakatt was installed as the new Archbishop of Tellicherry on 30.10.2014. He assumed office on the same day. Mar Joseph Pamplany was elected as the first auxiliary bishop of Tellicherry by the Holy Synod of the Syro-Malabar Church and his Episcopal consecration was held on 08.11.2017 at St. Joseph’s Cathedral Church, Tellicherry. On the retirement of Mar George Njaralakatt on the 20th April 2022, Mar Joseph Pamplany was installed as the Archbishop of Tellicherry .
                </p>
              </Col>
            </Row>

            {/* Contact Info */}
            <div style={{ marginTop: '40px' }}>
              <h5 style={{ fontWeight: 'bold' }}>Contact Info</h5>
              <p style={{ marginBottom: '5px' }}>
                <i className="bi bi-geo-alt-fill" style={{ marginRight: '8px' }}></i>
                The Archbishop's House, P.B.No.70, Tellicherry-670101, Kerala, India.
              </p>
              <p style={{ marginBottom: '5px' }}>
                <i className="bi bi-telephone-fill" style={{ marginRight: '8px' }}></i>
                0091-490 2341058(R), 0091-490-2344977(Personal), 0091-2342440 (Curia)
              </p>
              <p style={{ marginBottom: '5px' }}>
                <i className="bi bi-printer-fill" style={{ marginRight: '8px' }}></i>
                0091-490 2341412
              </p>
              <p>
                <i className="bi bi-globe" style={{ marginRight: '8px' }}></i>
                <a href="http://www.archdioceseoftellicherry.org" target="_blank" rel="noopener noreferrer">
                  www.archdioceseoftellicherry.org
                </a>
              </p>
            </div>

            {/* Bishop Card */}
            {/* Bishop Card - Matching Screenshot */}
            <div style={{ marginTop: '30px' }}>
              <h5 style={{ fontWeight: 'bold' }}>Bishops</h5>

              <Card style={{
                marginTop: '10px',
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                maxWidth: '650px'
              }}>
                <Row>
                  <Col xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                    <Image
                      src={bishopImg}
                      alt="Mar Joseph Pamplany"
                      roundedCircle
                      fluid
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </Col>

                  <Col xs={9}>
                    <h6 style={{ fontWeight: 'bold', marginBottom: '0' }}>Mar Joseph Pamplany</h6>
                    <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#333', marginBottom: '8px' }}>
                      Archbishop of Tellicherry
                    </p>
                    <hr style={{ margin: '8px 0' }} />

                    {/* Social Icons */}
                    <div style={{ marginBottom: '10px' }}>
                      <i className="bi bi-facebook" style={{ fontSize: '18px', marginRight: '12px', color: '#555' }}></i>
                      <i className="bi bi-twitter" style={{ fontSize: '18px', marginRight: '12px', color: '#555' }}></i>
                      <i className="bi bi-linkedin" style={{ fontSize: '18px', color: '#555' }}></i>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '14px', textAlign: 'justify', margin: 0 }}>
                      Mar Joseph Pamplany was born on 03.12.1969 at Charal in the Archdiocese of Tellicherry as the fifth son among
                      the seven children of Mr. Thomas and Mrs. Mary Pamplany. Mar Joseph had his...
                      <a href="#" style={{ color: '#007bff', textDecoration: 'none', marginLeft: '4px' }}>Read more</a>
                    </p>
                  </Col>
                </Row>
              </Card>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default History;
