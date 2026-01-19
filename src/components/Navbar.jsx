import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const NavbarComponent = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Top Header Section */}
      <div style={{ position: 'fixed', top: '0', right: '0', left: '0', zIndex: '1050', backgroundColor: 'white' }}>
        <div className="d-flex justify-content-between align-items-center px-4 py-2">

          <Link to="/" onClick={() => setExpanded(false)}>
            <img src={logo} alt="Logo" height="85" className="me-3" />
          </Link>

          <div className="d-flex align-items-center">
            <Link to="/vianney-fund" style={{ textDecoration: 'none' }}>
              <Button
                className="me-3 responsive-animated-button"
                style={{
                  backgroundColor: '#0069d9',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: 'clamp(14px, 1.6vw, 16px)',
                  letterSpacing: '0.5px',
                  border: 'none',
                  padding: 'clamp(8px, 1.5vw, 10px) clamp(16px, 2.5vw, 20px)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transform: 'scale(1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#0056b3';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#0069d9';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
              >
                Vianney Fund
              </Button>
            </Link>

            <Form className="d-flex align-items-center">
              <FormControl type="search" placeholder="Search" className="me-2" />
              <Button variant="outline-dark">🔍</Button>
            </Form>
          </div>
        </div>

        {/* Navbar Menu */}
        <Navbar
          expand="lg"
          bg="white"
          className="main-navbar"
          expanded={expanded}
        >

          <Container fluid className="px-4">
            <Navbar.Toggle
              aria-controls="main-navbar-nav"
              onClick={() => setExpanded(prev => !prev)}
            />
            <Navbar.Collapse id="main-navbar-nav" className="pt-0 mt-0">
              <Nav className="nav-buttons text-uppercase fw-semibold d-flex flex-wrap justify-content-end">

                {/* ARCHDIOCESE Dropdown */}
                <div className="nav-box nav-dropdown-custom">
                  <span className="dropdown-title">ARCHDIOCESE <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-item-with-submenu">
                      <Link to="/our-patron" className="submenu-link" onClick={() => setExpanded(false)}>Our Patron</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/history" className="submenu-link" onClick={() => setExpanded(false)}>History</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/statistics" className="submenu-link" onClick={() => setExpanded(false)}>Statistics</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/landmark" className="submenu-link" onClick={() => setExpanded(false)}>Landmark</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <span className="submenu-title">Suffragan Eparchies ▸</span>
                      <div className="submenu">
                        <a href="https://mananthavadydiocese.com/" target="_blank" rel="noreferrer" className="submenu-link" onClick={() => setExpanded(false)}>Mananthavady</a>
                        <a href="https://www.diocesesoft.com/thamarassery" target="_blank" rel="noreferrer" className="submenu-link" onClick={() => setExpanded(false)}>Thamarassery</a>
                        <a href="https://www.belthangadydiocese.com" target="_blank" rel="noreferrer" className="submenu-link" onClick={() => setExpanded(false)}>Belthangady</a>
                        <a href="https://www.bhadravathidiocese.org/" target="_blank" rel="noreferrer" className="submenu-link" onClick={() => setExpanded(false)}>Bhadravathi</a>
                        <a href="https://www.mandyadiocese.org/" target="_blank" rel="noreferrer" className="submenu-link" onClick={() => setExpanded(false)}>Mandya</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BISHOPS Dropdown */}
                <div className="nav-box nav-dropdown-custom">
                  <span className="dropdown-title">BISHOPS <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-item-with-submenu">
                      <span className="submenu-title">Archbishop ▸</span>
                      <div className="submenu">
                        <Link to="/archbishop/mar-joseph-pamplany" className="submenu-link" onClick={() => setExpanded(false)}>Mar Joseph Pamplany</Link>
                      </div>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <span className="submenu-title">Former Bishops ▸</span>
                      <div className="submenu">
                        <Link to="/former-bishops/mar-george-njaralakatt" className="submenu-link" onClick={() => setExpanded(false)}>Mar George Njaralakatt</Link>
                        <Link to="/former-bishops/mar-george-valiamattam" className="submenu-link" onClick={() => setExpanded(false)}>Mar George Valiamattam</Link>
                        <Link to="/former-bishops/mar-sebastian-valloppilly" className="submenu-link" onClick={() => setExpanded(false)}>Mar Sebastian Valloppilly</Link>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Other Links */}
                {/* ADMINISTRATION Dropdown */}
                <div className="nav-box nav-dropdown-custom">
                  <span className="dropdown-title">ADMINISTRATION <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-item-with-submenu">
                      <Link to="/curia" className="submenu-link" onClick={() => setExpanded(false)}>Curia</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/pastoral-council" className="submenu-link" onClick={() => setExpanded(false)}>Pastoral Council</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/presbyteral-council" className="submenu-link" onClick={() => setExpanded(false)}>Presbyteral Council</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/tribunals" className="submenu-link" onClick={() => setExpanded(false)}>Archeparchial Tribunals</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/other-committees" className="submenu-link" onClick={() => setExpanded(false)}>Other Committees</Link>
                    </div>
                  </div>
                </div>

                {/* PARISHES Dropdown */}
                <div className="nav-box nav-dropdown-custom">
                  <span className="dropdown-title">PARISHES <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-item-with-submenu">
                      <Link to="/foranes" className="submenu-link" onClick={() => setExpanded(false)}>Foranes</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/parishes" className="submenu-link" onClick={() => setExpanded(false)}>Parishes</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/filial-churches" className="submenu-link" onClick={() => setExpanded(false)}>Filial Churches</Link>
                    </div>
                  </div>
                </div>

                {/* PRIESTS Dropdown */}
                <div className="nav-box nav-dropdown-custom">
                  <span className="dropdown-title">PRIESTS <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-item-with-submenu">
                      <Link to="/archdiocesan-priests" className="submenu-link" onClick={() => setExpanded(false)}>Archdiocesan</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/obituary" className="submenu-link" onClick={() => setExpanded(false)}>Obituary</Link>
                    </div>
                  </div>
                </div>

                {/* DEPARTMENT Dropdown with Scrolling */}
                <div className="nav-box nav-dropdown-custom">
                  <span className="dropdown-title">DEPARTMENT <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    <div className="dropdown-item-with-submenu"><Link to="/catechism" className="submenu-link" onClick={() => setExpanded(false)}>Catechism Department</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/holy-childhood" className="submenu-link" onClick={() => setExpanded(false)}>Holy Childhood</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/cherupushpa" className="submenu-link" onClick={() => setExpanded(false)}>Cherupushpa Mission League</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/kcym" className="submenu-link" onClick={() => setExpanded(false)}>KCYM</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/akcc" className="submenu-link" onClick={() => setExpanded(false)}>AKCC</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/kcbc" className="submenu-link" onClick={() => setExpanded(false)}>KCBC Madya Virudha Samidhi</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/mukthisree" className="submenu-link" onClick={() => setExpanded(false)}>Mukthisree</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/adsu" className="submenu-link" onClick={() => setExpanded(false)}>ADSU</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/infam" className="submenu-link" onClick={() => setExpanded(false)}>INFAM</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/vincent-de-paul" className="submenu-link" onClick={() => setExpanded(false)}>St. Vincent De Paul Society</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/sfo" className="submenu-link" onClick={() => setExpanded(false)}>Secular Franciscan Order</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/family-apostolate" className="submenu-link" onClick={() => setExpanded(false)}>Family Apostolate</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/family-units" className="submenu-link" onClick={() => setExpanded(false)}>Family Units</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/internet-mission" className="submenu-link" onClick={() => setExpanded(false)}>Internet Mission</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/bible-apostolate" className="submenu-link" onClick={() => setExpanded(false)}>Bible Apostolate</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/media-apostolate" className="submenu-link" onClick={() => setExpanded(false)}>Media Apostolate</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/sanjose-academy" className="submenu-link" onClick={() => setExpanded(false)}>Sanjose Academy</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/tsss" className="submenu-link" onClick={() => setExpanded(false)}>TSSS</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/adam" className="submenu-link" onClick={() => setExpanded(false)}>ADAM</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/alpha-institute" className="submenu-link" onClick={() => setExpanded(false)}>Alpha Institute</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/aifel" className="submenu-link" onClick={() => setExpanded(false)}>AIFEL</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/trac" className="submenu-link" onClick={() => setExpanded(false)}>TRAC</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/catholic-teachers-guild" className="submenu-link" onClick={() => setExpanded(false)}>Catholic Teachers Guild</Link></div>
                    <div className="dropdown-item-with-submenu"><Link to="/charismatic-movement" className="submenu-link" onClick={() => setExpanded(false)}>Charismatic Movement</Link></div>
                  </div>
                </div>

                {/* INSTITUTION Dropdown */}
                <div className="nav-box nav-dropdown-custom">
                  <span className="dropdown-title">INSTITUTION <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-item-with-submenu">
                      <Link to="/institution/educational" className="submenu-link" onClick={() => setExpanded(false)}>Educational</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/institution/social-charitable" className="submenu-link" onClick={() => setExpanded(false)}>Social & Charitable</Link>
                    </div>
                  </div>
                </div>

                {/* CONGREGATIONS Dropdown */}
                {/* <div className="nav-box nav-dropdown-custom">
                  <span className="dropdown-title">CONGREGATIONS <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-item-with-submenu">
                      <Link to="/congregations/men" className="submenu-link" onClick={() => setExpanded(false)}>For Men</Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/religious-women" className="submenu-link" onClick={() => setExpanded(false)}>For Women</Link>
                    </div>
                  </div>
                </div> */}
                <div className="nav-box nav-dropdown-custom downloads-dropdown">
                  <span className="dropdown-title">DOWNLOADS <span className="red-dot">●</span></span>
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-item-with-submenu">
                      <Link to="/downloads" className="submenu-link" onClick={() => setExpanded(false)}>
                        Downloads
                      </Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/downloads/bulletins" className="submenu-link" onClick={() => setExpanded(false)}>
                        Archdiocesan Monthly Bulletins
                      </Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/downloads/calendar" className="submenu-link" onClick={() => setExpanded(false)}>
                        Event Calendar
                      </Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/downloads/news" className="submenu-link" onClick={() => setExpanded(false)}>
                        News
                      </Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/downloads/photos" className="submenu-link" onClick={() => setExpanded(false)}>
                        Photo Gallery
                      </Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/downloads/videos" className="submenu-link" onClick={() => setExpanded(false)}>
                        Video Gallery
                      </Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/downloads/websites" className="submenu-link" onClick={() => setExpanded(false)}>
                        Archdiocesan Websites
                      </Link>
                    </div>
                    <div className="dropdown-item-with-submenu">
                      <Link to="/downloads/others" className="submenu-link" onClick={() => setExpanded(false)}>
                        Other Ecclesiastical Websites
                      </Link>
                    </div>
                  </div>
                </div>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div style={{ height: '150px' }}></div>
    </>
  );
};

export default NavbarComponent;
