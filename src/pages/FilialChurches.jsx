// src/pages/FilialChurches.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SideNavParish from "../components/SideNavParish";
import "./Parishes.css";

const API_BASE = "http://localhost:5000";

const FilialChurches = () => {
  const [filialChurches, setFilialChurches] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  /* ===============================
     READ FORANE FROM URL
  =============================== */
  const queryParams = new URLSearchParams(location.search);
  const foraneFilter = queryParams.get("forane"); // e.g. ALAKODE

  /* ===============================
     FETCH FILIAL CHURCHES
  =============================== */
  useEffect(() => {
    const fetchFilialChurches = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/import/parishes`);
        if (!res.ok) throw new Error("Failed to fetch parishes");

        const json = await res.json();
        if (!json.success) throw new Error("Invalid API response");

        const filtered = json.data.filter((p) => {
          const isFilial =
            p.parish_type &&
            p.parish_type.toLowerCase().includes("filial");

          const matchesForane = foraneFilter
            ? p.forane_name?.toUpperCase() ===
              foraneFilter.toUpperCase()
            : true;

          return isFilial && matchesForane;
        });

        setFilialChurches(filtered);
      } catch (err) {
        console.error(err);
        setError("Unable to load filial churches");
      } finally {
        setLoading(false);
      }
    };

    fetchFilialChurches();
  }, [foraneFilter]);

  /* ===============================
     SEARCH FILTER
  =============================== */
  const filteredData = filialChurches.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ===============================
     NAVIGATION → PARISH DETAIL
     (IMPORTANT)
  =============================== */
  const handleChurchClick = (churchId) => {
    navigate(`/parish/${churchId}`);
  };

  /* ===============================
     LOADING
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
          </Col>
        </Row>
      </Container>
    );
  }

  /* ===============================
     ERROR
  =============================== */
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
          <h4 className="text-danger fw-bold mb-2">
            FILIAL CHURCHES
          </h4>

          {foraneFilter && (
            <p className="text-muted mb-3">
              Showing Filial Churches under{" "}
              <strong>{foraneFilter} Forane</strong>
            </p>
          )}

          {/* SEARCH */}
          <div className="d-flex justify-content-end mb-2">
            <Form.Control
              placeholder="Search church..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "220px" }}
            />
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <Table
              bordered
              hover
              className="parish-table text-nowrap align-middle"
            >
              <thead className="table-danger">
                <tr>
                  <th>Sl No</th>
                  <th>Church Name</th>
                  <th>Vicar</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>

                      {/* CLICK → PARISH DETAIL */}
                      <td>
                        <button
                          className="btn btn-link p-0 text-decoration-none"
                          style={{ border: "none" }}
                          onClick={() =>
                            handleChurchClick(item._id)
                          }
                        >
                          {item.name}
                        </button>
                      </td>

                      <td>
                        {item.vicar_name
                          ? `Fr. ${item.vicar_name}`
                          : "N/A"}
                      </td>

                      <td>{item.address || "N/A"}</td>

                      <td>
                        {item.phone ||
                          item.mobile ||
                          item.whatsapp_number ||
                          "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-muted"
                    >
                      No Filial Churches found
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

export default FilialChurches;
