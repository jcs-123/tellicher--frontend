import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const downloadLinks = [
  { label: 'ARCHDIOCESAN MONTHLY BULLETINS', path: '/downloads/bulletins' },
  { label: 'EVENT CALENDAR', path: '/downloads/calendar' },
  { label: 'NEWS', path: '/downloads/news' },
  { label: 'PHOTO GALLERY', path: '/downloads/photos' },
  { label: 'VIDEO GALLERY', path: '/downloads/videos' },
  { label: 'ARCHDIOCESAN WEBSITES', path: '/downloads/websites' },
  { label: 'OTHER ECCLESIASTICAL WEBSITES', path: '/downloads/others' },
];

const SideNavDownloads = () => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="d-none d-md-block">
      <motion.div
        className="side-nav-wrapper d-flex flex-column gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ padding: '20px' }}
      >
        {downloadLinks.map((item, index) => {
          const isActive = location.pathname === item.path;
          const isHovered = hoveredIndex === index;

          const baseStyle = {
            display: 'block',
            width: '240px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '600',
            backgroundColor: 'white',
            border: '2px solid #d72638',
            color: '#d72638',
            borderRadius: '8px',
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
            textTransform: 'uppercase',
          };

          const activeOrHoverStyle = isActive || isHovered
            ? {
                backgroundColor: '#d72638',
                color: 'white',
                borderColor: '#d72638',
              }
            : {};

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                style={{ ...baseStyle, ...activeOrHoverStyle }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SideNavDownloads;
