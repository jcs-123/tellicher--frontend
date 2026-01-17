// src/components/SideNavPriests.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideNav.css';
import { motion } from 'framer-motion';

const SideNavPriests = () => {
  const location = useLocation();

  return (
    <motion.div
      className="side-nav-wrapper"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="d-flex flex-column gap-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/archbishop/mar-joseph-pamplany"
            className={`bishop-nav-button ${location.pathname.includes('mar-joseph-pamplany') ? 'active' : ''}`}
          >
            METROPOLITAN ARCHBISHOP
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/archdiocesan-priests"
            className={`sidenav-btn ${location.pathname === '/archdiocesan-priests' ? 'active' : ''}`}
          >
            ARCHDIOCESAN PRIESTS
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/obituary"
            className={`sidenav-btn ${location.pathname === '/obituary' ? 'active' : ''}`}
          >
            OBITUARY
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SideNavPriests;
