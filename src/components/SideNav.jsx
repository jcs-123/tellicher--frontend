// src/components/SideNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './SideNav.css';

const navItems = [
  { path: '/our-patron', label: 'OUR PATRON' },
  { path: '/history', label: 'HISTORY' },
  { path: '/statistics', label: 'STATISTICS' },
  { path: '/landmark', label: 'LANDMARK' }
];

const SideNav = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      className="side-nav-wrapper d-none d-md-flex flex-column gap-2"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {navItems.map((item, index) => (
        <motion.div
          key={item.path}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <Link to={item.path}>
            <Button
              variant="outline-danger"
              className={`sidenav-btn ${pathname.includes(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </Button>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SideNav;
