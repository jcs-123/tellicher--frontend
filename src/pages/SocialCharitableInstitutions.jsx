import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InstitutionSideNav from "../components/SideNavInstitution";
import buildingImage from "../assets/building.jpg";
import {
    FaSearch,
    FaUser,
    FaMapMarkerAlt,
    FaUniversity
} from "react-icons/fa";
import "./EducationalInstitutions.css";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/import";

const SocialCharitableInstitutions = () => {
    const [institutions, setInstitutions] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchInstitutions();
    }, [search]);

    const fetchInstitutions = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${API_URL}/social-charitable-institutions`,
                { params: { search } }
            );

            if (res.data.success) {
                setInstitutions(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching institutions:", error);
        } finally {
            setLoading(false);
        }
    };

    const getManagementType = (inst) => {
        if (inst.mgmnt_name) return inst.mgmnt_name;
        if (inst.mgmnt_type) return inst.mgmnt_type;
        return "—";
    };

    return (
        <div className="container-fluid py-3">
            <div className="row">

                {/* Sidebar */}
                <div className="col-md-3 mb-3">
                    <InstitutionSideNav />
                </div>

                {/* Content */}
                <div className="col-md-9">

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <h4 className="section-title">
                            SOCIAL & CHARITABLE INSTITUTIONS
                        </h4>

                        <div className="d-flex">
                            <input
                                className="form-control"
                                placeholder="Search by Name / Place / Father"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ width: 260 }}
                            />
                            <button className="btn btn-danger ms-2">
                                <FaSearch />
                            </button>
                        </div>
                    </div>

                    {/* Loader */}
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-danger" />
                        </div>
                    ) : (
                        <div className="row g-4">

                            {institutions.length > 0 ? (
                                institutions.map((inst) => (
                                    <div
                                        className="col-sm-6 col-md-6 col-lg-4 col-xl-3"
                                        key={inst._id}
                                    >
                                        <div className="institution-card h-100">

                                            <img
                                                src={buildingImage}
                                                alt={inst.name}
                                                className="institution-img"
                                            />

                                            <div className="institution-body">

                                                {/* ✅ CLICKABLE NAME */}
                                                <h6 className="institution-name">
                                                    <Link
                                                        to={`/institutions/${inst._id}`}
                                                        state={{ from: "charitable" }}
                                                        className="text-decoration-none"
                                                    >
                                                        <h6 className="institution-name">{inst.name}</h6>
                                                    </Link>

                                                </h6>

                                                <div className="institution-row">
                                                    <FaUser className="icon" />
                                                    <span>Fr. {inst.head || "—"}</span>
                                                </div>

                                                <div className="institution-row">
                                                    <FaMapMarkerAlt className="icon" />
                                                    <span>{inst.place || "—"}</span>
                                                </div>

                                                <div className="institution-row">
                                                    <FaUniversity className="icon" />
                                                    <span>{getManagementType(inst)}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted py-5">
                                    No social & charitable institutions found
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocialCharitableInstitutions;
