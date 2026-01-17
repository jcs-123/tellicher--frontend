import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import BishopSideNav from '../components/BishopSideNav';
import pamplanyImage from '../assets/bishopimg.jpg';
import downloadIcon from '../assets/small.png';
import axios from 'axios';

const MarJosephPamplany = () => {
  const [diaryUrl, setDiaryUrl] = useState('');

  useEffect(() => {
    // Directly set the expected file path (e.g., 'latest.pdf')
    setDiaryUrl('https://tellicheri.onrender.com/uploads/programme-diary/latest.pdf');
  }, []);

  return (
    <div className="container my-5">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="mb-4 d-none d-md-block">
          <BishopSideNav />
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <Card
            className="p-4"
            style={{
              border: '1px solid #d6d6d6',
              borderRadius: '20px',
              background: '#ffffff',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              fontFamily: "'Open Sans', sans-serif",
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow = '0 14px 40px rgba(0, 0, 0, 0.15)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)')
            }
          >
            {/* Title */}
            <h3 className="fw-bold text-danger mb-1" style={{ fontFamily: "'Merriweather', serif" }}>
              MAR JOSEPH PAMPLANY
            </h3>
            <h6 className="text-secondary fst-italic mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Archbishop of Thalassery
            </h6>

            {/* Content Section */}
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.85',
                textAlign: 'justify',
                color: '#333',
              }}
            >
              {/* Floating Card */}
              <div
                style={{
                  float: 'left',
                  width: '270px',
                  marginRight: '20px',
                  marginBottom: '15px',
                }}
              >
                <Card
                  className="shadow-sm border"
                  style={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    fontFamily: "'Open Sans', sans-serif",
                    border: '1px solid #e4e4e4',
                    backgroundColor: '#fcfcfc',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={pamplanyImage}
                    alt="Mar Joseph Pamplany"
                    style={{ objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Text
                      className="text-center"
                      style={{ fontSize: '14px', lineHeight: '1.7' }}
                    >
                      <strong className="text-dark">OFFICIAL ADDRESS</strong><br />
                      Archbishop's House<br />
                      Holloway Rd, Palissery<br />
                      Thalassery, Kerala 670101<br />
                      📞 0490 234 1058<br />
                      📧 jpamplany@gmail.com
                    </Card.Text>

                    {/* Download Link */}
                    {diaryUrl && (
                      <div style={{ textAlign: 'center' }}>
                        <a
                          href={diaryUrl}
                          download="ProgrammeDiary_JosephPamplany.pdf"
                          className="d-inline-flex align-items-center mt-3 text-danger fw-semibold"
                          style={{
                            fontSize: '14px',
                            textDecoration: 'none',
                            padding: '6px 12px',
                            border: '1px solid #dc3545',
                            borderRadius: '8px',
                            transition: 'background 0.3s',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = '#f8d7da')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = 'transparent')
                          }
                        >
                          <img
                            src={downloadIcon}
                            alt="Download Icon"
                            style={{ width: '18px', height: '18px', marginRight: '6px' }}
                          />
                          <span>Programme Diary</span>
                        </a>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {/* Biography Paragraphs */}
             <p>
                Archbishop Mar Joseph Pamplany was born on 03.12.1969 at Charal in the Archdiocese of Tellicherry as the fifth son among the seven children of Mr. Thomas and Mrs. Mary Pamplany. Mar Joseph had his lower primary school education at St. Sebastian’s School, Charal, high school education at St. Thomas High School, Kilianthara and Pre-degree education at Nirmalagiri College, Koothuparamba. He joined St. Joseph’s Minor Seminary, Tellicherry in 1988 and completed his priestly formation from St. Joseph’s Pontifical Seminary Alwaye.
              </p>
              <p>
                On 30.12.1997 he was ordained priest by Mar George Valiamattam at St. Joseph’s Cathedral Church Tellicherry. He served the eparchy as assistant vicar at St. Joseph’s Forane Church, Peravoor and Vicar at St. Thomas Church, Deepagiri. He obtained M.A in Religious Studies from Katholieke Universiteit Leuven, Belgium in 2001, Licentiate in 2002 and Ph.D in Sacred Scripture in 2006 from the same university. The title of his doctoral dissertation was “Crossing the Abysses: An Exegetical Study of John 20:24-29, in the Light of Johannine Notion of Discipleship.” He also holds P.G. Diploma in German, Hebrew and Greek languages.
              </p>
              <p>
                Returning after his higher studies he was appointed as the Director of Bible Apostolate of the Archdiocese. He has initiated the establishment of Alpha Institute of Theology and Science, an institution for the theological formation of the religious and lay people. He became its founder director. He has been teaching Sacred Scripture in St. Joseph’s Pontifical Institute, Aluva, Good Shepherd Major Seminary, Kunnoth, St. Thomas Apostolic Seminary, Vadavathoor, St. Mary’s Malankara Major Seminary, Trivandrum, Indian Institute of Spirituality, Bangalore and Divine Bible College, Muringoor. He is serving as research guide in various ecclesiastical Universities and Institutions. He was elected by the Holy Synod of the Syro-Malabar Church as the first auxiliary bishop of Tellicherry and his episcopal consecration was held on 08.11.2017. He was ordined by Mar George Njaralakatt with Mar George Valiamattam and Mar Joseph Kallarngattu as the co-consecrators, at st. Joseph’s Cathedral Thalassery. At the retirement of Archbishop George Njaralakkatt he was installed the Archbishop of Tellicherry on 20th April 2022.
              </p>
              <p>
                Archbishop Mar Joseph Pamplany is a well-known writer and versatile orator. He has published more than 40 books, 50 research articles in national and international publications and more than 400 articles in regional Malayalam periodicals. He has membership in the editorial bodies of many academic publications. He has presented many research papers in international and national seminars. As a retreat preacher he has preached more than 1000 retreats to bishops, priests, religious and laity groups. He is a member of the Syro Malabar permanent Synod and the General Secretary of the Syro-Malabar Synod. He served the church as a priest in various capacities such as the secretary of CBCI Commission for Doctrine, the Secretary of CBCI Commission for Inter Ritual Text Books; Member of FABC Theology Commission; Member of Doctrinal Commission of KCBC and Syro-Malabar Synod and Member, text book committee of the Mystagogical Catechesis of the Syro-Malabar Synod. Currently he is the Chairman of Media Commission of both KCBC and Syro Malabar Church. He is the chairman of Synodal Commission of the Good Shepherd Major Seminary, Kunnoth. He is also the episcopal member of the CBCI Commission for Doctrine and the Syro-Malabar Commission for Education.
              </p>

              {/* Clear float */}
              <div style={{ clear: 'both' }}></div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MarJosephPamplany;
