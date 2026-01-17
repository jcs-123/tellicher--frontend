import React, { useState, useRef, useEffect } from 'react';
import { FaAngleLeft, FaAngleDown, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    'General Settings': false // Set General Settings to be open by default
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isVisible, setIsVisible] = useState(!isMobile);
  const dropdownRefs = useRef({});

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsVisible(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '🏠' },
    { name: 'Youtube Link Update', path: '/admin/youtube-link-update', icon: '📺' },
    {
      name: 'General Settings',
      icon: '🔧',
      hasSubmenu: true,
      children: [
        {
          name: 'Add Home Video',
          path: '/admin/general/home-video',
          icon: '🎬'
        },
        {
          name: 'Add Program Diary',
          path: '/admin/general/program-diary',
          icon: '📅'
        },
        {
          name: 'Add Website Links/Uploads',
          path: '/admin/general/website-links',
          icon: '🔗'
        },
        {
          name: 'News Management',
          icon: '📰',
          hasSubmenu: true,
          children: [
            { name: 'News List', path: '/admin/general/news/list', icon: '📋' },
            { name: 'Add News', path: '/admin/general/news/add', icon: '✏️' },
          ],
        },
        {
          name: 'Bulletin Management',
          icon: '📘',
          hasSubmenu: true,
          children: [
            { name: 'Bulletin List', path: '/admin/general/bulletin/list', icon: '📋' },
            { name: 'Add Bulletin', path: '/admin/general/bulletin/add', icon: '✏️' },
          ],
        },
        {
          name: 'Downloads Management',
          icon: '⬇️',
          hasSubmenu: true,
          children: [
            { name: 'Downloads List', path: '/admin/general/downloads/list', icon: '📋' },
            { name: 'Add Downloads', path: '/admin/general/downloads/add', icon: '✏️' },
          ],
        },
        {
          name: 'Circulars Management',
          icon: '📄',
          hasSubmenu: true,
          children: [
            { name: 'Circulars List', path: '/admin/general/circulars/list', icon: '📋' },
            { name: 'Add Circulars', path: '/admin/general/circulars/add', icon: '✏️' },
          ],
        },
        {
          name: 'Gallery Management',
          icon: '🖼️',
          hasSubmenu: true,
          children: [
            { name: 'Gallery Title List', path: '/admin/general/gallery/list', icon: '📋' },
            { name: 'Add Gallery Titles', path: '/admin/general/gallery/add', icon: '✏️' },
          ],
        },
        {
          name: 'User Management',
          icon: '👤',
          hasSubmenu: true,
          children: [
            { name: 'User List', path: '/admin/general/users/list', icon: '📋' },
            { name: 'Add User', path: '/admin/general/users/add', icon: '✏️' },
            { name: 'User Updates', path: '/admin/general/users/update', icon: '🔄' },
          ],
        },
      ],
    },
    {
      name: 'Statistics Management',
      icon: '📊',
      hasSubmenu: true,
      children: [
        { name: 'Add Statistics', path: '/admin/statistics/add', icon: '✏️' },
      ],
    },

    { name: 'Import Table', path: '/admin/tools/import', icon: '📥' },
    // In your sidebar navItems:
    { name: 'Data Viewer', path: '/admin/dataview', icon: '📊' }

  ];

  // Animation variants
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  const menuItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const subMenuVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.3
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isMobile && isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={isMobile ? (isVisible ? 'open' : 'closed') : 'open'}
        variants={sidebarVariants}
        style={{
          width: '230px',
          height: '100vh',
          backgroundColor: '#222d32',
          color: '#b8c7ce',
          position: 'fixed',
          top: 0,
          left: 0,
          overflowY: 'auto',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            padding: '15px',
            backgroundColor: '#1a2226',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          ADMIN <span style={{ color: '#b8c7ce' }}>ROOPATHA</span>
          {isMobile && (
            <FaTimes
              onClick={() => setIsVisible(false)}
              style={{ cursor: 'pointer', fontSize: '1rem' }}
            />
          )}
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <motion.li
            style={{ padding: '10px 15px', color: '#4b646f', fontSize: '12px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            MAIN NAVIGATION
          </motion.li>

          {navItems.map((item, index) => (
            <motion.li
              key={index}
              variants={menuItemVariants}
            >
              {item.hasSubmenu ? (
                <>
                  <motion.div
                    onClick={() => toggleMenu(item.name)}
                    style={{
                      cursor: 'pointer',
                      color: '#b8c7ce',
                      padding: '10px 15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    whileHover={{ backgroundColor: '#101314ff' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>{item.icon} {item.name}</span>
                    {openMenus[item.name] ? <FaAngleDown /> : <FaAngleLeft />}
                  </motion.div>

                  <AnimatePresence>
                    {openMenus[item.name] && item.children && (
                      <motion.ul
                        style={{ backgroundColor: 'rgba(45, 48, 49, 1)', padding: 0, overflow: 'hidden' }}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={subMenuVariants}
                      >
                        {item.children.map((child, idx) => (
                          <motion.li
                            key={idx}
                            variants={menuItemVariants}
                          >
                            {child.hasSubmenu ? (
                              <>
                                <motion.div
                                  onClick={() => toggleMenu(child.name)}
                                  style={{
                                    cursor: 'pointer',
                                    color: '#b8c7ce',
                                    padding: '8px 25px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '12px',
                                  }}
                                  whileHover={{ backgroundColor: '#34444a' }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <span>{child.icon || '📂'} {child.name}</span>
                                  {openMenus[child.name] ? <FaAngleDown /> : <FaAngleLeft />}
                                </motion.div>

                                <AnimatePresence>
                                  {openMenus[child.name] && (
                                    <motion.ul
                                      style={{ backgroundColor: '#34444a', padding: 0, overflow: 'hidden' }}
                                      initial="closed"
                                      animate="open"
                                      exit="closed"
                                      variants={subMenuVariants}
                                    >
                                      {child.children.map((subChild, subIdx) => (
                                        <motion.li
                                          key={subIdx}
                                          variants={menuItemVariants}
                                        >
                                          <Link
                                            to={subChild.path}
                                            style={{
                                              color: '#b8c7ce',
                                              display: 'block',
                                              padding: '8px 40px',
                                              textDecoration: 'none',
                                              fontSize: '12px',
                                            }}
                                          >
                                            {subChild.icon || '◉'} {subChild.name}
                                          </Link>
                                        </motion.li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              </>
                            ) : (
                              <Link
                                to={child.path}
                                style={{
                                  color: '#b8c7ce',
                                  display: 'block',
                                  padding: '8px 25px',
                                  textDecoration: 'none',
                                  fontSize: '12px',
                                }}
                              >
                                {child.icon || '◉'} {child.name}
                              </Link>
                            )}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={item.path}
                  style={{
                    color: '#b8c7ce',
                    padding: '10px 15px',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  {item.icon} {item.name}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {isMobile && !isVisible && (
        <motion.div
          onClick={() => setIsVisible(true)}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            backgroundColor: '#051016ff',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 1001,
            fontSize: '14px',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ☰ Menu
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;




// import React, { useState, useRef, useEffect } from 'react';
// import { FaAngleLeft, FaAngleDown, FaTimes } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [isVisible, setIsVisible] = useState(!isMobile);
//   const dropdownRefs = useRef({});

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       setIsVisible(!mobile);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleMenu = (name) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   const navItems = [
//     { name: 'Dashboard', path: '/admin/dashboard', icon: '🏠' },
//     { name: 'Youtube Link Update', path: '/admin/youtube-link-update', icon: '📺' },
//     {
//       name: 'General Settings',
//       icon: '🔧',
//       hasSubmenu: true,
//       children: [
//         { name: 'Add Home Video', path: '/admin/general/home-video' },
//         { name: 'Add Program Diary', path: '/admin/general/program-diary' },
//         { name: 'Add Website Links/Uploads', path: '/admin/general/website-links' },
//         {
//           name: 'News Management',
//           icon: '📰',
//           hasSubmenu: true,
//           children: [
//             { name: 'News List', path: '/admin/general/news/list' },
//             { name: 'Add News', path: '/admin/general/news/add' },
//           ],
//         },
//         {
//           name: 'Bulletin Management', path: '/admin/general/bulletin',
//           icon: '📘',
//           hasSubmenu: true,
//           children: [
//             { name: 'Bulletin List', path: '/admin/general/bulletin/list' },
//             { name: 'Add Bulletin', path: '/admin/general/bulletin/add' },
//           ],
//         },

//         {
//           name: 'Downloads Management', path: '/admin/general/downloads',
//           icon: '⬇️',
//           hasSubmenu: true,
//           children: [
//             { name: 'Downloads List', path: '/admin/general/downloads/list' },
//             { name: 'Add Downloads', path: '/admin/general/downloads/add' },
//           ],
//         },


//         {
//           name: 'Circulars Management', path: '/admin/general/circulars',
//           icon: '📄',
//           hasSubmenu: true,
//           children: [
//             { name: 'Circulars List', path: '/admin/general/circulars/list' },
//             { name: 'Add Circulars', path: '/admin/general/circulars/add' },
//           ],
//         },

//         {
//           name: 'Gallery Management',

//           path: '/admin/general/gallery',
//           icon: '🖼️', // ✅ Added icon for Gallery
//           hasSubmenu: true,
//           children: [
//             { name: 'Gallery Title List', path: '/admin/general/gallery/list' },
//             { name: 'Add Gallery Titles', path: '/admin/general/gallery/add' },
//           ],
//         },


//         { name: 'User Management',
//           icon: '👤',
//           path: '/admin/general/users',
//           hasSubmenu: true,
//           children: [
//             { name: 'User List', path: '/admin/general/users/list' },
//             { name: 'Add User', path: '/admin/general/users/add' },
//             { name: 'User Updates', path: '/admin/general/users/update' },
//           ],
//         },


//       ],
//     },
//     { name: 'Import Tables', path: '/admin/import-tables', icon: '📥' },
// //     {
// //       name: 'Administration Management',
// //       icon: '👨‍💼',
// //       hasSubmenu: true,
// //       children: [
// //         { name: 'Administration List', path: '/admin/administration/list' },
// //         { name: 'Administration Report', path: '/admin/administration/report' },
// //       ],
// //     },
// //     {
// //       name: 'Forane Management',
// //       icon: '🏢',
// //       hasSubmenu: true,
// //       children: [
// //         { name: 'Forane List', path: '/admin/forane/list' },
// //         { name: 'Forane Report', path: '/admin/forane/report' },
// //       ],
// //     },
// //     {
// //       name: 'Parish Management',
// //       icon: '⛪',
// //       hasSubmenu: true,
// //       children: [
// //         { name: 'Parish List', path: '/admin/parish/list' },
// //         { name: 'Parish Report', path: '/admin/parish/report' },
// //       ],
// //     },
// //     {
// //   name: 'Archdiocesan Priest',
// //   icon: '🧔',
// //   hasSubmenu: true,
// //   children: [
// //     {
// //       name: 'Status Management',
// //       icon: '📌',
// //       hasSubmenu: true,
// //       children: [
// //         { name: 'Main Status List', path: '/admin/priest/status/main' },
// //         { name: 'Secondary Status List', path: '/admin/priest/status/secondary' },
// //         { name: 'Secondary Sub Status List', path: '/admin/priest/status/secondary-sub' },
// //       ],
// //     },
// //     { name: 'Priest List', path: '/admin/priest/list' },
// //     { name: 'Priest Report', path: '/admin/priest/report' },
// //     { name: 'Priest History Report', path: '/admin/priest/history-report' },
// //   ],
// // },
// //     {
// //       name: 'Other Priest Working',
// //       icon: '👨‍⚖️',
// //       hasSubmenu: true,
// //       children: [
// //         { name: 'Priest List', path: '/admin/other-priest/list' },
// //         { name: 'Priest Report', path: '/admin/other-priest/report' },
// //       ],
// //     },
// //     {
// //       name: 'Archdiocesan Religious',
// //       icon: '👩‍🦰',
// //       hasSubmenu: true,
// //       children: [
// //         { name: 'Religious Priest', path: '/admin/religious/priest' },
// //         { name: 'Religious Brothers', path: '/admin/religious/brothers' },
// //         { name: 'Religious Sister', path: '/admin/religious/sisters' },
// //       ],
// //     },
// //     {
// //       name: 'Seminarian Management',
// //       icon: '🎓',
// //       hasSubmenu: true,
// //       children: [
// //         { name: 'Formation Year List', path: '/admin/seminarian/formation-year' },
// //         { name: 'Seminarian List', path: '/admin/seminarian/list' },
// //         { name: 'Seminarian Report', path: '/admin/seminarian/report' },
// //       ],
// //     },
//   ];

//   return (
//     <>
//       {isMobile && isVisible && (
//         <div
//           onClick={() => setIsVisible(false)}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             zIndex: 999,
//           }}
//         />
//       )}

//       <div
//         style={{
//           width: '230px',
//           height: '100vh',
//           backgroundColor: '#222d32',
//           color: '#b8c7ce',
//           position: 'fixed',
//           top: 0,
//           left: isMobile ? (isVisible ? '0' : '-230px') : '0',
//           overflowY: 'auto',
//           zIndex: 1000,
//           transition: 'left 0.3s ease-in-out',
//         }}
//       >
//         <div
//           style={{
//             padding: '15px',
//             backgroundColor: '#1a2226',
//             color: 'white',
//             fontSize: '18px',
//             fontWeight: 'bold',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           ADMIN <span style={{ color: '#b8c7ce' }}>ROOPATHA</span>
//           {isMobile && (
//             <FaTimes
//               onClick={() => setIsVisible(false)}
//               style={{ cursor: 'pointer', fontSize: '1rem' }}
//             />
//           )}
//         </div>

//         <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//           <li style={{ padding: '10px 15px', color: '#4b646f', fontSize: '12px' }}>
//             MAIN NAVIGATION
//           </li>

//           {navItems.map((item, index) => (
//             <li key={index}>
//               {item.hasSubmenu ? (
//                 <>
//                   <div
//                     onClick={() => toggleMenu(item.name)}
//                     style={{
//                       cursor: 'pointer',
//                       color: '#b8c7ce',
//                       padding: '10px 15px',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <span>{item.icon} {item.name}</span>
//                     {openMenus[item.name] ? <FaAngleDown /> : <FaAngleLeft />}
//                   </div>

//                   {openMenus[item.name] && item.children && (
//                     <ul style={{ backgroundColor: '#2c3b41', padding: 0 }}>
//                       {item.children.map((child, idx) => (
//                         <li key={idx}>
//                           {child.hasSubmenu ? (
//                             <>
//                               <div
//                                 onClick={() => toggleMenu(child.name)}
//                                 style={{
//                                   cursor: 'pointer',
//                                   color: '#b8c7ce',
//                                   padding: '8px 25px',
//                                   display: 'flex',
//                                   justifyContent: 'space-between',
//                                   alignItems: 'center',
//                                   fontSize: '12px',
//                                 }}
//                               >
//                                 <span>{child.icon || '📂'} {child.name}</span>
//                                 {openMenus[child.name] ? <FaAngleDown /> : <FaAngleLeft />}
//                               </div>

//                               {openMenus[child.name] && (
//                                 <ul style={{ backgroundColor: '#34444a', padding: 0 }}>
//                                   {child.children.map((subChild, subIdx) => (
//                                     <li key={subIdx}>
//                                       <Link
//                                         to={subChild.path}
//                                         style={{
//                                           color: '#b8c7ce',
//                                           display: 'block',
//                                           padding: '8px 40px',
//                                           textDecoration: 'none',
//                                           fontSize: '12px',
//                                         }}
//                                       >
//                                         ◉ {subChild.name}
//                                       </Link>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </>
//                           ) : (
//                             <Link
//                               to={child.path}
//                               style={{
//                                 color: '#b8c7ce',
//                                 display: 'block',
//                                 padding: '8px 25px',
//                                 textDecoration: 'none',
//                                 fontSize: '12px',
//                               }}
//                             >
//                               ◉ {child.name}
//                             </Link>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </>
//               ) : (
//                 <Link
//                   to={item.path}
//                   style={{
//                     color: '#b8c7ce',
//                     padding: '10px 15px',
//                     display: 'block',
//                     textDecoration: 'none',
//                   }}
//                 >
//                   {item.icon} {item.name}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {isMobile && !isVisible && (
//         <div
//           onClick={() => setIsVisible(true)}
//           style={{
//             position: 'fixed',
//             top: '10px',
//             left: '10px',
//             backgroundColor: '#3c8dbc',
//             color: 'white',
//             padding: '8px 12px',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             zIndex: 1001,
//             fontSize: '14px',
//           }}
//         >
//           ☰ Menu
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;
