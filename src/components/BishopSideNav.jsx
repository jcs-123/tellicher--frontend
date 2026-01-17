// src/components/BishopSideNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BishopSideNav.css';

const BishopSideNav = () => {
  const location = useLocation();

  const links = [
    {
      to: '/archbishop/mar-joseph-pamplany',
      label: 'METROPOLITAN ARCHBISHOP',
      match: 'mar-joseph-pamplany',
    },
    {
      to: '/former-bishops/mar-george-njaralakatt',
      label: 'MAR GEORGE NJARALAKATT',
      match: 'njaralakatt',
    },
    {
      to: '/former-bishops/mar-george-valiamattam',
      label: 'MAR GEORGE VALIAMATTAM',
      match: 'valiamattam',
    },
    {
      to: '/former-bishops/mar-sebastian-valloppilly',
      label: 'MAR SEBASTIAN VALLOPPILLY',
      match: 'valloppilly',
    },
  ];

  return (
    <motion.div
      className="bishop-nav-wrapper d-flex flex-column gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {links.map((link, index) => (
        <motion.div
          key={link.to}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <Link
            to={link.to}
            className={`bishop-nav-button ${
              location.pathname.includes(link.match) ? 'active' : ''
            }`}
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BishopSideNav;
