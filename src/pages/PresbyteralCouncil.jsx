import React, { useState } from 'react';
import { Accordion, Table, Form, InputGroup } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';
import SideNavAdmin from '../components/SideNavAdmin';
import './PresbyteralCouncil.css'; // 👈 Import external CSS

const councilData = {
    "President": [
        {
            sl: 1,
            name: 'Archbishop Mar Joseph Pamplany',
            designation: 'Archbishop',
            address: '',
        },
    ],
    "Ex-Officio Member": [
        { sl: 1, name: 'Msgr MUTHUKUNNEL ANTONY', designation: 'Proto Syncellus', address: '' },
        { sl: 2, name: 'Msgr PALAKUZHY SEBASTIAN', designation: 'Syncellus', address: '' },
        { sl: 3, name: 'Msgr OTTAPLACKAL JOSEPH', designation: 'Syncellus', address: '' },
        { sl: 4, name: 'Msgr ELAMTHURUTHIPADAVIL MATHEW', designation: 'Syncellus', address: '' },
        { sl: 5, name: 'Fr. MUTTATHUKUNNEL JOSEPH', designation: 'Chancellor', address: '' },
        { sl: 6, name: 'Fr. KAKKARAMATTAHTHIL JOSEPH', designation: 'Finance Officer', address: '' },
        { sl: 7, name: 'Fr. KOVOORPUTHENPURAVIL JOHN', designation: 'Judicial Vicar', address: '' },
    ],
    "Elected Member - Age Group": [],
    "Elected Member from Forane": [
        {
            sl: 1,
            name: 'Fr THYKUNNUMPURAM GEORGE',
            designation: '',
            address: '',
            image: 'https://example.com/image1.jpg',
        },
        {
            sl: 2,
            name: 'Fr. ATTENGATTIL THOMAS',
            designation: '',
            address: '',
            image: 'https://example.com/image2.jpg',
        },
        // Add more members as needed
    ],
     " Nominated Member": [],
   

};

const PresbyteralCouncil = () => {
    const [search, setSearch] = useState('');
    const [activeKey, setActiveKey] = useState('0');

    const handleToggle = (key) => {
        setActiveKey(key === activeKey ? null : key);
    };

    const filteredData = (members) => {
        return members.filter(member =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.designation.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <div className="d-flex flex-wrap">
            <div className="sidebar-wrapper">
                <SideNavAdmin />
            </div>
            <div className="flex-grow-1 p-4 content-wrapper">
                <h3 className="text-danger fw-bold mb-3">PRESBYTERAL COUNCIL</h3>

                <Accordion activeKey={activeKey} flush alwaysOpen>
                    {Object.entries(councilData).map(([title, members], idx) => (
                        <Accordion.Item
                            eventKey={idx.toString()}
                            key={idx}
                            className={`accordion-item-custom ${activeKey === idx.toString() ? 'active-accordion' : ''}`}
                        >
                            <Accordion.Header onClick={() => handleToggle(idx.toString())}>
                                <FaUsers className="me-2" />
                                {title}
                            </Accordion.Header>
                            <Accordion.Body>
                                {title === "Ex-Officio Member" && (
                                    <InputGroup className="mb-3 w-50">
                                        <InputGroup.Text>Search:</InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Type name or designation"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </InputGroup>
                                )}
                                <Table striped bordered hover responsive className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>Sl No</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(title === "Ex-Officio Member" ? filteredData(members) : members).length > 0 ? (
                                            (title === "Ex-Officio Member" ? filteredData(members) : members).map((member, i) => (
                                                <tr key={i}>
                                                    <td>{member.sl}</td>
                                                    <td className="d-flex align-items-center gap-2">
                                                        {member.image && (
                                                            <img
                                                                src={member.image}
                                                                alt={member.name}
                                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                                                            />
                                                        )}
                                                        <div>{member.name}</div>
                                                    </td>

                                                    <td>{member.designation}</td>
                                                    <td>{member.address}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center text-muted">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default PresbyteralCouncil;
