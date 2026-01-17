import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const FamilyUnits = () => {
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
            <h4 className="text-danger fw-bold mb-3">FAMILY UNITS (FRUITS)</h4>

            <p>
              The official name of the Kudumba Koottayma in the Archdiocese of Thalassery is <strong>FAMILY RENEWAL UNITS IN THALASSERY (FRUITS)</strong>.
              This movement was initiated by <strong>Archbishop Mar George Njaralakatt</strong>, who formed a new department for Kudumba Koottayma and
              appointed <strong>Fr. Mathew Asariparambil</strong> as the Director.
            </p>

            <p>
              Fr. Mathew was entrusted with the task of forming and establishing Kudumba Koottayma in all parishes across the Archdiocese. After extensive
              discussions with priests, lay leaders, heads of departments, and curia members, the Archbishop issued a pastoral letter to all parishes,
              directing them to form Family Units before <strong>October 30<sup>th</sup></strong>.
            </p>

            <p>
              The Parish Priests earnestly implemented the instructions, and Family Units were formed as per the guidelines provided by the FRUITS
              Department. A single Family Unit typically consists of <strong>20 families</strong>, along with <strong>5 office bearers</strong>:
              <ul>
                <li>President</li>
                <li>Vice-President</li>
                <li>Secretary</li>
                <li>Treasurer</li>
                <li>Convenor</li>
              </ul>
              It also includes representatives from each organization in the parish.
            </p>

            <p>
              In <strong>November</strong>, training programs for unit leaders were conducted in <strong>16 Forane Centers</strong>. On
              <strong> December 1, 2018</strong>, the Kudumba Koottayma was officially inaugurated in the diocese by Archbishop Mar George Njaralakatt
              during a Holy Mass and public gathering at <strong>Chemperi</strong>.
            </p>

            <p>
              For smooth functioning, each family was provided with a <strong>prayer book</strong>, <strong>bylaw manual</strong>, and a
              <strong> report book</strong>. These resources ensure the unity, prayerful gathering, and vibrant community living of the families
              through the FRUITS initiative.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FamilyUnits;
