import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BishopSideNav from '../components/BishopSideNav';
import valiImg from '../assets/vali.jpg'; // Make sure image path is correct

const MarGeorgeValiamattam = () => {
    return (
        <div className="container my-4">
            <Row>
                {/* Sidebar */}
                <Col md={3} className="mb-4">
                    <BishopSideNav />
                </Col>

                {/* Main Content */}
                <Col md={9}>
                    <Card
                        className="p-4"
                        style={{
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                            fontFamily: "'Merriweather', serif",
                            backgroundColor: '#fff',
                            border: '1px solid #ddd' // Light gray border
                        }}
                    >
                        {/* Header */}
                        <h4 className="fw-bold text-danger mb-0">MAR GEORGE VALIAMATTAM</h4>
                        <h6 className="text-danger fst-italic mb-4">Archbishop Emeritus of Thalassery</h6>

                        <Row className="align-items-stretch">
                            {/* Left - Image */}
                            <Col md={5}>
                                <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                    <Card.Img
                                        src={valiImg}
                                        alt="Mar George Valiamattam"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '10px'
                                        }}
                                    />
                                </Card>
                            </Col>

                            {/* Right - Address & Timeline */}
                            <Col md={7}>
                                <Card className="border-0 h-100">
                                    <Card.Body className="d-flex flex-column mb-3 justify-content-between">
                                        <h5
                                            className="fw-bold border-bottom pb-3 mb-4 text-center"
                                            style={{
                                                color: '#800000',
                                                fontSize: '20px',
                                                letterSpacing: '0.5px',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            OFFICIAL ADDRESS
                                        </h5>


                                        <div
                                            className="mb-3"
                                            style={{
                                                color: '#800000',
                                                fontSize: '17px',
                                                lineHeight: '1.2',
                                                textAlign: 'center',
                                                fontWeight: 500
                                            }}
                                        >
                                            Archbishop's House P.B. No. 70, Thalassery - 670101.<br />
                                            <strong>Ph:</strong> 0490 2341058<br />
                                            <strong>E-Mail:</strong> archbishopgeorgev@gmail.com
                                        </div>

                                        <hr className="my-3" />

                                        <div>
                                            {[
                                                ['★ Born', '16 September, 1938'],
                                                ['★ Ordination', '30 November, 1963'],
                                                ['★ Consecration', '1 May, 1989'],
                                                ['★ Retired On', '29 September, 2014']
                                            ].map(([label, value], index) => (
                                                <Row key={index} className="mb-2">
                                                    <Col
                                                        xs={5}
                                                        className="text-start"
                                                        style={{ fontSize: '17px', fontWeight: 600, color: '#800000' }}
                                                    >
                                                        {label}
                                                    </Col>
                                                    <Col
                                                        xs={7}
                                                        className="text-start"
                                                        style={{ fontSize: '17px', fontWeight: 500, color: '#800000' }}
                                                    >
                                                        : {value}
                                                    </Col>
                                                </Row>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* Biography */}
                        <Row className="mt-4">
                            <Col>
                                <Card
                                    className="bg-light p-4 border-0"
                                    style={{
                                        borderRadius: '12px',
                                        boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <Card.Body>
                                        {[
                                            `Archbishop Mar George Valiamattam was born on 16.09.1938 at Punnathara in the Archdiocese of Changanassery as the eldest son of Thomas and Annamma Valiamattam. Later, his family migrated to Kodencherry in Calicut District. He had his school education at Nariveli and Punnathara. After his minor seminary formation at St. Mary’s Minor Seminary, Thop - Thrissur, he joined Carmelgiri Seminary, Aluva for Philosophical studies. His theological studies were at the Urban University, Rome. He was ordained priest by Mar Sebastian Valloppilly on 30.11.1963 at St. Peter’s Basilica, Rome. After his ordination he obtained his doctoral degree in theology from the Gregorian University, Rome in 1967.`,
                                            `He served the diocese as assistant vicar of St. Mary’s Church, Kodencherry, Vicar of St. Mary’s Church, Thalanji, and Secretary to the Bishop, Chancellor of the diocese, Diocesan Director of Catechism and Mission League and as Rector of the Minor Seminary. He served the diocese of Thamarassery in the capacity of Chancellor, Secretary and Director of Catechism. When nominated the second Bishop of Tellicherry, he was the Forane Vicar at St. Thomas Forane Church, Shirady.`,
                                            `He was consecrated Bishop at St. Joseph’s Cathedral Church Tellicherry by His Eminence Antony Cardinal Padiyara, assisted by Mar Joseph Powathil, Archbishop of Changanassery and Mar Sebastian Valloppilly, on 01.05.1989 and he assumed office on the same day. When the diocese of Tellicherry was raised to the status of Metropolitan Archdiocese, he was promoted and appointed as its first Metropolitan Archbishop on 18.05.1995. He was enthroned as the Archbishop on 24.07.1995, at a solemn ceremony in St. Joseph’s Cathedral Church presided over by the Major Archbishop His Eminence Antony Cardinal Padiyara.`
                                        ].map((para, index) => (
                                            <p
                                                key={index}
                                                style={{
                                                    fontSize: '16px',
                                                    lineHeight: '1.9',
                                                    textAlign: 'justify',
                                                    fontFamily: "'Open Sans', sans-serif",
                                                    color: '#333',
                                                    maxWidth: '850px',
                                                    margin: '0 auto'
                                                }}
                                            >
                                                {para}
                                            </p>
                                        ))}

                                        <p
                                            style={{
                                                fontSize: '16px',
                                                lineHeight: '1.9',
                                                textAlign: 'justify',
                                                fontFamily: "'Open Sans', sans-serif",
                                                color: '#333',
                                                maxWidth: '850px',
                                                margin: '0 auto'
                                            }}
                                        >
                                            He served the Church in India as the Vice President of CBCI and its Standing Committee member. He was a
                                            member of the Permanent Synod of the Syro Malabar Church. He was the Episcopal advisor of INFAM since its
                                            inception in 2003 and is the Chairman of the Synodal Commission for the Good Shepherd Major Seminary,
                                            Kunnoth. At the completion of retirement age he resigned and Mar George Njaralakatt was elected as the new
                                            Archbishop on 30.10.2014. His motto is <strong>I am the good shepherd (Jn 10,11)</strong>.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default MarGeorgeValiamattam;
