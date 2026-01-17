// src/components/SideNav.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SideNav.css';

const SideNav = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      className="side-nav-wrapper p-3"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex flex-column gap-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/foranes">
            <Button
              variant="outline-danger"
              className={`sidenav-btn ${pathname === '/foranes' ? 'active' : ''}`}
            >
              FORANES
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/parishes">
            <Button
              variant="outline-danger"
              className={`sidenav-btn ${pathname === '/parishes' ? 'active' : ''}`}
            >
              PARISHES
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/filial-churches">
            <Button
              variant="outline-danger"
              className={`sidenav-btn ${pathname === '/filial-churches' ? 'active' : ''}`}
            >
              FILIAL CHURCHES
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SideNav;
