import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Table,
  Form,
  Spinner,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import SideNavAdmin from "../components/SideNavAdmin";
import "../pages/PastoralCouncil.css";

const API_URL =
  import.meta.env.VITE_API_URL || "https://tellicheri.onrender.com/api/import";

const SECTION_NAME = "Pastoral Council";
const ROWS_PER_PAGE = 10;

const PastoralCouncil = () => {
  const [grouped, setGrouped] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("0");
  const [pageMap, setPageMap] = useState({});

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchCouncilMembers();
  }, []);

  const fetchCouncilMembers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/administration`, {
        params: { section: SECTION_NAME },
      });

      if (res.data.success) {
        const filtered = res.data.data
          .filter((i) => i.section === SECTION_NAME)
          .sort(
            (a, b) =>
              Number(a.display_order || 0) -
              Number(b.display_order || 0)
          );

        groupByCategory(filtered);
      }
    } catch (err) {
      console.error("Error fetching Pastoral Council:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= GROUP BY CATEGORY ================= */
  const groupByCategory = (data) => {
    const map = {};
    const pages = {};

    data.forEach((item) => {
      if (!map[item.category]) {
        map[item.category] = [];
        pages[item.category] = 1;
      }
      map[item.category].push(item);
    });

    setGrouped(map);
    setPageMap(pages);
  };

  /* ================= FILTER ================= */
  const filterMembers = (list) =>
    list.filter(
      (m) =>
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.designation?.toLowerCase().includes(search.toLowerCase())
    );

  /* ================= PAGINATION ================= */
  const getPaginatedData = (list, category) => {
    const page = pageMap[category] || 1;
    const start = (page - 1) * ROWS_PER_PAGE;
    return list.slice(start, start + ROWS_PER_PAGE);
  };

  const renderPagination = (total, category) => {
    const pages = Math.ceil(total / ROWS_PER_PAGE);
    if (pages <= 1) return null;

    return (
      <Pagination className="justify-content-center mt-3">
        {[...Array(pages)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={pageMap[category] === i + 1}
            onClick={() =>
              setPageMap((p) => ({ ...p, [category]: i + 1 }))
            }
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  /* ================= NAME FORMAT ================= */
  const getFullName = (m) =>
    `${m.name_title ? m.name_title + " " : ""}${m.name}`;

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={3} className="sidebar-container px-0">
          <div className="position-sticky" style={{ top: "0px" }}>
            <SideNavAdmin />
          </div>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={9}>
          <h4 className="text-danger fw-bold mb-4">PASTORAL COUNCIL</h4>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : (
            <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
              {Object.entries(grouped).length === 0 && (
                <p className="text-muted">No Pastoral Council data found.</p>
              )}

              {Object.entries(grouped).map(([category, list], index) => {
                const filtered = filterMembers(list);
                const pageData = getPaginatedData(filtered, category);

                return (
                  <Accordion.Item
                    key={category}
                    eventKey={index.toString()}
                    className={
                      activeKey === index.toString()
                        ? "active-accordion"
                        : ""
                    }
                  >
                    <Accordion.Header>
                      <i className="bi bi-people-fill me-2"></i>
                      {category}
                    </Accordion.Header>

                    <Accordion.Body>
                      <Form.Control
                        className="mb-3"
                        placeholder="Search name or designation"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <div className="table-responsive">
                        <Table bordered hover className="text-center custom-table">
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Name</th>
                              <th>Designation</th>
                              <th>Address</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pageData.map((m, i) => (
                              <tr key={m._id}>
                                <td>
                                  {(pageMap[category] - 1) * ROWS_PER_PAGE +
                                    i +
                                    1}
                                </td>

                                {/* NAME + LINK LOGIC */}
                                <td>
                                  {m.head_id && Number(m.head_id) > 0 ? (
                                    <Link
                                      to={`/priests/${m.head_id}`}
                                      className="fw-semibold text-black text-decoration-none"
                                    >
                                      {getFullName(m)}
                                    </Link>
                                  ) : (
                                    <span
                                    
                                      style={{
                                        color: "#000",
                                        cursor: "default",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {getFullName(m)}
                                    </span>
                                  )}
                                </td>

                                <td>{m.designation}</td>
                                <td>{m.address || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>

                      {renderPagination(filtered.length, category)}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PastoralCouncil;
