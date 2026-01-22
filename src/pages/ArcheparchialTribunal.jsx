import React, { useEffect, useState } from "react";
import { Table, Form, InputGroup, Spinner } from "react-bootstrap";
import SideNavAdmin from "../components/SideNavAdmin";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ArcheparchialTribunal.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/import";

const SECTION_NAME = "Archeparchial Tribunal";

const ArcheparchialTribunal = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTribunal();
  }, [search]);

  const fetchTribunal = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/administration`, {
        params: { section: SECTION_NAME },
      });

      if (res.data.success) {
       const filtered = res.data.data
  .filter((item) => item.section === SECTION_NAME)
  .filter((item) => {
    const name =
      `${item.name_title || ""} ${item.name || ""}`.toLowerCase();
    const designation = (item.category || "").toLowerCase();

    return (
      name.includes(search.toLowerCase()) ||
      designation.includes(search.toLowerCase())
    );
  })
  .sort((a, b) => {
    const orderA = Number(a.display_order || 0);
    const orderB = Number(b.display_order || 0);
    return orderA - orderB; // ✅ ascending
  });

setData(filtered);

      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching tribunal data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex tribunal-wrapper">
      {/* Sidebar */}
      <div className="sidebar-wrapper">
        <SideNavAdmin />
      </div>

      {/* Content */}
      <div className="content-wrapper p-4 w-100">
        <h3 className="text-danger fw-bold mb-4">
          ARCHEPARCHIAL TRIBUNAL
        </h3>

        {/* Search */}
        <InputGroup className="mb-3 w-50">
          <InputGroup.Text>Search</InputGroup.Text>
          <Form.Control
            placeholder="Search by name or designation"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        {/* Table */}
        {loading ? (
          <Spinner animation="border" variant="danger" />
        ) : (
          <Table striped bordered hover responsive className="tribunal-table">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>Sl No</th>
                <th>Name</th>
                <th style={{ width: "250px" }}>Designation</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row._id}>
                    <td>{index + 1}</td>
                  <td>
  {row.head_id && row.head_id !== 0 && row.head_id !== "0" ? (
    <Link
      to={`/priests/${row.head_id}`}
      className="text-decoration-none text-danger fw-bold"
    >
      {row.name_title} {row.name}
    </Link>
  ) : (
    <span
      className="fw-bold"
      style={{ color: "#d11616d3 ", cursor: "default" }}  // ✅ force muted
    >
      {row.name_title} {row.name}
    </span>
  )}
</td>

                    <td>{row.category || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No Archeparchial Tribunal data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

        <div className="text-muted small">
          Showing {data.length} entries
        </div>
      </div>
    </div>
  );
};

export default ArcheparchialTribunal;
