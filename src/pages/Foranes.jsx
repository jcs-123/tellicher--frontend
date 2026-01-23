// src/pages/Foranes.jsx
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Spinner,
  Alert
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SideNavParish from "../components/SideNavParish";
import "./Foranes.css";

const API_BASE = "http://localhost:5000";

/* ===============================
   STRONG NORMALIZE (SAFE MATCH)
   =============================== */
const normalize = (value = "") =>
  value
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z]/g, "")
    .trim();

const Foranes = () => {
  const [foranes, setForanes] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /* ===============================
     FETCH FORANES + PARISHES
     =============================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foraneRes, parishRes] = await Promise.all([
          fetch(`${API_BASE}/api/import/foranes`),
          fetch(`${API_BASE}/api/import/parishes`)
        ]);

        const foraneJson = await foraneRes.json();
        const parishJson = await parishRes.json();

        if (!foraneJson.success) throw new Error("Foranes fetch failed");
        if (!parishJson.success) throw new Error("Parishes fetch failed");

        console.log("✅ FORANES:", foraneJson.data);
        console.log("✅ PARISHES:", parishJson.data);

        setForanes(foraneJson.data);
        setParishes(parishJson.data);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ===============================
     DERIVE DATA PER FORANE
     =============================== */
  const getForaneDetails = (forane) => {
    const key = normalize(forane.place);

    // ✅ MAIN PARISH = PLACE MATCH
    const mainParish = parishes.find(
      p => normalize(p.place) === key
    );

    // ✅ COUNTS = FORANE NAME MATCH
    const relatedParishes = parishes.filter(
      p => normalize(p.forane_name) === key
    );

    const parishCount = relatedParishes.filter(
      p => p.parish_type === "Parish"
    ).length;

    const filialCount = relatedParishes.filter(
      p => p.parish_type === "Filial Church A"
    ).length;

    console.log(`🔍 ${forane.place}`, {
      mainParish,
      parishCount,
      filialCount
    });

    return {
      parishCount,
      filialCount,
      vicar_name: mainParish?.vicar_name,
      estb_date: mainParish?.estb_date,
      address: mainParish?.address,
      photo: mainParish?.photo
    };
  };

  /* ===============================
     IMAGE FROM PARISH ONLY
     =============================== */
  const getForaneImage = (photo) => {
    if (!photo) {
      console.warn("⚠️ No image found → default");
      return "/default-forane.jpg"; // must exist in public/
    }

    const url = `${API_BASE}/uploads/parish/${photo}`;
    console.log("🖼️ IMAGE URL:", url);
    return url;
  };

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
          <h4 className="text-danger mb-4 fw-bold">FORANES</h4>

          {loading && <Spinner animation="border" variant="danger" />}
          {error && <Alert variant="danger">{error}</Alert>}

          <Row xs={1} md={2} className="g-4">
            {foranes.map((forane) => {
              const {
                parishCount,
                filialCount,
                vicar_name,
                estb_date,
                address,
                photo
              } = getForaneDetails(forane);

              return (
                <Col key={forane._id || forane.id}>
                  <div className="forane-box shadow-sm">

                    <div className="forane-image-wrapper">
                      <img
                        src={getForaneImage(photo)}
                        alt={forane.place}
                        className="forane-image"
                        onError={(e) => {
                          console.error("❌ IMAGE LOAD FAILED:", e.target.src);
                          e.target.src = "/default-forane.jpg";
                        }}
                      />
                    </div>

                    <div className="forane-content">
                      <h6 className="text-uppercase fw-bold text-danger mb-2">
                        {forane.place} FORANE
                      </h6>

                      <p>
                        <strong>Vicar:</strong>{" "}
                        {vicar_name ? `Fr. ${vicar_name}` : "N/A"}
                      </p>

                      <p>
                        <strong>Established:</strong>{" "}
                        {estb_date ? new Date(estb_date).toLocaleDateString('en-US') : "N/A"}
                      </p>

                      <p className="fst-italic">
                        {address || "—"}
                      </p>

                      <div className="d-flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            navigate(`/parishes?forane=${forane.place}`)
                          }
                        >
                          Parishes: {parishCount}
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            navigate(`/filial-churches?forane=${forane.place}`)
                          }
                        >
                          Filial Churches: {filialCount}
                        </Button>
                      </div>
                    </div>

                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Foranes;
