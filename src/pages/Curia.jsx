import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import SideNavAdmin from '../components/SideNavAdmin';
import pamplanyImage from '../assets/bishopimg.jpg';
import curiaImg from '../assets/curia.jpg';
import curia1 from '../assets/curia1.jpg';
import curia2 from '../assets/curia2.jpeg';
import curia3 from '../assets/curia3.jpg';
import curia4 from '../assets/curia4.jpg';
import curia5 from '../assets/curia5.jpg';
import curia6 from '../assets/curia6.jpg';


const Curia = () => {
    return (
        <Container fluid style={{ padding: '40px 60px' }}>
            <Row>
                {/* Side Navigation */}
                <Col md={3}>
                    <SideNavAdmin />
                </Col>

                {/* Main Content in bordered box */}
                <Col md={9}>
                    <div
                        style={{
                            border: '1px solid #ccc',
                            padding: '30px',
                            borderRadius: '12px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                    >
                        <h3 style={{ fontWeight: 'bold', color: '#d92332', textTransform: 'uppercase' }}>
                            ARCHEPARCHIAL CURIA
                        </h3>

                        <Row className="my-4">
                            <Col md={4}>
                                <Image
                                    src={curiaImg}
                                    alt="Curia"
                                    fluid
                                    style={{ borderRadius: '8px', width: '100%' }}
                                />
                            </Col>
                            <Col md={8}>
                                <p style={{ textAlign: 'justify', fontSize: '1.05rem', lineHeight: '1.9' }}>
                                    <strong>The Archdiocese of Tellicherry</strong> is an ecclesiastical province of the Syro-Malabar Church in Kerala, India.
                                    The Diocese of Tellicherry was erected on 31.12.1953 by the Papal Bull <em>Ad Christi Ecclesiam Regendam</em> of Pope Pius XII,
                                    against the backdrop of large-scale migration of thousands of Syro-Malabar Catholics from South to the Northern forestlands
                                    of Kerala. Bishop Mar Sebastian Valloppilly was appointed as its first Apostolic Administrator. He took charge of the diocese
                                    on 19.03.1954. Later he was elected as the first bishop of Tellicherry on 16.10.1955 and ordained on 08.01.1956 at St. Peter’s
                                    Basilica by Cardinal Eugene Tisserant.
                                </p>
                            </Col>
                        </Row>

                        <p style={{ textAlign: 'justify', fontSize: '1.05rem', lineHeight: '1.9' }}>
                            The diocese grew up fast and became a stronghold of Catholic Church in this region within a short period.
                            The boundaries of the diocese were extended in 1955 to some districts in the states of Karnataka and Tamil Nadu,
                            for the pastoral care of the migrants settled there. The diocese was bifurcated in 1973 and the diocese of
                            Mananthavady was erected on 01.03.1973. Again, the Diocese of Tellicherry was bifurcated twice, on 28.04.1986
                            to form the diocese of Thamarassery and on 24.04.1999 to form the diocese of Balthangady. On 01-05-1989 Mar
                            Sebastian Valloppilly retired and Mar George Valiamattam was consecrated as his successor. The diocese was
                            raised to the stature of Metropolitan Archdiocese by the Papal Bull <em>Spirituali Bono Christi Fidelium</em> of
                            Pope John Paul II on 18.05.1995. The Archdiocese enjoyed the gracious leadership of Archbishop Mar George
                            Valiamattam from 01.05.1989 to 30.10.2014. On his retirement, Archbishop Mar George Njaralakatt was installed
                            as the new Archbishop of Tellicherry on 30.10.2014. He assumed office on the same day. Mar Joseph Pamplany was
                            elected as the first auxiliary bishop of Tellicherry by the Holy Synod of the Syro-Malabar Church and his
                            Episcopal consecration was held on 08.11.2017 at St. Joseph’s Cathedral Church, Tellicherry. On the retirement
                            of Mar George Njaralakatt on the 20th April 2022, Mar Joseph Pamplany was installed as the Archbishop of Tellicherry.
                        </p>

                        {/* Contact Info Section */}
                        <div style={{ marginTop: '40px' }}>
                            <h5 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Contact Info</h5>
                            <p style={{ fontSize: '1.05rem', marginBottom: '10px' }}>
                                <i className="bi bi-geo-alt-fill" style={{ marginRight: '8px' }}></i>
                                The Archbishop’s House, P.B.No.70, Tellicherry-670101, Kerala, India.
                            </p>
                            <p style={{ fontSize: '1.05rem', marginBottom: '10px' }}>
                                <i className="bi bi-telephone-fill" style={{ marginRight: '8px' }}></i>
                                0091-490 2341058(R), 0091-490-2344977 (Personal), 0091-2342440 (Curia)
                            </p>
                            <p style={{ fontSize: '1.05rem', marginBottom: '10px' }}>
                                <i className="bi bi-telephone" style={{ marginRight: '8px' }}></i>
                                0091-490 2341412
                            </p>
                            <p style={{ fontSize: '1.05rem', marginBottom: '10px' }}>
                                <i className="bi bi-globe" style={{ marginRight: '8px' }}></i>
                                <a
                                    href="http://www.archdioceseoftellicherry.org"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: '#0073aa', textDecoration: 'underline' }}
                                >
                                    www.archdioceseoftellicherry.org
                                </a>
                            </p>
                        </div>

                        {/* Archbishop Card Section */}
                        <div
                            style={{
                                backgroundColor: '#fff',
                                padding: '20px',
                                border: '3px double #ccc', // 🔸 Double border
                                borderRadius: '6px',
                                boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', // 🔸 Subtle shadow
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '15px',
                                marginTop: '25px',
                                maxWidth: '420px',
                            }}
                        >

                            <img
                                src={pamplanyImage}
                                alt="Mar Joseph Pamplany"
                                style={{
                                    width: '110px',
                                    height: '130px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <h5 style={{ textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '5px' }}>
                                    ARCHBISHOP MAR JOSEPH PAMPLANY
                                </h5>
                                <p style={{ fontStyle: 'italic', fontWeight: '500', marginBottom: '8px' }}>ARCHBISHOP</p>
                                <p style={{ fontSize: '0.95rem', marginBottom: '6px' }}>
                                    <i className="bi bi-telephone-fill" style={{ marginRight: '6px' }}></i>0490 2341058
                                </p>
                                <p style={{ fontSize: '0.95rem', marginBottom: '6px' }}>
                                    <i className="bi bi-envelope-fill" style={{ marginRight: '6px' }}></i>jpamplany@gmail.com
                                </p>
                                <p style={{ fontSize: '0.95rem', marginBottom: '0' }}>
                                    <i className="bi bi-geo-alt-fill" style={{ marginRight: '6px' }}></i>
                                    Archbishop’s House, P.B. No. 70, Thalassery 670101
                                </p>
                            </div>
                        </div>
                        {/* Members of the Curia Section */}
                        <div style={{ marginTop: '40px' }}>
                            <Row xs={1} sm={2} md={4} className="g-4">
                                {[
                                    {
                                        name: 'Msgr. Muthukunnel Antony',
                                        title: 'Proto Syncellus',
                                        image: curia1,
                                    },
                                    {
                                        name: 'Msgr. Palakuzhy Sebastian',
                                        title: 'Syncellus',
                                        image: curia2,
                                    },
                                    {
                                        name: 'Msgr. Elamthuruthipadavil Mathew',
                                        title: 'Syncellus',
                                        image: curia3,
                                    },
                                    {
                                        name: 'Rev. Dr. Vettickal Jose',
                                        title: 'Judicial Vicar',
                                        image: curia4,
                                    },
                                    {
                                        name: 'Rev. Dr. Kakkaramattathil Joseph',
                                        title: 'Procurator',
                                        image: curia5,
                                    },
                                    {
                                        name: 'Rev. Dr. Muttathukunnel Joseph',
                                        title: 'Chancellor',
                                        image: curia6,
                                    },
                                ].map((member, idx) => (
                                    <Col key={idx}>
                                        <div
                                            style={{
                                                border: '2px double #ccc',
                                                borderRadius: '4px',
                                                backgroundColor: '#fff',
                                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                                textAlign: 'center',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                style={{
                                                    width: '100%',
                                                    height: '260px',
                                                    objectFit: 'cover',
                                                    borderBottom: '1px solid #ddd',
                                                }}
                                                fluid
                                            />
                                            <div style={{ padding: '10px 8px' }}>
                                                <h6
                                                    style={{
                                                        fontSize: '0.9rem',
                                                        fontWeight: 'bold',
                                                        color: '#8B0000',
                                                        margin: '5px 0',
                                                        textTransform: 'uppercase',
                                                    }}
                                                >
                                                    {member.name}
                                                </h6>
                                                <p
                                                    style={{
                                                        fontSize: '0.8rem',
                                                        fontStyle: 'italic',
                                                        color: '#444',
                                                        margin: '0',
                                                    }}
                                                >
                                                    {member.title}
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>



                    </div>



                </Col>
            </Row>
        </Container>
    );
};

export default Curia;
