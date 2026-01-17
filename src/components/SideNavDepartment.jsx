// src/components/SideNavDepartments.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './SideNav.css';

const departments = [
  { path: '/catechism', label: 'Catechism Department' },
  { path: '/holy-childhood', label: 'Holy Childhood' },
  { path: '/cherupushpa', label: 'Cherupushpa Mission League' },
  { path: '/kcym', label: 'KCYM' },
  { path: '/akcc', label: 'AKCC' },
  { path: '/kcbc', label: 'KCBC Madya Virudha Samidhi' },
  { path: '/mukthisree', label: 'Mukthisree' },
  { path: '/adsu', label: 'ADSU' },
  { path: '/infam', label: 'INFAM' },
  { path: '/vincent-de-paul', label: 'St. Vincent De Paul Society' },
  { path: '/sfo', label: 'Secular Franciscan Order' },
  { path: '/family-apostolate', label: 'Family Apostolate' },
  { path: '/family-units', label: 'Family Units' },
  { path: '/internet-mission', label: 'Internet Mission' },
  { path: '/bible-apostolate', label: 'Bible Apostolate' },
  { path: '/media-apostolate', label: 'Media Apostolate' },
  { path: '/sanjose-academy', label: 'Sanjose Academy' },
  { path: '/tsss', label: 'TSSS' },
  { path: '/adam', label: 'ADAM' },
  { path: '/alpha-institute', label: 'Alpha Institute' },
  { path: '/aifel', label: 'AIFEL' },
  { path: '/trac', label: 'TRAC' },
  { path: '/catholic-teachers-guild', label: 'Catholic Teachers Guild' },
  { path: '/charismatic-movement', label: 'Charismatic Movement' },
];

const SideNavDepartments = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      className="side-nav-wrapper d-none d-md-flex flex-column gap-2"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {departments.map((dept, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link to={dept.path}>
            <Button
              variant="outline-danger"
              className={`sidenav-btn ${pathname === dept.path ? 'active' : ''}`}
            >
              {dept.label}
            </Button>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SideNavDepartments;
