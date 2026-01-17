// src/components/SideNavReligious.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideNav.css';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const SideNavReligious = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      className="side-nav-wrapper d-none d-md-flex flex-column gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link to="/congregations/men">
          <Button
            variant="outline-danger"
            className={`sidenav-btn ${pathname.includes('/congregations/men') ? 'active' : ''}`}
          >
            RELIGIOUS HOUSES FOR MEN
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/religious-women">
          <Button
            variant="outline-danger"
            className={`sidenav-btn ${pathname.includes('/religious-women') ? 'active' : ''}`}
          >
            RELIGIOUS HOUSES FOR WOMEN
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default SideNavReligious;
