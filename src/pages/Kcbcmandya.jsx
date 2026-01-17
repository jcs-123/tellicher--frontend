import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const KcbcMadyaVirudha = () => {
  return (
    <Container fluid className="p-4">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="ms-2">
          <DepartmentSidebar />
        </Col>

        {/* Main Content */}
        <Col md={8}>
          <Card className="p-4 shadow border-0 rounded">
            <h4 className="text-danger fw-bold mb-3">KCBC MADYA VIRUDHA SAMIDHI</h4>

            <p>
              <strong>“I have come so that they have life and have it in abundance”</strong> (St. John 10:10). Today, the lives of millions of
              people—our brothers, sisters, and loved ones—are endangered by the grips of alcoholism and drug abuse. As Christians, it is our
              moral duty to lead them out of this devastating bondage.
            </p>

            <p>
              The work against alcohol and drug consumption is a modern form of <strong>evangelization</strong>. It is, in fact, a profound
              <strong> pro-life movement</strong>. This realization led the <strong>Kerala Catholic Bishops’ Council (KCBC)</strong> to
              constitute the <strong>KCBC Madya Virudha Samidhi</strong> on <strong>4th December 1998</strong> with the powerful slogan:
              <em> “Alcohol Free Church and Society.”</em>
            </p>

            <p>
              Today, this movement is active in all <strong>33 Catholic dioceses of Kerala</strong>. Amidst a time of global unrest, division,
              poverty, and suffering, this mission calls upon all of us to <strong>“be merciful like our Heavenly Father.”</strong>
            </p>

            <p>
              Countless families spend their hard-earned income on alcohol and drugs, ignoring the needs of the poor and vulnerable. This is
              heartbreaking, and as a community, it is our responsibility to act.
            </p>

            <p>
              The spirit of this mission traces back to <strong>Mar Sebastian Valloppilly</strong>—known as the <em>Moses of Malabar</em>—who
              initiated the <strong>Temperance Movement</strong> in 1978. Later, <strong>Msgr. Thomas Thaithottam</strong> carried forward this
              mission with unwavering dedication and became a beacon of hope in the fight against addiction.
            </p>

            <p>
              Today, the mission continues under the leadership of <strong>Rev. Fr. Chacko Kudiparambil</strong> as Director and
              <strong> Mr. Antony Melvettom</strong> as President. Their tireless efforts are transforming lives and inspiring society toward a
              substance-free future.
            </p>

            {/* MOTTO Section */}
            <div
              className="text-white fw-bold text-center my-4 mx-auto"
              style={{
                background: 'linear-gradient(135deg, #a11d2f, #ea7e94)',
                padding: '20px',
                borderRadius: '10px',
                width: '50%',
                boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
              }}
            >
              <h5 className="mb-0">MOTTO:<br></br> </h5>“Alcohol free church and society”
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default KcbcMadyaVirudha;
