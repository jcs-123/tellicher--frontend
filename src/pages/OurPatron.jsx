// src/pages/OurPatron.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import stJoseph from '../assets/st-joseph.png';
import './OurPatron.css';

const OurPatron = () => {
  return (
    <div className="our-patron-page py-4">
      <Container>
        <Row>
          <Col md={3}>
            <SideNav />
          </Col>
          <Col md={9}>
            <h4 className="section-title text-danger fw-bold">OUR PATRON : ST. JOSEPH</h4>
            <Row className="mt-3">
              <Col md={4}>
                <img src={stJoseph} alt="St. Joseph" className="img-fluid" />
              </Col>
              <Col md={8}>
                <p>
                 When the diocese of Tellichery was erected, the first bishop Mar Sebastian Valloppilly dedicated the infant diocese to the patronage of St. Joseph who is venerated as the "protector of the body of the Christ". It is in 1870 Pope Pious IX by his apostolic letter "Quemadmodum Deus" has declared St. Joseph as the protector of the universal Church. Later St John Paul II called him "Redemptoris Custos" - custodian of the redeemer. St Joseph from the period of the early church itself was venerated as the protector and custodian of the Church. The history of the Archdiocese of Tellichery witnessed the efficacy of the mediatorship of St. Joseph and Bishop Sebastian Valloppilly called St. Joseph “The architect of Tellichery".
                </p>
                <p>
                 Gospels narrate very little of St. Joseph. He is described as "Just man". Biblical justice is not merely giving everyone his due, rather it is merciful love. Joseph showed merciful love towards his spouse Mary and a tender love towards infant Jesus. The church trusted always herself into the loving care of St. Joseph and he protected her with the same merciful and tender love with which guarded Mary and infant Jesus.
                </p>
                <p>Joseph was a shadow, a shadow of the love of Heavenly Father. Under the shadow of his fatherly love, Jesus experienced the love of Abba. The Church recognizes that Joseph so beautifully lived as the shadow of the love of the heavenly Father and hence seek his watchful protection in all generations.</p>
              </Col>   
            </Row>
          </Col>  
        </Row>
      </Container>
    </div>
  );
};

export default OurPatron;
