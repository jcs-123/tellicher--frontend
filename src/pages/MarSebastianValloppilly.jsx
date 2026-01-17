import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BishopSideNav from '../components/BishopSideNav';
import valloppillyImg from '../assets/valloppilly.jpg'; // Replace with actual path

const MarSebastianValloppilly = () => {
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
                            border: '1px solid #ccc',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                            backgroundColor: '#fff',
                            fontFamily: "'Merriweather', serif"
                        }}
                    >
                        {/* Header */}
                        <h4 className="fw-bold text-danger mb-0">MAR SEBASTIAN VALLOPPILLY</h4>
                        <h6 className="text-danger fst-italic mb-4">First Bishop of Thalassery</h6>
                        <Row className="align-items-stretch">
                            {/* Image */}
                            <Col md={5}>
                                <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', display: 'flex' }}>
                                        <Card.Img
                                            src={valloppillyImg}
                                            alt="Mar Sebastian Valloppilly"
                                            style={{
                                                width: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'top',
                                            }}
                                        />
                                    </div>
                                </Card>
                            </Col>

                            {/* Timeline */}
                            <Col md={7}>
                                <Card className="border-0 h-100">
                                    <Card.Body className="d-flex flex-column justify-content-center">
                                        {[
                                            ['★ Born', '04 August, 1911'],
                                            ['★ Ordination', '24 July, 1945'],
                                            ['★ Consecration', '08 January, 1956'],
                                            ['★ Retired On', '18 February, 1989'],
                                            ['★ Died', '04 April, 2006']
                                        ].map(([label, value], index) => (
                                            <Row key={index} className="mb-2">
                                                <Col xs={5} className="text-start" style={{ fontSize: '17px', fontWeight: 600, color: '#800000' }}>
                                                    {label}
                                                </Col>
                                                <Col xs={7} className="text-start" style={{ fontSize: '18px', fontWeight: 500, color: '#800000' }}>
                                                    : {value}
                                                </Col>
                                            </Row>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>


                        {/* Biography */}
                        <Row className="mt-4">
                            <Col>
                                <Card
                                    className="bg-light p-4 border"
                                    style={{ borderRadius: '12px', boxShadow: '0 3px 10px rgba(0,0,0,0.04)' }}
                                >
                                    <Card.Body>
                                        <p style={{
                                            fontSize: '16px',
                                            lineHeight: '1.9',
                                            textAlign: 'justify',
                                            fontFamily: "'Open Sans', sans-serif",
                                            color: '#333'
                                        }}>
                                            Mar Sebastian Vallopilly was born on 04.08.1911 at Kudakkachira in the then eparchy of Changanacherry (now in Pala). He had his secular studies at SB College, Changanacherry and St. Xavier’s College, Palayamkottai. He did his priestly formation at Papal Seminary, Candy in Sri Lanka. On 24.07.1945 he was ordained a priest for the diocese of Changanacherry. He served the diocese as assistant parish priest and spiritual father in the Minor Seminary. After completing Bachelor of Teacher Training at Govt. Training College, Trivandrum he became a High School teacher and Head Master. When the diocese of Pala was established in 1950 he became a priest of that diocese. When the Diocese of Tellicherry was erected for the Syro Malabar migrants in the erstwhile Malabar District on 31.12.1953 he was appointed as its first Apostolic Administrator. He took charge of the diocese on 19.03.1954. He was elected as the first bishop of Tellicherry on 16.10.1955 and ordained on 08.01.1956 in St. Peter’s Basilica by Cardinal Eugene Tisserant.
                                        </p>

                                        <p
                                            style={{
                                                fontSize: '16px',
                                                lineHeight: '1.9',
                                                textAlign: 'justify',
                                                fontFamily: "'Open Sans', sans-serif",
                                                color: '#333'
                                            }}
                                        >
                                            As the first bishop of Tellicherry he rendered yeomen service for the uplift of the Syro Malabar migrant community and the people of Malabar area at large. He led a crusade against social evils, especially alcoholism. During his tenure as Bishop, Tellicherry was bifurcated in 1973 and again in 1986 and the dioceses of Mananthavady and Thamarassery were created respectively. At the completion of retirement age he resigned and his resignation was accepted on 18.02.1989 and Fr. George Valiamattam was appointed as the second bishop of Tellicherry. Fr. George Valiamattam was ordained bishop on 01.05.1989 and he took charge on the same day. Bishop Mar Valloppilly led his retired life in the Bishop’s House, Tellicherry. He was called to eternal rest on 04.04.2006 and was buried in St. Joseph’s Cathedral Church at Tellicherry on 06.04.2006. His motto is <strong>Servire non Servi</strong>
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

export default MarSebastianValloppilly;
