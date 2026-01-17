import React, { useState } from 'react';
import { Table, Form, InputGroup } from 'react-bootstrap';
import SideNavAdmin from '../components/SideNavAdmin';
import './ArcheparchialTribunal.css';

const tribunalData = [
  { sl: 1, name: 'FR. KOLAKKUNNEL KURIAKOSE', designation: 'Judge' },
  { sl: 2, name: 'FR. THENGUMPALLIL THOMAS', designation: 'Judge' },
  { sl: 3, name: 'FR. VARANATH JOSEPH', designation: 'Judge' },
  { sl: 4, name: 'FR. VETTICKAL JOSE', designation: 'Judicial Vicar' },
  { sl: 5, name: 'FR. MAPPILAPARAMBIL (JR) THOMAS', designation: 'Judge' },
  { sl: 6, name: 'FR. MUTTATHUKUNNEL JOSEPH', designation: 'Judge' },
  { sl: 7, name: 'FR. JOHN KOCHUPARA CST', designation: 'Judge' },
  { sl: 8, name: 'SR. JESSY KAROTTU FCC', designation: 'Defender of The Bond' },
  { sl: 9, name: 'SR. JOSNA LUKOSE SH', designation: 'Notary' },
];

const ArcheparchialTribunal = () => {
  const [search, setSearch] = useState('');

  const filteredData = tribunalData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex tribunal-wrapper">
      <div className="sidebar-wrapper">
        <SideNavAdmin />
      </div>
      <div className="content-wrapper p-4">
        <h3 className="text-danger fw-bold mb-4">ARCHEPARCHIAL TRIBUNAL</h3>

        <InputGroup className="mb-3 w-50">
          <InputGroup.Text>Search:</InputGroup.Text>
          <Form.Control
            placeholder="Search by name or designation"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <Table striped bordered hover responsive className="tribunal-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Designation</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.sl}</td>
                  <td>{row.name}</td>
                  <td>{row.designation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="text-muted small">
          Showing 1 to {filteredData.length} of {tribunalData.length} entries
        </div>
      </div>
    </div>
  );
};

export default ArcheparchialTribunal;
