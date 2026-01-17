import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';
import './OtherCommittees.css';
import SideNavAdmin from '../components/SideNavAdmin';

const committeeData = [
  "Safe Environment Committee",
  "Construction Committee",
  "College of Eparchial Consultors",
  "Finance Council",
  "Censor of Books",
  "Public Relations Committee",
  "Other Administrative office"
];

const OtherCommittees = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(prev => (prev === key ? null : key));
  };

  return (
    <div className="committees-wrapper">
      <div className="sidebar-wrapper">
        <SideNavAdmin />
      </div>

      <div className="content-wrapper">
        <h4 className="text-danger fw-bold mb-4">OTHER COMMITTEES</h4>
        <Accordion activeKey={activeKey} alwaysOpen>
          {committeeData.map((title, idx) => {
            const key = idx.toString();
            return (
              <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header
                  onClick={() => handleToggle(key)}
                  className={activeKey === key ? 'active-header' : ''}
                >
                  <FaUsers className="me-2" />
                  {title}
                </Accordion.Header>
                <Accordion.Body>
                  Details about {title} will be displayed here.
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default OtherCommittees;
