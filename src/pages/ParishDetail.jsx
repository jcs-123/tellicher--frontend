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

const API_BASE = "https://tellicheri.onrender.com";

/* ===============================
   CURRENT PRIEST CHECK
================================ */
const isCurrentPriest = (p) => p?.is_current === true || !p?.end_date;

const ParishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parish, setParish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [historyLoading, setHistoryLoading] = useState(false);
  const [currentHistory, setCurrentHistory] = useState(null);
  const [currentPriest, setCurrentPriest] = useState(null);
  const [formerPriests, setFormerPriests] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  /* ===============================
     FETCH PARISH
  =============================== */
  useEffect(() => {
    const fetchParish = async () => {
      try {
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
     FETCH PRIEST HISTORY (ALL)
  =============================== */
  useEffect(() => {
    if (!parish?.name) return;

    const fetchHistory = async () => {
      try {
        setHistoryLoading(true);
        const res = await fetch(`${API_BASE}/api/import/priest-histories?limit=10000`);
        const json = await res.json();

        const matched = (json.data || []).filter(
          (p) =>
            p.category_id?.trim().toLowerCase() ===
            parish.name.trim().toLowerCase()
        );

        setCurrentHistory(matched.find(isCurrentPriest) || null);
        setFormerPriests(matched.filter((p) => !isCurrentPriest(p)));
      } catch (err) {
        console.error(err);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [parish]);

  /* ===============================
     FETCH CURRENT PRIEST IMAGE
  =============================== */
  useEffect(() => {
    if (!currentHistory?.priest_id) return;

    const fetchPriest = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/import/priests`);
        const json = await res.json();

        const matched =
          json.data.find((p) => String(p.id) === String(currentHistory.priest_id)) ||
          json.data.find(
            (p) =>
              p.name?.toLowerCase() ===
              currentHistory.priest_name?.toLowerCase()
          );

        setCurrentPriest(matched || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPriest();
  }, [currentHistory]);

  /* ===============================
     HELPERS
  =============================== */
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");

  const filteredFormer = formerPriests.filter(
    (p) =>
      p.priest_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ===============================
     LOADING / ERROR
  =============================== */
  if (loading) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}><SideNavParish /></Col>
          <Col md={9} className="text-center mt-5">
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
              {error}
              <Button className="ms-3" size="sm" onClick={() => navigate("/parishes")}>
                Back
              </Button>
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
            <Button size="sm" variant="outline-danger" onClick={() => navigate("/parishes")}>
              Back
            </Button>
          </div>

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

          {/* ================= OVERVIEW ================= */}
          {activeTab === "overview" && (
            <>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h5 className="text-danger mb-3">Current Priest</h5>

                  {currentHistory ? (
                    <Row className="align-items-center">
                      <Col md={3} className="text-center">
                        <Image
                          src={
                            currentPriest?.photo
                              ? `${API_BASE}/uploads/preist/${currentPriest.photo}`
                              : "/priest-placeholder.jpg"
                          }
                          rounded
                          fluid
                          style={{ maxHeight: 200, objectFit: "cover" }}
                          onError={(e) => (e.target.src = "/priest-placeholder.jpg")}
                        />
                      </Col>
                      <Col md={9}>
                        <h6>Fr. {currentPriest?.official_name || currentHistory.priest_name}</h6>
                        <p className="mb-1">{currentPriest?.designation}</p>
                        <p className="mb-0">
                          From: {formatDate(currentHistory.start_date)}
                        </p>
                      </Col>
                    </Row>
                  ) : (
                    <p className="text-muted">No current priest assigned</p>
                  )}
                </Card.Body>
              </Card>

              <Card className="parish-info-card shadow-sm mb-4">
                <Card.Body>
                  <Row>
                    {/* LEFT IMAGE */}
                    <Col md={4} className="text-center">
                      <Image
                        src={
                          parish.photo
                            ? `${API_BASE}/uploads/parish/${parish.photo}`
                            : "/church-placeholder.jpg"
                        }
                        alt={parish.name}
                        className="parish-image"
                        onError={(e) => (e.target.src = "/church-placeholder.jpg")}
                      />
                    </Col>

                    {/* RIGHT DETAILS */}
                    <Col md={8}>
                      <div className="parish-details">
                        <p><strong>Address:</strong> {parish.address}</p>
                        <p><strong>Website:</strong> {parish.website || "—"}</p>
                        <p><strong>Email:</strong> {parish.email || "—"}</p>
                        <p><strong>Phone:</strong> {parish.phone || "—"}</p>
                        <p>
                          <strong>Established:</strong>{" "}
                          {parish.estb_date
                            ? new Date(parish.estb_date).getFullYear()
                            : "—"}
                        </p>
                        <p><strong>Forane:</strong> {parish.forane_name}</p>
                      </div>

                      <hr />

                      {/* STATS ROW */}
                      <Row className="text-center parish-stats">
                        <Col>
                          <h6>Area</h6>
                          <p>{parish.area || 0} sq.km</p>
                        </Col>
                        <Col>
                          <h6>Family Units</h6>
                          <p>{parish.no_family_units || 0}</p>
                        </Col>
                        <Col>
                          <h6>Families</h6>
                          <p>{parish.no_families || 0}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

            </>
          )}

          {/* ================= FORMER PRIESTS (FULL PAGE) ================= */}
          {activeTab === "former" && (
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between">
                <strong>Former Priests History</strong>
                <Form.Control
                  size="sm"
                  placeholder="Search priest / designation"
                  style={{ width: 240 }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Card.Header>

              <Card.Body className="p-0">
                {historyLoading ? (
                  <div className="text-center p-4"><Spinner /></div>
                ) : (
                  <Table bordered hover responsive className="mb-0">
                    <thead className="table-danger">
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Name</th>
                        <th>Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFormer.map((p, i) => (
                        <tr key={i}>
                          <td>{formatDate(p.start_date)}</td>
                          <td>{formatDate(p.end_date)}</td>
                          <td>Fr. {p.priest_name}</td>
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
