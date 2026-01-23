
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import SideNav from "../components/SideNav";
import axios from "axios";

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { data } = await axios.get("https://tellicheri.onrender.com/api/statistics");
        setStatisticsData(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStatistics();
  }, []);

  const renderTable = (rows) => (
    <Table bordered size="sm" style={{ marginBottom: 0 }}>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td
              style={{
                backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff",
                fontSize: "13px",
                padding: "6px 10px",
                fontWeight: "500",
              }}
            >
              {row.label}
            </td>
            <td
              style={{
                textAlign: "right",
                backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff",
                fontSize: "13px",
                padding: "6px 10px",
                fontWeight: "500",
              }}
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div style={{ padding: "30px 0", backgroundColor: "#fff" }}>
      <Container>
        <Row>
          <Col md={3}>
            <SideNav />
          </Col>
          <Col md={9}>
            <h4 style={{ color: "#d72638", fontWeight: "bold", marginBottom: "20px", fontSize: "22px", textTransform: "uppercase" }}>
              Statistics
            </h4>

            <Row>
              {statisticsData.map((section, index) => {
                const isDualColumn =
                  section.title === "EDUCATIONAL INSTITUTIONS" ||
                  section.title === "CHARITABLE INSTITUTIONS";

                if (isDualColumn) {
                  const splitIndex = Math.ceil(section.rows.length / 2);
                  const leftRows = section.rows.slice(0, splitIndex);
                  const rightRows = section.rows.slice(splitIndex);

                  return (
                    <Col md={12} key={index} style={{ marginBottom: "20px" }}>
                      <Card style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
                        <Card.Header style={{ backgroundColor: "#d72638", color: "#fff", fontWeight: "600", fontSize: "15px", padding: "8px 12px" }}>
                          {section.title}
                        </Card.Header>
                        <Card.Body style={{ padding: "8px" }}>
                          <Row>
                            <Col md={6}>{renderTable(leftRows)}</Col>
                            <Col md={6}>{renderTable(rightRows)}</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                }

                return (
                  <Col md={6} key={index} style={{ marginBottom: "20px" }}>
                    <Card style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
                      <Card.Header style={{ backgroundColor: "#d72638", color: "#fff", fontWeight: "600", fontSize: "15px", padding: "8px 12px" }}>
                        {section.title}
                      </Card.Header>
                      <Card.Body style={{ padding: "8px" }}>{renderTable(section.rows)}</Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Statistics;

// import React from 'react';
// import { Container, Row, Col, Card, Table } from 'react-bootstrap';
// import SideNav from '../components/SideNav';

// const statisticsData = [
//     {
//         title: 'AREA AND POPULATION',
//         rows: [
//             ['Area', '4953 Sq. Kms'],
//             ['Syrian Catholic Families', '62778'],
//             ['Syrian Catholic Population', '289559'],
//             ['Total Population', '36,05,000'],
//         ],
//     },
//     {
//         title: 'CHURCHES',
//         rows: [
//             ['Cathedral', '1'],
//             ['Parish Churches', '198'],
//             ['Filial Churches & Stations', '75'],
//             ['Wayside Chapels', '314'],
//         ],
//     },
//     {
//         title: 'PRIESTS',
//         rows: [
//             ['Diocesan Priests', '353'],
//             ['Religious Priests in ministry', '32'],
//         ],
//     },
//     {
//         title: 'SEMINARIANS & CONGREGATIONS',
//         rows: [
//             ['Seminarians', '115'],
//             ['Congregations', '99'],
//         ],
//     },
//     {
//         title: 'EDUCATIONAL INSTITUTIONS',
//         rows: [
//             ['Arts & Science College', '8'],
//             ['Engineering College', '1'],
//             ['Formation House', '22 (5   Men, 17 Women)'],
//             ['High School', '51'],
//             ['Higher Secondary School', '34'],
//             ['ITC', '3'],
//             ['Lower Primary School', '28'],
//             ['Nursery School', '68'],
//             ['Nursing School', '2'],
//             ['Parallel College', '4'],
//             ['Paramedical School', '1'],
//             ['Seminary', '10'],
//             ['Special School', '1'],
//             ['Technical School', '3'],
//             ['Upper Primary School', '42'],
//         ],
//     },
//     {
//         title: 'CHARITABLE INSTITUTIONS',
//         rows: [
//             ['Book Stall', '5'],
//             ['Counselling Centre', '14'],
//             ['Day Care Centre', '2'],
//             ['Dispensaries', '2'],
//             ['Home for Physically Handicapped', '3'],
//             ['Home for the Aged', '34'],
//             ['Homeopathic Dispensaries', '8'],
//             ['Hospital', '7'],
//             ['Medical Laboratory', '1'],
//             ['Hostels & Boardings', '33'],
//             ['Nature Cure Centre', '6'],
//             ['Orphanage', '13'],
//             ['Press', '1'],
//             ['Rehabilitation Centre', '5'],
//             ['Retreat Centre', '7'],
//             ['Social Work', '16'],
//             ['Training Centre', '4'],
//             ['De - Addiction Centre', '1'],
//             ['Palliative Care', '2'],
//             ['Boarding for patients and bystanders', '2'],
//             ["Priest's Home", '1'],
//         ],
//     },
// ];

// const Statistics = () => {
//     return (
//         <div style={{ padding: '30px 0', backgroundColor: '#fff' }}>
//             <Container>
//                 <Row>
//                     <Col md={3}>
//                         <SideNav />
//                     </Col>
//                     <Col md={9}>
//                         <h4
//                             style={{
//                                 color: '#d72638',
//                                 fontWeight: 'bold',
//                                 marginBottom: '20px',
//                                 fontSize: '22px',
//                                 textTransform: 'uppercase',
//                             }}
//                         >
//                             Statistics
//                         </h4>

//                         <Row>
//                             {statisticsData.map((section, index) => {
//                                 const isDualColumn =
//                                     section.title === 'EDUCATIONAL INSTITUTIONS' ||
//                                     section.title === 'CHARITABLE INSTITUTIONS';

//                                 if (isDualColumn) {
//                                     const splitIndex = Math.ceil(section.rows.length / 2);
//                                     const leftRows = section.rows.slice(0, splitIndex);
//                                     const rightRows = section.rows.slice(splitIndex);

//                                     const renderTable = (rows) => (
//                                         <Table bordered size="sm" style={{ marginBottom: 0 }}>
//                                             <tbody>
//                                                 {rows.map(([label, value], idx) => (
//                                                     <tr key={idx}>
//                                                         <td
//                                                             style={{
//                                                                 backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
//                                                                 fontSize: '13px',
//                                                                 padding: '6px 10px',
//                                                                 fontWeight: '500',
//                                                             }}
//                                                         >
//                                                             {label}
//                                                         </td>
//                                                         <td
//                                                             style={{
//                                                                 textAlign: 'right',
//                                                                 backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
//                                                                 fontSize: '13px',
//                                                                 padding: '6px 10px',
//                                                                 fontWeight: '500',
//                                                             }}
//                                                         >
//                                                             {value}
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </Table>
//                                     );

//                                     return (
//                                         <Col md={12} key={index} style={{ marginBottom: '20px' }}>
//                                             <Card style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
//                                                 <Card.Header
//                                                     style={{
//                                                         backgroundColor: '#d72638',
//                                                         color: '#fff',
//                                                         fontWeight: '600',
//                                                         fontSize: '15px',
//                                                         padding: '8px 12px',
//                                                     }}
//                                                 >
//                                                     {section.title}
//                                                 </Card.Header>
//                                                 <Card.Body style={{ padding: '8px' }}>
//                                                     <Row>
//                                                         <Col md={6}>{renderTable(leftRows)}</Col>
//                                                         <Col md={6}>{renderTable(rightRows)}</Col>
//                                                     </Row>
//                                                 </Card.Body>
//                                             </Card>
//                                         </Col>
//                                     );
//                                 }

//                                 return (
//                                     <Col md={6} key={index} style={{ marginBottom: '20px' }}>
//                                         <Card style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
//                                             <Card.Header
//                                                 style={{
//                                                     backgroundColor: '#d72638',
//                                                     color: '#fff',
//                                                     fontWeight: '600',
//                                                     fontSize: '15px',
//                                                     padding: '8px 12px',
//                                                 }}
//                                             >
//                                                 {section.title}
//                                             </Card.Header>
//                                             <Card.Body style={{ padding: '8px' }}>
//                                                 <Table bordered size="sm" style={{ marginBottom: 0 }}>
//                                                     <tbody>
//                                                         {section.rows.map(([label, value], idx) => (
//                                                             <tr key={idx}>
//                                                                 <td
//                                                                     style={{
//                                                                         backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
//                                                                         fontSize: '13px',
//                                                                         padding: '6px 10px',
//                                                                         fontWeight: '500',
//                                                                     }}
//                                                                 >
//                                                                     {label}
//                                                                 </td>
//                                                                 <td
//                                                                     style={{
//                                                                         textAlign: 'right',
//                                                                         backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
//                                                                         fontSize: '13px',
//                                                                         padding: '6px 10px',
//                                                                         fontWeight: '500',
//                                                                     }}
//                                                                 >
//                                                                     {value}
//                                                                 </td>
//                                                             </tr>
//                                                         ))}
//                                                     </tbody>
//                                                 </Table>
//                                             </Card.Body>
//                                         </Card>
//                                     </Col>
//                                 );
//                             })}
//                         </Row>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default Statistics;



// import React from 'react';
// import { Container, Row, Col, Card, Table } from 'react-bootstrap';
// import SideNav from '../components/SideNav';

// const statisticsData = [
//     {
//         title: 'AREA AND POPULATION',
//         rows: [
//             ['Area', '4953 Sq. Kms'],
//             ['Syrian Catholic Families', '62778'],
//             ['Syrian Catholic Population', '289559'],
//             ['Total Population', '36,05,000'],
//         ],
//     },
//     {
//         title: 'CHURCHES',
//         rows: [
//             ['Cathedral', '1'],
//             ['Parish Churches', '198'],
//             ['Filial Churches & Stations', '75'],
//             ['Wayside Chapels', '314'],
//         ],
//     },
//     {
//         title: 'PRIESTS',
//         rows: [
//             ['Diocesan Priests', '353'],
//             ['Religious Priests in ministry', '32'],
//         ],
//     },
//     {
//         title: 'SEMINARIANS & CONGREGATIONS',
//         rows: [
//             ['Seminarians', '115'],
//             ['Congregations', '99'],
//         ],
//     },
//     {
//         title: 'EDUCATIONAL INSTITUTIONS',
//         rows: [
//             ['Arts & Science College', '8'],
//             ['Engineering College', '1'],
//             ['Formation House', '22 (5   Men, 17 Women)'],
//             ['High School', '51'],
//             ['Higher Secondary School', '34'],
//             ['ITC', '3'],
//             ['Lower Primary School', '28'],
//             ['Nursery School', '68'],
//             ['Nursing School', '2'],
//             ['Parallel College', '4'],
//             ['Paramedical School', '1'],
//             ['Seminary', '10'],
//             ['Special School', '1'],
//             ['Technical School', '3'],
//             ['Upper Primary School', '42'],
//         ],
//     },
//     {
//         title: 'CHARITABLE INSTITUTIONS',
//         rows: [
//             ['Book Stall', '5'],
//             ['Counselling Centre', '14'],
//             ['Day Care Centre', '2'],
//             ['Dispensaries', '2'],
//             ['Home for Physically Handicapped', '3'],
//             ['Home for the Aged', '34'],
//             ['Homeopathic Dispensaries', '8'],
//             ['Hospital', '7'],
//             ['Medical Laboratory', '1'],
//             ['Hostels & Boardings', '33'],
//             ['Nature Cure Centre', '6'],
//             ['Orphanage', '13'],
//             ['Press', '1'],
//             ['Rehabilitation Centre', '5'],
//             ['Retreat Centre', '7'],
//             ['Social Work', '16'],
//             ['Training Centre', '4'],
//             ['De - Addiction Centre', '1'],
//             ['Palliative Care', '2'],
//             ['Boarding for patients and bystanders', '2'],
//             ["Priest's Home", '1'],
//         ],
//     },
// ];

// const Statistics = () => {
//     return (
//         <div style={{ padding: '30px 0', backgroundColor: '#fff' }}>
//             <Container>
//                 <Row>
//                     <Col md={3}>
//                         <SideNav />
//                     </Col>
//                     <Col md={9}>
//                         <h4
//                             style={{
//                                 color: '#d72638',
//                                 fontWeight: 'bold',
//                                 marginBottom: '20px',
//                                 fontSize: '22px',
//                                 textTransform: 'uppercase',
//                             }}
//                         >
//                             Statistics
//                         </h4>

//                         <Row>
//                             {statisticsData.map((section, index) => (
//                                 <Col md={6} key={index} style={{ marginBottom: '20px' }}>
//                                     <Card style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
//                                         <Card.Header
//                                             style={{
//                                                 backgroundColor: '#d72638',
//                                                 color: '#fff',
//                                                 fontWeight: '600',
//                                                 fontSize: '15px',
//                                                 padding: '8px 12px',
//                                             }}
//                                         >
//                                             {section.title}
//                                         </Card.Header>
//                                         <Card.Body style={{ padding: '8px' }}>
//                                             <Table bordered size="sm" style={{ marginBottom: 0 }}>
//                                                 <tbody>
//                                                     {section.rows.map(([label, value], idx) => (
//                                                         <tr key={idx}>
//                                                             <td
//                                                                 style={{
//                                                                     backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
//                                                                     fontSize: '13px',
//                                                                     padding: '6px 10px',
//                                                                     fontWeight: '500',
//                                                                 }}
//                                                             >
//                                                                 {label}
//                                                             </td>
//                                                             <td
//                                                                 style={{
//                                                                     textAlign: 'right',
//                                                                     backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff',
//                                                                     fontSize: '13px',
//                                                                     padding: '6px 10px',
//                                                                     fontWeight: '500',
//                                                                 }}
//                                                             >
//                                                                 {value}
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </Table>
//                                         </Card.Body>
//                                     </Card>
//                                 </Col>
//                             ))}
//                         </Row>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default Statistics;
