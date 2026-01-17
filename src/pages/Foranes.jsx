// src/pages/Foranes.jsx
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Spinner, Alert } from "react-bootstrap";
import SideNavParish from "../components/SideNavParish";
import "./Foranes.css";

// Local images
import alakodeImg from "../assets/i1.jpg";
import chempanthottyImg from "../assets/i2.jpg";
import chemperyImg from "../assets/i3.jpg";
import cherupuzhaImg from "../assets/i4.jpg";

// Map DB place → image
const imageMap = {
  ALAKODE: alakodeImg,
  CHEMPANTHOTTY: chempanthottyImg,
  CHEMPERY: chemperyImg,
  CHERUPUZHA: cherupuzhaImg,
};

const Foranes = () => {
  const [foranes, setForanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForanes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/import/foranes"
        );
        if (!response.ok) throw new Error(`Server returned ${response.status}`);
        const result = await response.json();
        if (result.success) {
          setForanes(result.data);
        } else {
          setError(result.message || "Failed to fetch foranes");
        }
      } catch (err) {
        setError(err.message || "Network error while fetching foranes");
      } finally {
        setLoading(false);
      }
    };
    fetchForanes();
  }, []);

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
            {foranes.map((item) => (
              <Col key={item._id}>
                <div className="forane-box shadow-sm">
                  <div className="forane-image-wrapper">
                    <img
                      src={imageMap[item.place?.toUpperCase()] || "/default-forane.jpg"}
                      alt={item.name}
                    />
                  </div>
                  <div className="forane-content">
                    <h6 className="text-uppercase fw-bold text-danger mb-2">
                      {item.name} FORANE
                    </h6>
                    <p><strong>Name:</strong> {item.place}</p>
                    <p><strong>Vicar:</strong> {item.vicar || "N/A"}</p>
                    <p><strong>Established Year:</strong> {item.year || "N/A"}</p>
                    <p className="fst-italic">{item.description || ""}</p>
                    <div className="d-flex gap-2 mt-2">
                      <Button variant="danger" size="sm">
                        Parishes: {item.parishes}
                      </Button>

                      <Button variant="danger" size="sm">
                        Filial Churches: {item.filialChurches || 0}
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Foranes;
