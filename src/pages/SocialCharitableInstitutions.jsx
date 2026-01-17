import React from "react";
import buildingImage from "../assets/building.jpg";
import InstitutionSideNav from "../components/SideNavInstitution"; // adjust path if needed

const socialCharitableInstitutions = [
    {
        name: "Karunalayam",
        manager: "Fr. Sebastian C...",
        established: "",
        place: "Chemperi",
        management: ""
    },
    {
        name: "Pratheeksha De Addiction Centre",
        manager: "Fr. Kuriakose K...",
        established: "",
        place: "Ponniam",
        management: ""
    },
    {
        name: "Santhitheeram Institute Of Family And Mental ..",
        manager: "Fr. Sebastian C...",
        established: "",
        place: "Ponniam",
        management: ""
    },
    {
        name: "Savio Boys Town",
        manager: "Fr. Augustine P...",
        established: "",
        place: "Kunnot",
        management: ""
    }
];

const SocialCharitableInstitutions = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 mb-3">
                    <InstitutionSideNav />
                </div>

                {/* Main Content */}
                <div className="col-md-9" style={{ padding: "2rem" }}>
                    {/* Title */}
                    <h3 style={{ color: "#dc3545", fontWeight: "bold", marginBottom: "1.5rem" }}>
                        SOCIAL & CHARITABLE INSTITUTIONS
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
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {socialCharitableInstitutions.map((item, idx) => (
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
                                        <h6 className="card-title fw-bold">{item.name}</h6>
                                        <p className="mb-1">
                                            <i className="bi bi-person-fill text-danger me-2"></i>
                                            {item.manager}
                                        </p>
                                        <p className="mb-1">
                                            <i className="bi bi-calendar-event text-danger me-2"></i>
                                            {item.established}
                                        </p>
                                        <p className="mb-1">
                                            <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                                            {item.place}
                                        </p>
                                        <p className="mb-0">
                                            <i className="bi bi-bank text-danger me-2"></i>
                                            {item.management}
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

export default SocialCharitableInstitutions;
