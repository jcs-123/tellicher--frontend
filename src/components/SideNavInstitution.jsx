// src/components/SideNavInstitution.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './SideNav.css';

const SideNavInstitution = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      className="side-nav-wrapper d-none d-md-flex flex-column gap-2"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/institution/educational">
        <Button
          variant={pathname.includes('/institution/educational') ? 'danger' : 'outline-danger'}
          className="sidenav-btn"
        >
          EDUCATIONAL
        </Button>
      </Link>
      <Link to="/institution/social-charitable">
        <Button
          variant={pathname.includes('/institution/social-charitable') ? 'danger' : 'outline-danger'}
          className="sidenav-btn"
        >
          SOCIAL & CHARITABLE
        </Button>
      </Link>
    </motion.div>
  );
};

export default SideNavInstitution;
