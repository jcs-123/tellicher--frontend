import React from "react";
import buildingImage from "../assets/building.jpg"; // use consistent image
import SideNavInstitution from "../components/SideNavInstitution";
import { FaSearch, FaUser, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";

const institutions = [
    {
        name: "Vimal Jyothi Engineering College",
        principal: "Fr. James Chell...",
        location: "Chemperi",
        type: "Diocese"
    },
    {
        name: "Nirmalagiri College",
        principal: "Fr. Thomas Koch...",
        location: "Nirmalagiri",
        type: "Diocese"
    },
    {
        name: "Sanjose Metropolitan Senior Secondary Sc..",
        principal: "Fr. Joseph Kakk...",
        location: "Thalassery",
        type: "Diocese"
    },
    {
        name: "Malanadu Teacher Training Institute",
        principal: "Fr. Paul Edathi...",
        location: "Thaliparamba",
        type: "Diocese"
    }
];

const EducationalInstitutions = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 mb-3">
                    <SideNavInstitution />
                </div>

                {/* Main Content */}
                <div className="col-md-9" style={{ padding: "2rem" }}>
                    {/* Title */}
                    <h3 style={{ color: "#dc3545", fontWeight: "bold", marginBottom: "1.5rem" }}>
                        EDUCATIONAL INSTITUTIONS
                    </h3>

                    {/* Filters + Search */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "1.5rem"
                        }}
                    >
                        {/* Filter Buttons */}
                        <div className="btn-group">
                            <button className="btn btn-danger text-white">◉ Name</button>
                            <button className="btn btn-danger text-white">◉ Place</button>
                            <button className="btn btn-danger text-white">◉ Management</button>
                        </div>

                        {/* Search */}
                        <div style={{ display: "flex" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Institution by Institution Name"
                                style={{ maxWidth: "300px" }}
                            />
                            <button className="btn btn-danger">
                                <FaSearch />
                            </button>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {institutions.map((inst, idx) => (
                            <div className="col d-flex" key={idx}>
                                <div
                                    className="card shadow-sm h-100"
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <img src={buildingImage} className="card-img-top" alt="institution" />
                                    <div className="card-body" style={{ padding: "1rem" }}>
                                        <h6 className="card-title fw-bold">{inst.name}</h6>
                                        <p className="mb-1">
                                            <FaUser className="text-danger me-2" />
                                            {inst.principal}
                                        </p>
                                        <p className="mb-1">
                                            <FaMapMarkerAlt className="text-danger me-2" />
                                            {inst.location}
                                        </p>
                                        <p className="mb-0">
                                            <FaUniversity className="text-danger me-2" />
                                            {inst.type}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EducationalInstitutions;
