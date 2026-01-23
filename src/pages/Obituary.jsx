// src/pages/Obituary.jsx
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

/* ===============================
   STATIC DATA — BEFORE 2020
================================ */
const BEFORE_2020_DATA = [
  { id: 1, name: "Peter", home_parish: "Thalassery", dob: "23.06.1928", ordination: "", death: "31.08.2014" },
  { id: 2, name: "Abraham", home_parish: "Pala", dob: "27.04.1940", ordination: "", death: "31.01.1986" },
  { id: 3, name: "Zacharias", home_parish: "Muzhoor", dob: "16.01.1927", ordination: "", death: "30.08.1984" },
  { id: 4, name: "James", home_parish: "Vellad", dob: "08.08.1971", ordination: "", death: "29.07.2009" },
  { id: 5, name: "George", home_parish: "Velimanam", dob: "21.11.1933", ordination: "", death: "29.04.1997" },
  { id: 6, name: "John", home_parish: "Kuninji", dob: "01.02.1933", ordination: "", death: "28.07.2010" },
  { id: 7, name: "Zacharias", home_parish: "Thalassey", dob: "06.02.1933", ordination: "", death: "28.04.2016" },
  { id: 8, name: "Joseph", home_parish: "Vayattuparamba", dob: "08.03.1943", ordination: "", death: "27.02.1998" },
  { id: 9, name: "Jose", home_parish: "Chunkakunnu", dob: "09.10.1946", ordination: "", death: "26.12.1994" },
  { id: 10, name: "Thomas", home_parish: "Marygiri", dob: "03.07.1937", ordination: "", death: "26.11.2015" },

  { id: 11, name: "Mathew", home_parish: "Nellickampoil", dob: "24.05.1929", ordination: "", death: "26.07.2003" },
  { id: 12, name: "Francis", home_parish: "Nellikutty", dob: "05.07.1974", ordination: "", death: "25.12.2001" },
  { id: 13, name: "Augustine", home_parish: "Chempanoda", dob: "17.01.1933", ordination: "", death: "25.12.1983" },
  { id: 14, name: "Mathew", home_parish: "Cherupuzha", dob: "11.01.1964", ordination: "", death: "24.10.2007" },
  { id: 15, name: "Abraham", home_parish: "Thalassery", dob: "19.09.1937", ordination: "", death: "24.06.2019" },
  { id: 16, name: "Mathew", home_parish: "Elivaly", dob: "16.02.1948", ordination: "", death: "24.05.1997" },
  { id: 17, name: "Jose", home_parish: "Manippara", dob: "24.04.1952", ordination: "", death: "23.05.2012" },
  { id: 18, name: "John", home_parish: "Thalassery", dob: "29.07.1924", ordination: "", death: "23.05.2008" },
  { id: 19, name: "Augustine", home_parish: "Kadanad", dob: "11.01.1917", ordination: "", death: "22.09.1982" },
  { id: 20, name: "Thomas Mgr.", home_parish: "Palakkad (Pala)", dob: "09.07.1902", ordination: "", death: "22.05.1992" },

  { id: 21, name: "Paul", home_parish: "Rome", dob: "", ordination: "", death: "22.02.1960" },
  { id: 22, name: "Thomas", home_parish: "Chemperi", dob: "20.01.1935", ordination: "", death: "21.10.2013" },
  { id: 23, name: "Msgr. Jacob", home_parish: "Thalassery", dob: "20.07.1924", ordination: "", death: "21.06.2001" },
  { id: 24, name: "George Jr.", home_parish: "Areekuzha", dob: "13.06.1931", ordination: "", death: "20.09.1988" },
  { id: 25, name: "Mathew", home_parish: "Arakuzha", dob: "25.08.1925", ordination: "", death: "20.04.1972" },
  { id: 26, name: "Mathew", home_parish: "Kaveekunnu", dob: "04.01.1891", ordination: "", death: "20.02.1983" },
  { id: 27, name: "Sebastian", home_parish: "Thiruvambadi", dob: "26.02.1906", ordination: "", death: "18.11.1982" },
  { id: 28, name: "Joseph", home_parish: "Nellickampoil", dob: "13.05.1938", ordination: "", death: "17.03.1991" },
  { id: 29, name: "Joseph", home_parish: "Marangattupally", dob: "20.12.1936", ordination: "", death: "17.01.2014" },
  { id: 30, name: "Jacob Mgr.", home_parish: "Thalassery", dob: "19.03.1899", ordination: "", death: "16.05.1989" },

  { id: 31, name: "Varkey", home_parish: "Anicadu (KLM)", dob: "14.02.1932", ordination: "", death: "15.08.2012" },
  { id: 32, name: "Xavier", home_parish: "Randamkadavu", dob: "15.05.1961", ordination: "", death: "15.07.1999" },
  { id: 33, name: "Mathew", home_parish: "Bharanangnam", dob: "31.03.1940", ordination: "", death: "15.06.2015" },
  { id: 34, name: "Abraham", home_parish: "Marangattupally", dob: "30.11.1933", ordination: "", death: "14.12.1982" },
  { id: 35, name: "Thomas", home_parish: "Vellarikundu", dob: "10.07.1974", ordination: "", death: "13.09.2013" },
  { id: 36, name: "Thomas", home_parish: "Karuvanchal", dob: "28.10.1917", ordination: "", death: "13.08.1994" },
  { id: 37, name: "Thomas", home_parish: "Thalassery", dob: "06.10.1935", ordination: "", death: "10.11.2006" },
  { id: 38, name: "Sebastian", home_parish: "Chandanackampara", dob: "01.06.1960", ordination: "", death: "10.06.1994" },
  { id: 39, name: "Mathew", home_parish: "Edoor", dob: "10.11.1944", ordination: "", death: "09.01.2016" },
  { id: 40, name: "John", home_parish: "Vazhakkulam", dob: "10.11.1932", ordination: "", death: "08.07.2012" },

  { id: 41, name: "Philip (Sr.)", home_parish: "Thalassery", dob: "23.12.1907", ordination: "", death: "07.07.1994" },
  { id: 42, name: "Sebastian Joseph", home_parish: "Thalassery", dob: "25.05.1936", ordination: "", death: "06.10.2017" },
  { id: 43, name: "Abraham", home_parish: "Thalassery", dob: "15.08.1926", ordination: "", death: "06.05.1991" },
  { id: 44, name: "Joseph", home_parish: "Vadakara (Pala)", dob: "08.09.1907", ordination: "", death: "06.01.1979" },
  { id: 45, name: "Mathew", home_parish: "Thalassey", dob: "27.04.1935", ordination: "", death: "05.06.2015" },
  { id: 46, name: "Joseph", home_parish: "Pacha (Edathuava)", dob: "30.09.1940", ordination: "", death: "05.05.2002" },
  { id: 47, name: "Jacob", home_parish: "Valavoor", dob: "10.08.1923", ordination: "", death: "04.10.1994" },
  { id: 48, name: "Cyriac", home_parish: "Kainakari", dob: "20.05.1942", ordination: "", death: "04.06.1985" },
  { id: 49, name: "Joseph", home_parish: "Pulloorampara", dob: "05.06.1939", ordination: "", death: "03.08.1973" },
  { id: 50, name: "Jose", home_parish: "Vayattuparamba", dob: "11.06.1955", ordination: "", death: "03.07.2017" },

  { id: 51, name: "Raphael", home_parish: "Kottakattu (Trissur)", dob: "08.09.1932", ordination: "", death: "03.06.2007" },
  { id: 52, name: "Mani", home_parish: "Thalassey", dob: "08.09.1936", ordination: "", death: "02.07.2014" },
  { id: 53, name: "Xavier", home_parish: "Vayattuparamba", dob: "05.02.1940", ordination: "", death: "02.04.1990" },
  { id: 54, name: "Thomas", home_parish: "Koodalloor", dob: "03.08.1936", ordination: "", death: "02.01.2015" },
];


