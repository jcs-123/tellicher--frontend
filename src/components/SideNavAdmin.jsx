// src/components/SideNavAdmin.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SideNav.css';

const navItems = [
  { path: '/curia', label: 'CURIA' },
  { path: '/pastoral-council', label: 'PASTORAL COUNCIL' },
  { path: '/presbyteral-council', label: 'PRESBYTERAL COUNCIL' },
  { path: '/tribunals', label: 'ARCHEPARCHIAL TRIBUNALS' },
  { path: '/other-committees', label: 'OTHER COMMITTEES' }
];

const SideNavAdmin = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      className="side-nav-wrapper p-2"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className="d-flex flex-column">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="mb-2"
          >
            <Link to={item.path}>
              <Button
                variant={pathname === item.path ? 'danger' : 'outline-danger'}
                className="sidenav-btn w-100"
              >
                {item.label}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SideNavAdmin;
