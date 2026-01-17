import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BishopSideNav from '../components/BishopSideNav';
import georgeImg from '../assets/archbishop.jpg';

const MarGeorgeNjaralakatt = () => {
    return (
        <div className="container my-4">
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
                            border: '1px solid rgba(61, 58, 58, 0.2)',  // 🔴 Light red border
                            borderRadius: '20px',
                            boxShadow: '0 4px 18px rgba(185, 44, 44, 0.1)',
                            backgroundColor: '#fff',
                            fontFamily: "'Open Sans', sans-serif",
                        }}
                    >
                        {/* Header */}
                        <Row className="mb-4">
                            <Col>
                                <h3 className="fw-bold text-danger mb-0" style={{ fontFamily: "'Merriweather', serif" }}>
                                    MAR GEORGE NJARALAKATT
                                </h3>
                                <h6 className="text-muted fst-italic" style={{ fontFamily: "'Merriweather', serif" }}>
                                    Archbishop Emeritus of Thalassery
                                </h6>
                            </Col>
                        </Row>

                        {/* Profile Section */}
                        <Row>
                            {/* Image */}
                            <Col md={5} className="mb-3 mb-md-0">
                                <Card className="border-0 shadow-sm" style={{ borderRadius: '14px', overflow: 'hidden' }}>
                                    <Card.Img
                                        variant="top"
                                        src={georgeImg}
                                        alt="Mar George Njaralakatt"
                                        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                                    />
                                </Card>
                            </Col>

                            {/* Address and Timeline */}
                            <Col md={7}>
                                <Card className="border-0">
                                    <Card.Body>
                                        <h6 className="fw-bold border-bottom pb-2 mb-3 text-center" style={{ color: '#800000' }}>
                                            OFFICIAL ADDRESS
                                        </h6>

                                        {/* Address block */}
                                        <div style={{ fontSize: '16px', color: '#800000', fontWeight: '500', lineHeight: '1.6', textAlign: 'center' }}>
                                            Santhome Regional Bishop's House,<br />
                                            Santhome Estate, Kilianthara P.O. 670 706<br />
                                            <strong>E-Mail:</strong> gnjaralakatt@gmail.com
                                        </div>

                                        <hr className="my-3" />

                                        {/* Timeline entries with ✦ icon */}
                                        <div>
                                            {[
                                                { label: 'Born', value: '23 June 1946' },
                                                { label: 'Ordination', value: '20 December 1971' },
                                                { label: 'Consecration', value: '07 April 2010' },
                                                { label: 'Archbishop of Thalassery', value: '30 October 2014' },
                                                { label: 'Retired On', value: '20 April 2022' }
                                            ].map((item, index) => (
                                                <div className="d-flex mb-2 align-items-start" key={index}>
                                                    <span style={{ minWidth: '220px', fontWeight: 600, color: '#800000' }}>
                                                        ✦ {item.label}
                                                    </span>
                                                    <span style={{ fontWeight: 500, color: '#800000' }}>
                                                        :&nbsp;{item.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>

                        {/* Biography */}
                        <Row className="mt-4">
                            <Col>
                                <Card className="border-0 bg-light p-4" style={{ borderRadius: '12px' }}>
                                    <Card.Body>
                                        <p style={{
                                            fontSize: '16px',
                                            lineHeight: '1.9',
                                            textAlign: 'justify',
                                            fontFamily: "'Open Sans', sans-serif",
                                            color: '#333'
                                        }}>
                                            Archbishop Mar George Njaralakatt was born on 23.06.1946 at Arakuzha in the diocese of Kothamangalam, as the eldest son of Varkey and Mary Njaralakatt. He had his elementary school studies at Arakuzha. In 1960 his family migrated to Nadavayal in South Wayanad Taluk in Calicut District which was then in the diocese of Tellicherry. He completed SSLC in 1963 at St. Thomas High School, Nadavayal and he was admitted in St. Joseph’s Minor Seminary, Tellicherry by Bishop Mar Sebastian Valloppilly. He did his philosophy and theology at St. Joseph’s Pontifical Seminary, Mangalapuzha, Aluva. He was ordained priest for the diocese of Tellicherry by Bishop Mar Sebastian Valloppilly on 20.12.1971 at St. Joseph’s Cathedral Church, Tellicherry. He holds a BA degree from the University of Mysore.
                                        </p>
                                        <p style={{
                                            fontSize: '16px',
                                            lineHeight: '1.9',
                                            textAlign: 'justify',
                                            fontFamily: "'Open Sans', sans-serif",
                                            color: '#333'
                                        }}>
                                            After the ordination Fr. Njaralakatt was appointed as the assistant parish priest of St. George’s Church, Kanichar. In 1973 the diocese of Tellicherry was bifurcated and the diocese of Mananthavady was erected on 01.03.1973. So Fr. Njaralakatt was transferred to the new diocese and became the parish priest of Arinchermala and Kaniambatta in 1973. He served the diocese of Mananthavady in various capacities as Parish Priest, Vicar of Forane District, Director of CML, Director of Vocation Bureau and Charismatic Movement, Assistant Director of Catechism Department and later as its Director, Director of Pastoral Centre at Dwaraka, Procurator, Vicar General, Manager, Marymatha Arts and Science College, Mananthavady, diocesan consulter and Administrator. He took Licentiate in Catechetical Theology from Pontifical Salesian University, Rome, in 1983–86. In 2008 he became the first Vicar General of the diocese of Bhadravathy. Later when the diocese of Mandya was erected by bifurcating the diocese of Mananthavady in 2010, he was elected its first bishop and ordained on 07.04.2010 at Infant Jesus Cathedral, Hinkel, Mysore. On 29.08.2014 Bishop Mar Njaralakatt was elected as the Metropolitan Archbishop of Tellicherry by the Holy Synod of Syro Malabar Church as Archbishop Mar George Valiamattam tended his resignation upon reaching retirement age. Bishop Njaralakatt was installed as the Archbishop on 30.10.2014 at St. Joseph’s Cathedral Church, Thalassery. He served the Archeparchy for 8 Years and he retired from his office on 20th April 2022.
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

export default MarGeorgeNjaralakatt;