const Obituary = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("after");
  const [search, setSearch] = useState("");
  const [priests, setPriests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* ===============================
     TAB CHANGE HANDLER
  =============================== */
  useEffect(() => {
    setCurrentPage(1);

    if (activeTab === "before") {
      // ✅ STATIC DATA ONLY
      setPriests(BEFORE_2020_DATA);
      setLoading(false);
    } else {
      // ✅ API ONLY
      fetchAfter2020();
    }
  }, [activeTab]);

  /* ===============================
     FETCH AFTER 2020 ONLY
  =============================== */
  const fetchAfter2020 = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE}/api/import/priests/obituary`,
        { params: { filter: "after" } }
      );
      setPriests(res.data.success ? res.data.data : []);
    } catch {
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
  const formatDate = (date) => {
  if (!date) return "—";

  // handles ISO date, yyyy-mm-dd, dd.mm.yyyy safely
  const d = new Date(date);
  if (isNaN(d.getTime())) return date; // fallback if already formatted

  return d.toLocaleDateString("en-GB"); 
  // output: DD/MM/YYYY
};


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

          <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
            <Nav.Item>
              <Nav.Link eventKey="after">After 2020</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="before">Before 2020</Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="d-flex justify-content-end mt-3">
            <Form.Control
              placeholder="Search priest name..."
              style={{ width: 220 }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="table-responsive mt-3">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
              </div>
            ) : (
              <Table bordered hover>
                <thead className="table-danger">
                  <tr>
                    <th>Sl No</th>
                    <th>Name</th>
                    <th>Home Parish</th>
                    <th>DOB</th>
                    <th>Ordination</th>
                    <th>Death</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length > 0 ? (
                    paginated.map((p, i) => (
                      <tr key={i}>
                        <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>

                        {/* 🔴 RED FOR BEFORE | 🔗 CLICK FOR AFTER */}
                        <td>
                          {activeTab === "after" ? (
                            <span
                              className="text-danger fw-semibold"
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate(`/obituary/${p._id}`)}
                            >
                              Fr. {p.name}
                            </span>
                          ) : (
                            <span className="text-danger fw-semibold">
                              Fr. {p.name}
                            </span>
                          )}
                        </td>

                        <td>{p.home_parish || "—"}</td>
                        <td>{formatDate(p.dob)}</td>
                        <td>{formatDate(p.ordination || p.ordination_date)}</td>
                        <td>{formatDate(p.death || p.death_date)}</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center text-muted">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>

          {!loading && totalPages > 1 && (
            <Pagination size="sm">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Obituary;
