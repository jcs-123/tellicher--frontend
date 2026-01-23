import React, { useEffect, useState } from "react";
import {
    Accordion,
    Table,
    Form,
    InputGroup,
    Spinner,
} from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNavAdmin from "../components/SideNavAdmin";
import "./PresbyteralCouncil.css";

const API_BASE = "https://tellicheri.onrender.com";

const PresbyteralCouncil = () => {
    const navigate = useNavigate();

    const [groupedData, setGroupedData] = useState({});
    const [priestPhotoMap, setPriestPhotoMap] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeKey, setActiveKey] = useState("0");

    /* =====================================================
       INIT
    ===================================================== */
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        setLoading(true);
        await Promise.all([fetchCouncil(), fetchPriests()]);
        setLoading(false);
    };

    /* =====================================================
       FETCH ADMINISTRATION
    ===================================================== */
    const fetchCouncil = async () => {
        try {
            const res = await axios.get(
                `${API_BASE}/api/import/administration`,
                { params: { section: "Presbyteral council" } }
            );

            if (!res.data.success) return;

            const grouped = {};

            res.data.data.forEach((item) => {
                const category = item.category || "Others";
                if (!grouped[category]) grouped[category] = [];
                grouped[category].push(item);
            });

            // sort by display_order
            Object.keys(grouped).forEach((key) => {
                grouped[key].sort(
                    (a, b) =>
                        Number(a.display_order || 0) -
                        Number(b.display_order || 0)
                );
            });

            setGroupedData(grouped);
        } catch (err) {
            console.error("❌ Error fetching council:", err);
        }
    };

    /* =====================================================
       FETCH ALL PRIESTS (NO POST)
    ===================================================== */
    const fetchPriests = async () => {
        try {
            const res = await axios.get(
                `${API_BASE}/api/import/priests`
            );

            if (!res.data.success) return;

            const map = {};
            res.data.data.forEach((p) => {
                // 🔑 MATCH KEY
                map[String(p.id)] = p.photo;
            });

            setPriestPhotoMap(map);
        } catch (err) {
            console.error("❌ Error fetching priests:", err);
        }
    };

    /* =====================================================
       SEARCH FILTER
    ===================================================== */
    const filterMembers = (list) => {
        if (!search) return list;
        return list.filter(
            (m) =>
                m.name?.toLowerCase().includes(search.toLowerCase()) ||
                m.designation?.toLowerCase().includes(search.toLowerCase())
        );
    };

    /* =====================================================
       UI
    ===================================================== */
    return (
        <div className="d-flex flex-wrap">
            <div className="sidebar-wrapper">
                <SideNavAdmin />
            </div>

            <div className="flex-grow-1 p-4 content-wrapper">
                <h3 className="text-danger fw-bold mb-3">
                    PRESBYTERAL COUNCIL
                </h3>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="danger" />
                    </div>
                ) : (
                    <Accordion activeKey={activeKey} flush>
                        {Object.entries(groupedData).map(
                            ([category, list], idx) => (
                                <Accordion.Item
                                    key={category}
                                    eventKey={idx.toString()}
                                >
                                    <Accordion.Header
                                        onClick={() =>
                                            setActiveKey(
                                                activeKey === idx.toString()
                                                    ? null
                                                    : idx.toString()
                                            )
                                        }
                                    >
                                        <FaUsers className="me-2" />
                                        {category}
                                    </Accordion.Header>

                                    <Accordion.Body>
                                        {idx === 0 && (
                                            <InputGroup className="mb-3 w-50">
                                                <InputGroup.Text>
                                                    Search
                                                </InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Name / Designation"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(e.target.value)
                                                    }
                                                />
                                            </InputGroup>
                                        )}

                                        <Table bordered hover responsive>
                                            <thead className="table-danger">
                                                <tr>
                                                    <th style={{ width: 80 }}>Sl No</th>
                                                    <th>Name</th>
                                                    <th>Designation</th>
                                                    <th>Address</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {filterMembers(list).length ? (
                                                    filterMembers(list).map((m) => (
                                                        <tr key={m._id}>
                                                            <td>{m.display_order}</td>

                                                            <td className="d-flex gap-3 align-items-center">
                                                                {Number(m.head_id) > 0 && (
                                                                    <img
                                                                        src={
                                                                            priestPhotoMap[String(m.head_id)]
                                                                                ? `${API_BASE}/uploads/preist/${priestPhotoMap[String(m.head_id)]}`
                                                                                : "/default-priest.png"
                                                                        }
                                                                        alt={m.name}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = "/default-priest.png";
                                                                        }}
                                                                        style={{
                                                                            width: 55,
                                                                            height: 55,
                                                                            objectFit: "cover",
                                                                            borderRadius: 6,
                                                                            border: "1px solid #ccc",
                                                                        }}
                                                                    />
                                                                )}

                                                                <span
                                                                    className="fw-semibold text-danger"
                                                                    style={{
                                                                        cursor: Number(m.head_id) > 0 ? "pointer" : "default",
                                                                    }}
                                                                    onClick={() => {
                                                                        if (Number(m.head_id) > 0) {
                                                                            navigate(`/priests/${m.head_id}`);
                                                                        }
                                                                    }}
                                                                >
                                                                    {m.name_title} {m.name}
                                                                </span>

                                                            </td>

                                                            <td>{m.designation || "—"}</td>
                                                            <td>{m.address || "—"}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan={4}
                                                            className="text-center text-muted"
                                                        >
                                                            No data available
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        )}
                    </Accordion>
                )}
            </div>
        </div>
    );
};

export default PresbyteralCouncil;
