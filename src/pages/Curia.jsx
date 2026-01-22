import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import SideNavAdmin from "../components/SideNavAdmin";
import axios from "axios";
import { Link } from "react-router-dom";
import bishopImg from "../assets/bishopimg.jpg";

import curiaImg from "../assets/curia.jpg";

const API_URL =
  import.meta.env.VITE_API_URL || "https://tellicheri.onrender.com/api/import";

const UPLOAD_BASE = API_URL.replace("/api/import", "");
const SECTION_NAME = "Archeparchial Curia";
const ARCHBISHOP_PATH = "/archbishop/mar-joseph-pamplany";
const Curia = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
const [priests, setPriests] = useState([]);

useEffect(() => {
  fetchPriests();
}, []);

const fetchPriests = async () => {
  try {
    const res = await axios.get(`${API_URL}/priests`);
    if (res.data.success) {
      setPriests(res.data.data);
    }
  } catch (err) {
    console.error("Error fetching priests:", err);
  }
};

  useEffect(() => {
    fetchCuriaMembers();
  }, []);
const priestMap = React.useMemo(() => {
  const map = {};
  priests.forEach((p) => {
    if (p.id) {
      map[String(p.id)] = p; // 🔑 LEGACY ID MATCH
    }
  });
  return map;
}, [priests]);

  const fetchCuriaMembers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/administration`, {
        params: { section: SECTION_NAME },
      });

      if (res.data.success) {
        const ordered = res.data.data
          .filter((item) => item.section === SECTION_NAME)
          .sort(
            (a, b) =>
              Number(a.display_order || 0) -
              Number(b.display_order || 0)
          );

        setMembers(ordered);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error("Error fetching Curia members:", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };
const [archbishop, setArchbishop] = useState(null);

useEffect(() => {
  fetchArchbishop();
}, []);

const fetchArchbishop = async () => {
  try {
    const res = await axios.get(`${API_URL}/administration`, {
      params: { section: "Archeparchial Curia" },
    });

    if (res.data.success) {
      const arch = res.data.data.find(
        (item) =>
          item.section === "Archeparchial Curia" &&
          item.designation?.toUpperCase() === "ARCHBISHOP"
      );

      setArchbishop(arch || null);
    }
  } catch (error) {
    console.error("Error fetching archbishop:", error);
  }
};
const orderedMembers = members
  .filter(
    (m) =>
      m.category !== "ARCHBISHOP" && // ✅ exclude archbishop
      m.designation !== "ARCHBISHOP"
  )
  .sort((a, b) => {
    const orderA = Number(a.display_order || 999);
    const orderB = Number(b.display_order || 999);
    return orderA - orderB;
  });


  return (
    <Container fluid style={{ padding: "40px 60px" }}>
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <SideNavAdmin />
        </Col>

        {/* Content */}
        <Col md={9}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "30px",
              borderRadius: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                fontWeight: "bold",
                color: "#d92332",
                textTransform: "uppercase",
              }}
            >
              ARCHEPARCHIAL CURIA
            </h3>

            {/* Intro */}
            <Row className="my-4">
              <Col md={4}>
                <Image
                  src={curiaImg}
                  fluid
                  style={{ borderRadius: "8px", width: "100%" }}
                />
              </Col>
              <Col md={8}>
                <p style={{ textAlign: "justify", fontSize: "1.05rem", lineHeight: "1.9" }}>
                  <strong>The Archdiocese of Tellicherry</strong> is an ecclesiastical province of the Syro-Malabar
                   Church in Kerala, India. The Diocese of Tellicherry was erected on 31.12.1953 by the Papal Bull Ad 
                   Christi Ecclesiam Regendam of Pope Pius XII, against the backdrop of large-scale migration of
                   thousands of Syro-Malabar Catholics from South to the Northern forestlands of Kerala. Bishop Mar 
                   Sebastian Valloppilly was appointed as its first Apostolic Administrator. He took charge of the
                    diocese on 19.03.1954. Later he was elected as the first bishop of Tellicherry
                   on 16.10.1955 and ordained on 08.01.1956 at St. Peter’s Basilica by Cardinal Eugene Tisserant.
                </p>

              </Col>
            <Col md={12}>
            <p style={{ textAlign: "justify", fontSize: "1.05rem", lineHeight: "1.9" }}>
                 The diocese grew up fast and became a stronghold of Catholic Church in this region 
                 within a short period. The boundaries of the diocese were extended in 1955 to some 
                 districts in the states of Karnataka and Tamil Nadu, for the pastoral care of the
                  migrants settled there.The diocese was bifurcated in 1973 and the diocese of 
                  Mananthavady was erected on 01.03.1973. Again, the Diocese of Tellicherry was 
                  bifurcated twice, 0n 28.04.1986 to form the diocese of Thamarassery and on 24.04.1999 
                  to form the diocese of Balthangady. On 01-05-1989 Mar Sebastian Valloppilly retired 
                  and Mar George Valiamattam Was consecrated as his successor. The diocese was raised to
                   the stature of Metropolitan Archdiocese by the Papal Bull Spirituali Bono Christi
                    Fidelium of Pope John Paul II on 18.05.1995. The Archdiocese enjoyed the gracious 
                    leadership of Archbishop Mar George Valiamattam from 01.05.1989 to 30.10.2014.
                     On his retirement, Archbishop Mar George Njaralakatt was installed as the new
                      Archbishop of Tellicherry on 30.10.2014. He assumed office on the same day. 
                      Mar Joseph Pamplany was elected as the first auxiliary bishop of Tellicherry by
                       the Holy Synod of the Syro-Malabar Church and his Episcopal consecration was held 
                       on 08.11.2017 at St. Joseph’s Cathedral Church, Tellicherry. On the retirement of 
                       Mar George Njaralakatt on the 20th April 2022, Mar Joseph Pamplany was installed 
                       as the Archbishop of Tellicherry .
   
                </p>
                <div style={{ marginTop: "40px" }}>
  <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
    Contact Info
  </h5>

  <p style={{ fontSize: "1.05rem", marginBottom: "8px", textAlign: "left" }}>
    <i className="bi bi-geo-alt-fill" style={{ marginRight: "8px" }}></i>
    The Archbishop&apos;s House, P.B. No. 70, Tellicherry – 670101,
    Kerala, India.
  </p>

  <p style={{ fontSize: "1.05rem", marginBottom: "8px", textAlign: "left" }}>
    <i className="bi bi-telephone-fill" style={{ marginRight: "8px" }}></i>
    <a href="tel:+914902341058" style={{ textDecoration: "none", color: "#000" }}>
      +91 490 2341058 (R)
    </a>,{" "}
    <a href="tel:+914902344977" style={{ textDecoration: "none", color: "#000" }}>
      +91 490 2344977 (Personal)
    </a>,{" "}
    <a href="tel:+912342440" style={{ textDecoration: "none", color: "#000" }}>
      +91 2342440 (Curia)
    </a>
  </p>

  <p style={{ fontSize: "1.05rem", marginBottom: "8px", textAlign: "left" }}>
    <i className="bi bi-telephone" style={{ marginRight: "8px" }}></i>
    <a href="tel:+914902341412" style={{ textDecoration: "none", color: "#000" }}>
      +91 490 2341412
    </a>
  </p>

  <p style={{ fontSize: "1.05rem", marginBottom: "0", textAlign: "left" }}>
    <i className="bi bi-globe" style={{ marginRight: "8px" }}></i>
    <a
      href="https://www.archdioceseoftellicherry.org"
      target="_blank"
      rel="noreferrer"
      style={{ color: "#0073aa", textDecoration: "underline" }}
    >
      www.archdioceseoftellicherry.org
    </a>
  </p>
</div>

            </Col>
            </Row>


{/* Archbishop Card */}

{archbishop && (
  <div
    style={{
      backgroundColor: "#fff",
      padding: "20px",
      border: "3px double #ccc",
      borderRadius: "6px",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      marginTop: "30px",
      maxWidth: "520px",
    }}
  >
    <div className="d-flex flex-wrap align-items-start gap-3">

      {/* CLICKABLE IMAGE */}
      <Link to={ARCHBISHOP_PATH} style={{ textDecoration: "none" }}>
        <div
          style={{
            width: "120px",
            height: "150px",
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: "4px",
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          <Image
            src={bishopImg}
            alt={`${archbishop.category} ${archbishop.name}`}
            fluid
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </Link>

      {/* DETAILS */}
      <div style={{ flex: "1 1 250px" }}>
        
        {/* CLICKABLE NAME */}
        <Link
          to={ARCHBISHOP_PATH}
          style={{ textDecoration: "none" }}
        >
          <h6
            style={{
              fontWeight: "700",
              textTransform: "uppercase",
              marginBottom: "4px",
              color: "#8B0000",
              wordBreak: "break-word",
              cursor: "pointer",
            }}
          >
            {archbishop.category} {archbishop.name}
          </h6>
        </Link>

        <p
          style={{
            fontStyle: "italic",
            marginBottom: "10px",
            fontSize: "0.9rem",
          }}
        >
          {archbishop.designation}
        </p>

        {archbishop.phone && (
          <p style={{ fontSize: "0.85rem", marginBottom: "4px" }}>
            <i className="bi bi-telephone-fill me-2"></i>
            {archbishop.phone}
          </p>
        )}

        {archbishop.email && (
          <p style={{ fontSize: "0.85rem", marginBottom: "4px" }}>
            <i className="bi bi-envelope-fill me-2"></i>
            <a
              href={`mailto:${archbishop.email}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              {archbishop.email}
            </a>
          </p>
        )}

        {archbishop.address && (
          <p style={{ fontSize: "0.85rem", marginBottom: 0 }}>
            <i className="bi bi-geo-alt-fill me-2"></i>
            {archbishop.address}
          </p>
        )}
      </div>
    </div>
  </div>
)}


            {/* Curia Members (FROM ADMINISTRATION) */}
