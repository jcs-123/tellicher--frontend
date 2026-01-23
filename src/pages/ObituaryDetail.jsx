// src/pages/ObituaryDetail.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideNavPriests from "../components/SideNavPriests";

const API_BASE = "https://tellicheri.onrender.com";

const ObituaryDetail = () => {
  const { id } = useParams(); // MongoDB _id
  const [priest, setPriest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) fetchPriestById();
  }, [id]);

  const fetchPriestById = async () => {
    try {
      console.log("🔵 Fetching priest by Mongo _id:", id);
      setLoading(true);

      const res = await axios.get(
        `${API_BASE}/api/import/priests/${id}`
      );

      console.log("📦 API response:", res.data);

      if (res.data.success) {
        setPriest(res.data.data);
        setError("");
      } else {
        setError("Priest not found");
      }
    } catch (err) {
      console.error("❌ Error fetching obituary detail:", err);
      setError("Unable to load priest details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-4">{error}</Alert>;
  }

  if (!priest) {
    return <Alert variant="warning" className="m-4">No data found</Alert>;
  }

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <SideNavPriests />
        </Col>

        <Col md={9}>
          <h3 className="text-danger fw-bold mb-4">
            FR. {priest.official_name || priest.name}
          </h3>

          <Row>
            <Col md={4} className="text-center">
              <Image
                src={
                  priest.photo
                    ? `${API_BASE}/uploads/preist/${priest.photo}`
                    : "/default-priest.png"
                }
                fluid
                rounded
                onError={(e) => (e.target.src = "/default-priest.png")}
                style={{ maxHeight: 300, objectFit: "cover" }}
              />
            </Col>

            <Col md={8}>
              <p><b>Home Parish:</b> {priest.home_parish || "—"}</p>
              <p><b>Date of Birth:</b> {priest.dob ? new Date(priest.dob).toLocaleDateString() : "—"}</p>
              <p><b>Date of Death:</b> {priest.death_date ? new Date(priest.death_date).toLocaleDateString() : "—"}</p>
              <p><b>Ordination Date:</b> {priest.ordination_date ? new Date(priest.ordination_date).toLocaleDateString() : "—"}</p>
              <p><b>House Name:</b> {priest.house_name || "—"}</p>
              <p><b>Native Place:</b> {priest.place || "—"}</p>
              <p><b>Place of Burial:</b> {priest.place_of_burial || "—"}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ObituaryDetail;
