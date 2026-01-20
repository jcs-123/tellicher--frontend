// src/pages/Foranes.jsx
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Spinner, Alert } from "react-bootstrap";
import SideNavParish from "../components/SideNavParish";
import "./Foranes.css";
import { useNavigate } from "react-router-dom";

// Images
import alakodeImg from "../assets/i1.jpg";
import chempanthottyImg from "../assets/i2.jpg";
import chemperyImg from "../assets/i3.jpg";
import cherupuzhaImg from "../assets/i4.jpg";

const imageMap = {
  ALAKODE: alakodeImg,
  CHEMPANTHOTTY: chempanthottyImg,
  CHEMPERY: chemperyImg,
  CHERUPUZHA: cherupuzhaImg,
};

const API_BASE = "http://localhost:5000";

const Foranes = () => {
  const [foranes, setForanes] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();

  /* ===============================
     FETCH ALL PARISH DATA
     (Forane + Parish + Filial)
  =============================== */
  useEffect(() => {
    const fetchParishes = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/import/parishes`);
        const json = await res.json();

        if (!json.success) throw new Error("Failed to load parishes");

        // 🔹 Split data
        setForanes(json.data.filter(p => p.parish_type === "Forane"));
        setParishes(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParishes();
  }, []);

  /* ===============================
     COUNT PARISHES BY FORANE
  =============================== */
  const getCounts = (forane) => {
    const parishCount = parishes.filter(
      p =>
        p.parish_type === "Parish" &&
        p.forane_name?.toUpperCase() === forane.place.toUpperCase()
    ).length;

    const filialCount = parishes.filter(
      p =>
        p.parish_type === "Filial Church A" &&
        p.forane_name?.toUpperCase() === forane.place.toUpperCase()
    ).length;

    return { parishCount, filialCount };
  };

  /* ===============================
     UI
  =============================== */
  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}><SideNavParish /></Col>

        <Col md={9}>
          <h4 className="text-danger mb-4 fw-bold">FORANES</h4>

          {loading && <Spinner animation="border" variant="danger" />}
          {error && <Alert variant="danger">{error}</Alert>}

          <Row xs={1} md={2} className="g-4">
            {foranes.map((item) => {
              const { parishCount, filialCount } = getCounts(item);

              return (
                <Col key={item._id}>
                  <div className="forane-box shadow-sm">
                    <div className="forane-image-wrapper">
                      <img
                        src={
                          imageMap[item.place?.toUpperCase()] ||
                          "/default-forane.jpg"
                        }
                        alt={item.place}
                      />
                    </div>

                    <div className="forane-content">
                      <h6 className="text-uppercase fw-bold text-danger mb-2">
                        {item.place} FORANE
                      </h6>

                      <p>
                        <strong>Vicar:</strong>{" "}
                        {item.vicar_name ? `Fr. ${item.vicar_name}` : "N/A"}
                      </p>

                     <p>
  <strong>Established:</strong>{" "}
  {item.estb_date
    ? new Date(item.estb_date).getFullYear()
    : "N/A"}
</p>


                      <p className="fst-italic">
                        {item.address}
                      </p>

                      <div className="d-flex gap-2 mt-2">
                       <Button
  variant="danger"
  size="sm"
  onClick={() =>
    navigate(`/parishes?forane=${item.place}`)
  }
>
  Parishes: {parishCount}
</Button>

<Button
  variant="danger"
  size="sm"
  onClick={() =>
    navigate(`/filial-churches?forane=${item.place}`)
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
