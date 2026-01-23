import React, { useEffect, useState } from "react";
import { Accordion, Table, Spinner, Form } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNavAdmin from "../components/SideNavAdmin";
import SafeEnvironmentPDF from "../assets/Safe Environment Draft.pdf";
import "./OtherCommittees.css";

const API_BASE = "http://localhost:5000";

const COMMITTEE_SECTIONS = [
  "Safe Enviornment Committee",
  "Construction Committee",
  "College of Eparchial Consultors",
  "Finance Council",
  "Censor of Books",
  "Public Relations Committee",
  "Other Administrative office",
];

const OtherCommittees = () => {
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState(null);
  const [dataBySection, setDataBySection] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllCommittees();
  }, []);

  const fetchAllCommittees = async () => {
    try {
      setLoading(true);
      const result = {};

      for (const section of COMMITTEE_SECTIONS) {
        const res = await axios.get(
          `${API_BASE}/api/import/administration`,
          { params: { section } }
        );

        result[section] = res.data.success
          ? res.data.data.sort(
              (a, b) =>
                Number(a.display_order || 0) -
                Number(b.display_order || 0)
            )
          : [];
      }

      setDataBySection(result);
    } catch (err) {
      console.error("❌ Error fetching committees:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterList = (list) => {
    if (!search) return list;
    return list.filter(
      (m) =>
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.designation?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="committees-wrapper d-flex">
      <div className="sidebar-wrapper">
        <SideNavAdmin />
      </div>

      <div className="content-wrapper p-4 w-100">
        <h4 className="text-danger fw-bold mb-4">
          OTHER COMMITTEES
        </h4>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <Accordion activeKey={activeKey} flush>
            {COMMITTEE_SECTIONS.map((section) => (
              <Accordion.Item eventKey={section} key={section}>
                <Accordion.Header
                  onClick={() =>
                    setActiveKey(
                      activeKey === section ? null : section
                    )
                  }
                >
                  <FaUsers className="me-2" />
                  {section}
                </Accordion.Header>

                <Accordion.Body>
                  {/* SEARCH */}
                  <div className="d-flex justify-content-end mb-2">
                    <Form.Control
                      style={{ width: 220 }}
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  {/* TABLE */}
                  <Table bordered hover responsive>
                    <thead className="table-danger">
                      <tr>
                        <th style={{ width: 80 }}>Sl No</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Phone No</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filterList(dataBySection[section] || []).length ? (
                        filterList(dataBySection[section]).map((m, i) => {
                          const isPriest =
                            m.head_id && String(m.head_id) !== "0";

                          return (
                            <tr key={m._id}>
                              <td>{i + 1}</td>

                              {/* ✅ CONDITIONAL NAVIGATION */}
                              <td>
                                <span
                                  className={
                                    isPriest
                                      ? "fw-semibold text-black"
                                      : "fw-semibold"
                                  }
                                  style={{
                                    cursor: isPriest
                                      ? "pointer"
                                      : "default",
                                  }}
                                  onClick={() => {
                                    if (isPriest) {
                                      navigate(
                                        `/priests/${m.head_id}`
                                      );
                                    }
                                  }}
                                >
                                  {m.name_title} {m.name}
                                </span>
                              </td>

                              <td>
                                {m.category ||
                                  m.designation ||
                                  "—"}
                              </td>
                              <td>{m.mobile || "—"}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center text-muted"
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  {/* 📄 PDF ONLY FOR SAFE ENVIRONMENT */}
                  {section === "Safe Enviornment Committee" && (
                    <div className="mt-4">
                      <h6 className="text-danger fw-bold mb-2">
                        Safe Environment Draft
                      </h6>

                      <iframe
                        src={SafeEnvironmentPDF}
                        title="Safe Environment Draft"
                        width="100%"
                        height="600px"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default OtherCommittees;
