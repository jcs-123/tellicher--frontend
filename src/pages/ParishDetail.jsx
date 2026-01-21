import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Alert,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import SideNavParish from "../components/SideNavParish";
import "./ParishDetail.css";

const API_BASE = "http://localhost:5000";

/* ===============================
   CURRENT PRIEST LOGIC
   =============================== */
const isCurrentPriest = (p) => {
  return p?.is_current === true || !p?.end_date;
};

const ParishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parish, setParish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [historyLoading, setHistoryLoading] = useState(false);
  const [currentPriest, setCurrentPriest] = useState(null);
  const [formerPriests, setFormerPriests] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  /* ===============================
     FETCH PARISH
  =============================== */
  useEffect(() => {
    const fetchParish = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/import/parishes/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error("Parish not found");
        setParish(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchParish();
  }, [id]);

  /* ===============================
     FETCH PRIEST HISTORY
  =============================== */
  useEffect(() => {
    if (!parish?.name) return;

    const fetchHistory = async () => {
      try {
        setHistoryLoading(true);

        const res = await fetch(
          `${API_BASE}/api/import/priest-histories?limit=5000`
        );
        const json = await res.json();

        const matched = (json.data || []).filter(
          (p) =>
            p.category_id &&
            p.category_id.trim().toLowerCase() ===
            parish.name.trim().toLowerCase()
        );

        const current =
          matched.find((p) => isCurrentPriest(p)) || null;

        const former = matched.filter((p) => !isCurrentPriest(p));

        setCurrentPriest(current);
        setFormerPriests(former);
      } catch (err) {
        console.error(err);
        setCurrentPriest(null);
        setFormerPriests([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [parish]);

  /* ===============================
     HELPERS
  =============================== */
  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "—";

  const filteredFormer = formerPriests.filter(
    (p) =>
      p.priest_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedFormer = filteredFormer.slice(0, entriesToShow);

  /* ===============================
     LOADING / ERROR
  =============================== */
  if (loading) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}><SideNavParish /></Col>
          <Col md={9} className="text-center">
            <Spinner animation="border" variant="danger" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (error || !parish) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}><SideNavParish /></Col>
          <Col md={9}>
            <Alert variant="danger">
              {error || "Parish not found"}
              <div className="mt-2">
                <Button onClick={() => navigate("/parishes")}>Back</Button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  /* ===============================
     UI
  =============================== */
  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}><SideNavParish /></Col>

        <Col md={9}>
          <div className="d-flex justify-content-between mb-3">
            <h4 className="text-danger fw-bold">{parish.name}</h4>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => navigate("/parishes")}
            >
              Back
            </Button>
          </div>

          {/* ================= CURRENT PRIEST ================= */}
          {activeTab === "overview" && (
            <Card className="mb-4">
              <Card.Body>
                <h5 className="text-danger mb-3">Current Priest</h5>

                {currentPriest ? (
                  <Row className="align-items-center">
                    <Col md={3}>
                      <Image
                        src="/priest-placeholder.jpg"
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={9}>
                      <h6 className="mb-1">
                        Fr.{" "}
                        {currentPriest.priest_name ||
                          currentPriest.priest_id}
                      </h6>
                      <p className="mb-1">
                        {currentPriest.designation}
                      </p>
                      <p className="mb-0">
                        From: {formatDate(currentPriest.start_date)}
                      </p>
                    </Col>
                  </Row>
                ) : (
                  <p className="text-muted">No current priest</p>
                )}
              </Card.Body>
            </Card>
          )}

          {/* ================= PARISH DETAILS ================= */}
          {activeTab === "overview" && (
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={5}>
                    <Image
                      src={
                        parish.photo
                          ? `${API_BASE}/uploads/parish/${parish.photo}`
                          : "/church-placeholder.jpg"
                      }
                      alt={parish.name}
                      rounded
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "cover"
                      }}
                    />


                  </Col>

                  <Col md={7}>
                    <p><strong>Address:</strong> {parish.address}</p>
                    <p><strong>Website:</strong> {parish.website || "—"}</p>
                    <p><strong>Email:</strong> {parish.email || "—"}</p>
                    <p><strong>Phone:</strong> {parish.phone || "—"}</p>

                    <p>
                      <strong>Established:</strong>{" "}
                      {parish.estb_date
                        ? new Date(parish.estb_date).getFullYear()
                        : "N/A"}
                    </p>

                    <p><strong>Forane:</strong> {parish.forane_name}</p>

                    <hr />
                    <Row>
                      <Col>
                        <strong>Area</strong><br />
                        {parish.area || 0} sq.km
                      </Col>
                      <Col>
                        <strong>Family Units</strong><br />
                        {parish.no_family_units || 0}
                      </Col>
                      <Col>
                        <strong>Families</strong><br />
                        {parish.no_families || 0}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* ================= TABS ================= */}
          <div className="parish-nav-tabs mb-3">
            <button
              className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`nav-tab ${activeTab === "former" ? "active" : ""}`}
              onClick={() => setActiveTab("former")}
            >
              Former Priests
            </button>
          </div>

          {/* ================= FORMER PRIESTS ================= */}
          {activeTab === "former" && (
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Form.Select
                  size="sm"
                  style={{ width: 90 }}
                  value={entriesToShow}
                  onChange={(e) => setEntriesToShow(+e.target.value)}
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </Form.Select>

                <Form.Control
                  size="sm"
                  placeholder="Search"
                  style={{ width: 200 }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Card.Header>

              <Card.Body className="p-0">
                {historyLoading ? (
                  <div className="text-center p-3">
                    <Spinner />
                  </div>
                ) : (
                  <Table bordered hover className="mb-0">
                    <thead className="table-danger">
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Name</th>
                        <th>Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedFormer.map((p, i) => (
                        <tr key={i}>
                          <td>{formatDate(p.start_date)}</td>
                          <td>{formatDate(p.end_date)}</td>
                          <td>
                            Fr.{" "}
                            {p.priest_name || p.priest_id}
                          </td>
                          <td>{p.designation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ParishDetail;
