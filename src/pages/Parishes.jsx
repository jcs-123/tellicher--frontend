// src/pages/Parishes.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SideNavParish from "../components/SideNavParish";
import "./Parishes.css";

const API_BASE = "https://tellicheri.onrender.com";

const Parishes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [parishes, setParishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  /* ===============================
     READ FORANE FROM URL
  =============================== */
  const queryParams = new URLSearchParams(location.search);
  const foraneFilter = queryParams.get("forane"); // eg: ALAKODE

  /* ===============================
     FETCH PARISHES
  =============================== */
  useEffect(() => {
    const fetchParishes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/import/parishes`);

        if (!res.ok) throw new Error("Failed to fetch parishes");

        const result = await res.json();
        if (result.success) {
          setParishes(result.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        console.error("Error fetching parishes:", err);
        setError(err.message || "Error loading parishes");
      } finally {
        setLoading(false);
      }
    };

    fetchParishes();
  }, []);

  /* ===============================
     FILTER LOGIC
  =============================== */
  const filteredParishes = parishes.filter((parish) => {
    const matchesSearch = parish.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesForane = foraneFilter
      ? parish.forane_name?.toUpperCase() === foraneFilter.toUpperCase()
      : true;

    return matchesSearch && matchesForane;
  });

  /* ===============================
     NAVIGATION
  =============================== */
  const handleParishClick = (parishId) => {
    navigate(`/parish/${parishId}`);
  };

  /* ===============================
     LOADING / ERROR
  =============================== */
  if (loading) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}>
            <SideNavParish />
          </Col>
          <Col md={9} className="text-center">
            <Spinner animation="border" variant="danger" />
            <p className="mt-2">Loading parishes...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="my-4">
        <Row>
          <Col md={3}>
            <SideNavParish />
          </Col>
          <Col md={9}>
            <Alert variant="danger">{error}</Alert>
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
        <Col md={3}>
          <SideNavParish />
        </Col>

        <Col md={9}>
          <h4 className="text-danger fw-bold mb-2">PARISHES</h4>

          {foraneFilter && (
            <p className="text-muted mb-3">
              Showing parishes under{" "}
              <strong>{foraneFilter} Forane</strong>
            </p>
          )}

          <div className="d-flex justify-content-end mb-2">
            <Form.Control
              type="text"
              placeholder="Search parish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "220px" }}
            />
          </div>

          <div className="table-responsive parish-table-wrapper">
            <Table bordered hover className="parish-table text-nowrap align-middle">
              <thead className="table-danger">
                <tr>
                  <th>Sl No</th>
                  <th>Parish Name</th>
                  <th>Vicar</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredParishes.length > 0 ? (
                  filteredParishes.map((parish, index) => (
                    <tr key={parish._id}>
                      <td>{index + 1}</td>
                      <td>
                        <button
                          className="btn btn-link p-0 text-decoration-none"
                          style={{ border: "none" }}
                          onClick={() => handleParishClick(parish._id)}
                        >
                          {parish.name}
                        </button>
                      </td>
                      <td>
                        {parish.vicar_name
                          ? `Fr. ${parish.vicar_name}`
                          : "N/A"}
                      </td>
                      <td>{parish.address || "N/A"}</td>
                      <td>
                        {parish.phone ||
                          parish.mobile ||
                          parish.whatsapp_number ||
                          "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No parishes found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Parishes;
