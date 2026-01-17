import React from "react";
import SideNavReligious from "../components/SideNavReligious";
import { FaSearch } from "react-icons/fa";

const ReligiousHousesMen = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 mb-3">
                    <SideNavReligious />
                </div>

                {/* Main Content */}
          <div className="col-md-9" style={{ marginBottom: "19rem" }}>

                    <h4 className="text-danger fw-bold mb-4 p-3">RELIGIOUS HOUSES FOR MEN</h4>

                    {/* Search */}
                    <div className="mb-4" style={{ backgroundColor: "#8b2c3f", padding: "10px" }}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control border-0"
                                placeholder="Search Congregation by name"
                                style={{ backgroundColor: "#fff" }}
                            />
                            <button className="btn btn-light">
                                <FaSearch />
                            </button>
                        </div>
                    </div>

                    {/* Table Headings */}
                    <div className="row fw-bold border-bottom pb-2 mb-2">
                        <div className="col-md-4">Congregation Name</div>
                        <div className="col-md-4">Head & Address</div>
                        <div className="col-md-4">Province Details</div>
                    </div>

                    {/* Sample data row (empty for now) */}
                    {/* Map over fetched data here */}
                </div>
            </div>
        </div>
    );
};

export default ReligiousHousesMen;
