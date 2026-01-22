import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Nav,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNavObituary from "../components/SideNavPriests";
import "./Obituary.css";

const API_BASE = "http://localhost:5000";

const Obituary = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("after");
  const [search, setSearch] = useState("");
  const [priests, setPriests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* ===============================
     FETCH OBITUARY
  =============================== */
  useEffect(() => {
    fetchObituary();
    setCurrentPage(1);
  }, [activeTab]);

  const fetchObituary = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE}/api/import/priests/obituary`,
        { params: { filter: activeTab } }
      );

      if (res.data.success) {
        setPriests(res.data.data);
      } else {
        setPriests([]);
      }
    } catch (err) {
      console.error("❌ Obituary fetch error:", err.message);
      setPriests([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     SEARCH + PAGINATION
  =============================== */
  const filtered = priests.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ===============================
     UI
  =============================== */
  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <SideNavObituary />
        </Col>

        <Col md={9}>
          <h4 className="text-danger fw-bold mb-3">OBITUARY</h4>

          {/* Tabs */}
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={(key) => {
              setActiveTab(key);
              setSearch("");
            }}
          >
            <Nav.Item>
              <Nav.Link eventKey="after" className="fw-semibold">
                After 2020
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="before" className="fw-semibold">
                Before 2020
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Search */}
          <div className="d-flex justify-content-end mt-3">
            <Form.Control
              type="text"
              placeholder="Search priest name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={{ width: "220px" }}
            />
          </div>

          {/* Table */}
          <div className="table-responsive mt-3">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
              </div>
            ) : (
              <Table bordered hover className="align-middle">
                <thead className="table-danger">
                  <tr>
                    <th style={{ width: 60 }}>Sl No</th>
                    <th>Name</th>
                    <th>Home Parish</th>
                    <th>Date of Birth</th>
                    <th>Ordination Date</th>
                    <th>Date of Death</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length > 0 ? (
                    paginated.map((p, index) => (
                      <tr key={p._id}>
                        <td>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        {/* CLICKABLE NAME */}
                        <td>
                          <span
                            className="text-danger fw-semibold"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/priests/${p.id || p._id}`)
                            }
                          >
                            {p.name}
                          </span>
                        </td>

                        <td>{p.home_parish || "-"}</td>
                        <td>
                          {p.dob
                            ? new Date(p.dob).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>
                          {p.ordination_date
                            ? new Date(p.ordination_date).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>
                          {p.death_date
                            ? new Date(p.death_date).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center">
              <small>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filtered.length)} of{" "}
                {filtered.length}
              </small>

              <Pagination size="sm">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                />
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <Pagination.Item
                    key={idx}
                    active={currentPage === idx + 1}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                />
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Obituary;
