// src/pages/PriestDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Spinner,
  Table,
  Button
} from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
  FaInstagram
} from "react-icons/fa";

import SideNavPriests from "../components/SideNavPriests";
import "./Priests.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/import";

const UPLOAD_BASE = API_URL.replace("/api/import", "");

const PriestDetail = () => {
  const { id } = useParams(); // Mongo _id
  const [priest, setPriest] = useState(null);
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);

  /* ===============================
     FETCH PRIEST (BY MONGO _id)
  =============================== */
useEffect(() => {
  const fetchPriest = async () => {
    try {
      const res = await axios.get(`${API_URL}/priests`);
      if (res.data.success) {
        const matchedPriest = res.data.data.find(
          (p) => String(p.id) === String(id) // ✅ MATCH HERE
        );

        setPriest(matchedPriest || null);
      }
    } catch (error) {
      console.error("Error fetching priest:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPriest();
}, [id]);


  /* ===============================
     FETCH SERVICE HISTORY
     (MATCH priest.id === priest_history.priest_id)
  =============================== */
  useEffect(() => {
    if (!priest?.id) return;

    const fetchHistory = async () => {
      try {
        setHistoryLoading(true);

        const res = await axios.get(`${API_URL}/priest-histories`, {
          params: {
            priest_id: String(priest.id),
            limit: 5000
          }
        });

        if (res.data.success) {
          setServiceHistory(res.data.data);
        } else {
          setServiceHistory([]);
        }
      } catch (error) {
        console.error("Error fetching priest history:", error);
        setServiceHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [priest]);

  /* ===============================
     HELPERS
  =============================== */
  const formatDate = (date) => {
    if (!date || date === "0000-00-00") return "Continuing";
    return new Date(date).toLocaleDateString();
  };

  /* ===============================
     LOADING / ERROR
  =============================== */
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (!priest) {
    return <p className="text-center py-5">Priest not found</p>;
  }

  /* ===============================
     UI
  =============================== */
  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <SideNavPriests />
        </Col>

        <Col md={9}>

          <h4 className="text-danger fw-bold text-uppercase mb-3">
            Fr. {priest.house_name ? `${priest.house_name} ` : ""}
            {priest.name}
          </h4>

          <Row>
            {/* IMAGE */}
            <Col md={4} className="text-center">
              <img
                src={
                  priest.photo
                    ? `${API_BASE}/uploads/preist/${priest.photo}`
                    : "/default-priest.png"
                }
                alt={priest.name}
                className="img-fluid shadow"
                style={{
                  width: "220px",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

            </Col>

            {/* DETAILS */}
            <Col md={8} className="priest-detail-lines">
              <p><strong>Designation:</strong> {priest.designation || "-"}</p>
              <p><strong>Current Working Place:</strong> {priest.current_place || "-"}</p>
              <p><strong>Home Parish:</strong> {priest.home_parish || "-"}</p>
              <p><strong>Date of Birth:</strong> {priest.dob ? new Date(priest.dob).toLocaleDateString() : "-"}</p>
              <p><strong>Mobile:</strong> {priest.mobile || "-"}</p>
              <p><strong>Email:</strong> {priest.email || "-"}</p>
              <p><strong>Present Address:</strong> {priest.present_address || "-"}</p>

              {/* SOCIAL */}
              <div className="social-icons mt-3">
                {priest.facebook && <a href={priest.facebook}><FaFacebookF /></a>}
                {priest.twitter && <a href={priest.twitter}><FaTwitter /></a>}
                {priest.linkedin && <a href={priest.linkedin}><FaLinkedinIn /></a>}
                {priest.googleplus && <a href={priest.googleplus}><FaGooglePlusG /></a>}
                {priest.instagram && <a href={priest.instagram}><FaInstagram /></a>}
              </div>

              <Link to="/archdiocesan-priests">
                <Button size="sm" variant="secondary" className="mt-3">
                  ← Back to Priests
                </Button>
              </Link>
            </Col>
          </Row>

          {/* ================= SERVICE HISTORY ================= */}
          <div className="mt-4">
            <h5 className="service-header">
              SERVICE HISTORY ({serviceHistory.length})
            </h5>

            {historyLoading ? (
              <Spinner animation="border" />
            ) : (
              <Table bordered striped hover responsive>
                <thead className="table-danger text-center">
                  <tr>
                    <th>#</th>
                    <th>Service Type</th>
                    <th>Place</th>
                    <th>Designation</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceHistory.length ? (
                    serviceHistory.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.category_type || "MINISTRY"}</td>
                        <td>{item.category_id || "-"}</td>
                        <td>{item.designation || "-"}</td>
                        <td>
                          {formatDate(item.start_date)} to {formatDate(item.end_date)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No service history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PriestDetail;