<Row xs={1} sm={2} md={4} className="g-4 mt-5">
  {orderedMembers.length > 0 ? (
    orderedMembers.map((m) => {
      // ✅ MATCH priest using head_id
      const priest = priestMap[String(m.head_id)];

      return (
        <Col key={m._id}>
          <div
            style={{
              border: "2px double #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* IMAGE */}
            <Image
              src={
                priest?.photo
                  ? `${UPLOAD_BASE}/uploads/preist/${priest.photo}`
                  : "/default-priest.png"
              }
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderBottom: "1px solid #ddd",
              }}
              fluid
            />

            {/* DETAILS */}
         {/* DETAILS */}
<div
  className="text-center d-flex flex-column justify-content-between"
  style={{
    padding: "12px",
    flexGrow: 1,
  }}
>
  {/* NAME */}
  <h6
    style={{
      fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
      fontWeight: "700",
      color: "#8B0000",
      textTransform: "uppercase",
      lineHeight: "1.3",
      marginBottom: "4px",
      wordBreak: "break-word",
    }}
  >
    {m.name_title} {m.name}
  </h6>

  {/* DESIGNATION */}
  <p
    style={{
      fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
      fontStyle: "italic",
      color: "#444",
      marginBottom: "8px",
      lineHeight: "1.2",
    }}
  >
    {m.designation || m.category}
  </p>

  {/* PROFILE LINK */}
  <div style={{ marginTop: "auto" }}>
    {priest ? (
      <Link
        to={`/priests/${priest.id}`}
        style={{
          fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
          color: "#d92332",
          fontWeight: "600",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        View Priest Profile
      </Link>
    ) : (
      <span
        style={{
          fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
          color: "#6c757d",
        }}
      >
        Profile not available
      </span>
    )}
  </div>
</div>

          </div>
        </Col>
      );
    })
  ) : (
    <p className="text-muted text-center">No Curia members found</p>
  )}
</Row>


          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Curia;
