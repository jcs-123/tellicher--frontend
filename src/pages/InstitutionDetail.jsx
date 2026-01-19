import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import SideNavInstitution from "../components/SideNavInstitution";
import buildingImage from "../assets/building.jpg";
import "./InstitutionDetail.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/import";

const InstitutionDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Detect source page
  const fromPage = location.state?.from || "institution";

  useEffect(() => {
    fetchInstitution();
  }, [id]);

  const fetchInstitution = async () => {
    try {
      const res = await axios.get(`${API_URL}/institutions/${id}`);
      if (res.data.success) {
        setInstitution(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching institution:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Dynamic back navigation
  const getBackLink = () => {
    if (fromPage === "charitable") return "/institution/social-charitable";
    if (fromPage === "educational") return "/institution/educational";
    return "/institution";
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" />
      </div>
    );
  }

  if (!institution) {
    return <div className="text-center py-5">Institution not found</div>;
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3">
          <SideNavInstitution />
        </div>

        {/* Content */}
        <div className="col-md-9">

          <h4 className="text-danger fw-bold mb-3">
            {institution.name}
          </h4>

          <div className="card shadow-sm p-4">
            <div className="row">

              {/* Image */}
              <div className="col-md-5 text-center mb-3 mb-md-0">
                <img
                  src={buildingImage}
                  alt={institution.name}
                  className="img-fluid shadow rounded"
                  style={{ maxHeight: 300 }}
                />
              </div>

              {/* Details */}
              <div className="col-md-7 institution-detail">
                <p><strong>Institution Type :</strong> {institution.web_institution_type_id || "—"}</p>
                <p><strong>Management :</strong> {institution.mgmnt_name || institution.mgmnt_type || "—"}</p>
                <p><strong>Contact Person :</strong> Fr. {institution.head || "—"}</p>
                <p><strong>Designation :</strong> {institution.hdesig || "—"}</p>
                <p><strong>Place :</strong> {institution.place || "—"}</p>
                <p><strong>Address :</strong> {institution.address || "—"}</p>
                <p>
                  <strong>Established Year :</strong>{" "}
                  {institution.estd ? institution.estd.toString().substring(0, 4) : "—"}
                </p>

                {/* ✅ BACK BUTTON */}
                <Link to={getBackLink()}>
                  <button className="btn btn-secondary btn-sm mt-3">
                    ← Back
                  </button>
                </Link>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstitutionDetail;
