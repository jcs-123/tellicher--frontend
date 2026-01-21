import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import {
    FaChurch, FaUsers, FaBuilding, FaUserTie,
    FaUserNurse, FaBars
} from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResetPasswordModal from './ResetPasswordModal';

function AdminDashboard() {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activities, setActivities] = useState([]);
    const [showResetModal, setShowResetModal] = useState(false); // Add in useState section
    const navigate = useNavigate();

    const cards = [
        { title: 'Foranes', count: 19, icon: <FaChurch />, color: 'green' },
        { title: 'Parishes / Filial Church', count: '183 / 1', icon: <FaChurch />, color: '#00c0ef' },
        { title: 'Associations', count: 64, icon: <FaUsers />, color: 'orange' },
        { title: 'Congregations', count: 99, icon: <FaUsers />, color: '#dd4b39' },
        { title: 'Institutions', count: 29, icon: <FaBuilding />, color: '#f39c12' },
        { title: 'Priests', count: 378, icon: <FaUserTie />, color: '#d9534f' },
        { title: 'Seminarians', count: 0, icon: <BsPerson />, color: '#0a62bbff' },
        { title: 'Sisters', count: 0, icon: <FaUserNurse />, color: '#00c0ef' },
    ];

    const handleLogout = async () => {
        try {
            const username = localStorage.getItem('username');
            if (username) {
                await axios.post('http://localhost:5000/api/auth/logout', { username });
            }
        } catch (err) {
            console.error('Logout log failed:', err);
        }

        localStorage.clear();
        window.location.href = '/admin/login';
    };

    const handleResetPassword = () => {
        setShowResetModal(true); // instead of window.location.href
    };

    const handleActivityClick = () => {
        navigate('/admin/general/users/update');
    };

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/logs', {
                    params: { limit: 4 }
                });
                setActivities(res.data);
            } catch (err) {
                console.error('Failed to load logs', err);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', fontSize: '0.8rem' }}>
            {showSidebar && (
                <div style={{ width: '230px', background: '#343a40', color: 'white' }}>
                    <Sidebar />
                </div>
            )}

            <div style={{ flex: 1, background: '#f4f6f9', display: 'flex', flexDirection: 'column' }}>
                {/* Navbar */}
                <div style={{
                    background: '#3c8dbc',
                    color: '#fff',
                    padding: '8px 15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <FaBars style={{ marginRight: '8px' }} />
                        Menu
                    </div>

                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <div
                            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem' }}
                            onClick={() => setShowDropdown(prev => !prev)}
                        >
                            <img
                                src="https://www.archdioceseoftellicherry.org/assets/dist/img/avatar5.png"
                                alt="avatar"
                                style={{
                                    borderRadius: '50%',
                                    height: '25px',
                                    width: '25px',
                                    marginRight: '6px'
                                }}
                            />
                            <span>Jyothi</span>
                        </div>

                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: '35px',
                                backgroundColor: '#3c8dbc',
                                minWidth: '200px',
                                borderRadius: '5px',
                                zIndex: 1,
                                textAlign: 'center',
                                padding: '10px 10px',
                                color: 'white',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                fontSize: '0.8rem'
                            }}>
                                <img
                                    src="https://www.archdioceseoftellicherry.org/assets/dist/img/avatar5.png"
                                    alt="Profile"
                                    style={{
                                        borderRadius: '50%',
                                        width: '50px',
                                        height: '50px',
                                        marginBottom: '8px'
                                    }}
                                />
                                <p style={{ margin: 0, fontWeight: 'bold' }}>Jyothi - Administrator</p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    marginTop: '10px',
                                    borderTop: '1px solid #fff',
                                    paddingTop: '8px'
                                }}>
                                    <button
                                        onClick={handleResetPassword}
                                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                                    >
                                        Change Password
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ flex: 1, padding: '15px', overflowY: 'auto' }}>
                    {/* Cards */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        {cards.map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    flex: '1 1 calc(25% - 15px)',
                                    backgroundColor: item.color,
                                    borderRadius: '5px',
                                    minHeight: '120px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'black', fontWeight: 'bold' }}>{item.count}</h3>
                                        <p style={{ margin: 0, fontWeight: 'bold' }}>{item.title}</p>
                                    </div>
                                    <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                                </div>
                                <div style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center',
                                    padding: '5px 0',
                                    fontSize: '0.75rem'
                                }}>
                                    <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                                        More info <i className="fa fa-arrow-circle-right" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div style={{
                        marginTop: '30px',
                        background: '#fff',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                        fontSize: '0.75rem'
                    }}>
                        <div style={{
                            background: '#3c8dbc',
                            color: 'white',
                            padding: '8px 12px',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span>Recent Activity (Last 4)</span>
                            <button
                                onClick={handleActivityClick}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid white',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    fontSize: '0.7rem'
                                }}
                            >
                                View All
                            </button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f0f0f0' }}>
                                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Sl.No</th>
                                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>User</th>
                                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Activity</th>
                                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Operation</th>
                                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Updated date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activities.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>No activity found</td>
                                        </tr>
                                    ) : (
                                        activities.slice(0, 4).map((log, idx) => (
                                            <tr key={log._id}>
                                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{idx + 1}</td>
                                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.username}</td>
                                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.activity}</td>
                                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.operation}</td>
                                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{new Date(log.createdAt).toLocaleString('en-GB')}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer style={{
                    backgroundColor: '#f9f9f9',
                    borderTop: '1px solid #ddd',
                    padding: '10px 20px',
                    fontSize: '13px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#333'
                }}>
                    <div>
                        <strong>Copyright © 2025</strong>{' '}
                        <a href="#" style={{ color: '#3c8dbc', textDecoration: 'none' }}>
                            Archdiocese of Tellichery
                        </a>. All rights reserved.
                    </div>
                    <div style={{ fontSize: '12px' }}>
                        Developed By{' '}
                        <a href="mailto:tbi@jecc" style={{ color: '#3c8dbc', textDecoration: 'none' }}>
                            tbi@jecc Jyothi Engineering College
                        </a>
                    </div>
                </footer>
                {showResetModal && (
                    <ResetPasswordModal onClose={() => setShowResetModal(false)} />
                )}

            </div>
        </div>
    );
}

export default AdminDashboard;
