import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import vianneyImg from '../assets/viyanidhi.jpg';
import bishopImg from '../assets/bishopimg.jpg';
import './Home1.css';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const images = [
  { src: image1, alt: '' },
  { src: image2, alt: '' },
  { src: image3, alt: '' },
  { src: image4, alt: '' },
];

const gradientButtonStyle = {
  background: 'linear-gradient(to right, #0666a3, #4ecdc4)',
  border: 'none',
  fontWeight: 'bold',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
  }
};

function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      className="home-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Banner Section */}
      <motion.div
        className="banner-section text-center py-4"
        style={{ backgroundColor: '#f8f9fa' }}
        variants={itemVariants}
      >
        <Container className="d-flex justify-content-center align-items-center flex-wrap gap-3">
          <motion.img
            src={vianneyImg}
            alt="Vianney"
            className="img-fluid"
            style={{ maxHeight: '300px' }}
            whileHover={{ scale: 1.02 }}
          />

     
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <div className="d-flex justify-content-center flex-wrap gap-2">
                <Button
                  className="text-white px-4 py-2"
                  style={{
                    background: 'linear-gradient(to right, #0666a3, #0a6963ff)',
                    border: 'none',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    borderRadius: '9px',
                    minWidth: '150px'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  as={motion.button}
                >
                  PAY NOW
                </Button>
                
                {!isMobile && (
                  <Button
                    className="text-white px-4 py-2"
                    style={{
                      background: 'linear-gradient(to right, #0666a3, #4ecdc4)',
                      border: 'none',
                      fontWeight: '600',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      borderRadius: '9px'
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    as={motion.button}
                  >
                    നിങ്ങളുടെ കഴിവിനനുസരിച്ച് നിങ്ങൾക്ക് സഹായിക്കാം
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>

      {/* Sticky Mobile Button */}
      <motion.div
        className={`sticky-pay-button ${isSticky ? 'visible' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isSticky ? 1 : 0,
          y: isSticky ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          className="text-white px-4 py-2"
          style={{
            background: 'linear-gradient(to right, #7e06a3ff, #f50909ff)',
            border: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            borderRadius: '9px',
            minWidth: '50px'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          as={motion.button}
        >
          PAY NOW
        </Button>
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)"
            }}
            whileTap={{
              scale: 0.97
            }}
            style={{
              margin: 0,
              borderRadius: '0 8px 8px 0',
              overflow: 'hidden',
              position: 'relative',
              width: 'fit-content'
            }}
          >
            <Button
              className="text-white px-3 py-2"
              style={{
                background: 'linear-gradient(45deg, #4776f8ff 0%, #dc2626 100%)',
                border: 'none',
                fontWeight: '600',
                fontSize: '0.85rem',
                letterSpacing: '0.3px',
                position: 'relative',
                zIndex: 1,
                borderRadius: '0 8px 8px 0',
                minWidth: 'auto',
                textShadow: '0 1px 1px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap'
              }}
              as={motion.button}
            >
              <motion.span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  zIndex: -1
                }}
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              നിങ്ങളുടെ കഴിവിനനുസരിച്ച് നിങ്ങൾക്ക് സഹായിക്കാം
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Bishop Message Section */}
      <Container className="my-5 py-md-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="fw-bold mb-3" style={{ color: '#0666a3' }}>മെത്രാപ്പോലീത്തയുടെ സന്ദേശം</h2>
          <div className="mx-auto" style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #0666a3, #4ecdc4)',
            borderRadius: '2px'
          }}></div>
        </motion.div>

        <Row className="gx-4">
          {/* Left - Image Card */}
          <Col lg={3} md={12} className="mb-4">
            <motion.div
              variants={itemVariants}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
            >
              <Card className="h-100 shadow-sm border-0 overflow-hidden" style={{ borderRadius: '15px' }}>
                <Card.Img
                  variant="top"
                  src={bishopImg}
                  alt="Bishop"
                  style={{
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(1.05) contrast(1.05)'
                  }}
                />
                <div className="position-absolute bottom-0 w-100 text-center p-3" style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  color: 'white'
                }}>
                  <h5 className="mb-0">+ മാർ ജോസഫ് പാമ്പ്ലാനി</h5>
                  <small>തലശ്ശേരി അതിരൂപത</small>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Center - Message Card */}
          <Col lg={6} md={12} className="mb-4">
            <motion.div
              variants={scaleUp}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
            >
              <Card className="h-100 shadow-sm border-0" style={{
                borderRadius: '15px',
                background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
              }}>
                <Card.Body style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  textAlign: 'justify',
                  padding: '30px'
                }}>
                  <div className="bishop-message-container">
                    <h6 className="bishop-heading mb-4" style={{
                      color: '#d32f2f',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      lineHeight: '1.4'
                    }}>
                      ഈശോയിൻ പ്രിയമുള്ളവരെ,
                    </h6>

                    <p className="mb-4" style={{
                      fontSize: '15px',
                      lineHeight: '1.8',
                      textAlign: 'justify',
                      textIndent: '1.5em'
                    }}>
                      നമ്മുടെ അതിരൂപത പ്ലാറ്റിനം ജൂബിലിയിലേക്ക് പ്രവേശിക്കുകയാണല്ലോ. ഇതോടനുബന്ധിച്ച്, വിശ്രമജീവിതത്തിലേക്കു പ്രവേശിച്ച വൈദികരുടെ ക്ഷേമത്തിനും വൈദിക വിദ്യാർത്ഥികളുടെ പരിശീലനത്തിനു മായി ഒരു സഹായനിധി രൂപീകരിക്കാൻ ീകരിക്കാൻ അതിരൂപത ആഗ്രഹിക്കുന്നു. വിയാനിനിധി എന്ന പേരിൽ ഏർപ്പെടുത്തുന്ന ഈ സഹായനിധിയുമായി നിങ്ങളിൽ കുറച്ചുപേർ ക്കെങ്കിലും സഹകരിക്കാൻ കഴിയും. സമ്പത്തിനേക്കാളും സഭയോടുള്ള സ്നേഹമാണ് ഇതിലൂടെ നാം പ്രകടമാക്കുന്നത്. ജീവിതകാലം മുഴുവൻ നമുക്കായി അധ്വാനിക്കുന്ന വൈദികരുടെ ക്ഷേമം ഉറപ്പുവരുത്തുന്നത് തങ്ങളുടെ കടമയായി കരുതി സഹകരിക്കുന്ന പാരമ്പര്യമാണ് നമ്മുടെ സഭയ്ക്ക് ഉണ്ടായിരുന്നത്.
                    </p>

                    <p className="mb-0" style={{
                      fontSize: '15px',
                      lineHeight: '1.8',
                      textAlign: 'justify',
                      textIndent: '1.5em'
                    }}>
                      പ്രതിവർഷം നിശ്ചിത തുക സംഭാവന നല്‌കാൻ സന്നദ്ധരാകുന്നവരാണ് വിയാനിനിധിയുടെ സഹകാരികളാകുന്നത്. സ്വന്തം കുടുംബത്തിൽനിന്ന് ഒരു വൈദികനെ സഭയ്ക്കു സമ്മാനിക്കുന്നതിനു സമാനമായി ഈ ഒരു സംരംഭത്തെ നമ്മുക്കു മനസ്സിലാക്കാവുന്നതാണ്. സ്വദേശത്തും വിദേശത്തുമുള്ള നമ്മുടെ അതിരൂപതാംഗങ്ങൾക്ക് ഈ സംരംഭത്തോട് സഹകരിക്കാവുന്നതാണ്. നിങ്ങളുടെ സന്മനസ്സിനെ നിത്യപുരോഹിതനായ ഈശോ അനുഗ്രഹിക്കട്ടെ.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Right - Gradient Message Card */}
          <Col lg={3} md={12} className="mb-4">
            <motion.div
              variants={itemVariants}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true, margin: "100px" }}
            >
              <Card
                className="h-100 text-center shadow-sm border-0"
                style={{
                  background: 'linear-gradient(135deg, #0666a3 0%, #4ecdc4 100%)',
                  borderRadius: '15px',
                  padding: '25px',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#ffffff',
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="mb-4" style={{
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      എങ്ങനെയാണു എനിക്ക് സഹായിക്കാനാവുന്നത്?
                    </h6>
                    <ul className="text-start ps-3 mb-4" style={{ listStyleType: 'none' }}>
                      <li className="mb-3 d-flex align-items-start">
                        <span className="me-2" style={{ fontSize: '1.2rem' }}>•</span>
                        നിങ്ങൾ ഒരു വ്യക്തിക്കോ കുടുംബത്തിനോ ഇതിൻ്റെ സഹകാരികളാകാം
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <span className="me-2" style={{ fontSize: '1.2rem' }}>•</span>
                        കുടുംബത്തിലെ സഹോദരങ്ങളുടെയോ ബന്ധുക്കളുടെയേയോ പങ്കാളിത്തത്തോടെ
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <span className="me-2" style={{ fontSize: '1.2rem' }}>•</span>
                        ഇടവകയിലെ ഭക്തസംഘടനകൾക്ക് നിശ്ചിത തുക നൽകി
                      </li>
                      <li className="d-flex align-items-start">
                        <span className="me-2" style={{ fontSize: '1.2rem' }}>•</span>
                        ഇടവകകൾക്ക് നിശ്ചിത തുക നൽകി  സഹായിക്കൂ
                      </li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Info Boxes Section */}
      <motion.section
        className="py-5 my-5"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="fw-bold mb-3" style={{ color: '#0666a3' }}>തലശ്ശേരി അതിരൂപതയുടെ വിവരങ്ങൾ</h2>
            <div className="mx-auto" style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #0666a3, #4ecdc4)',
              borderRadius: '2px'
            }}></div>
          </motion.div>

          <Row className="g-4">
            <Col md={6}>
              <motion.div
                className="h-100"
                variants={scaleUp}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true }}
              >
                <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                  <Card.Body className="p-4 d-flex align-items-center">
                    <div className="me-4">
                      <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'rgba(6, 102, 163, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src="https://img.icons8.com/ios-filled/100/0666a3/priest.png"
                          alt="priest"
                          style={{ width: 50, height: 50 }}
                        />
                      </div>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-3" style={{ color: '#0666a3' }}>വൈദിക വിദ്യാർത്ഥികൾ</h5>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2 d-flex align-items-center">
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#d32f2f',
                            borderRadius: '50%',
                            marginRight: '10px'
                          }}></div>
                          <span>രൂപതാ സെമിനാരി <strong className="ms-2" style={{ fontSize: '1.1rem' }}>367</strong></span>
                        </li>
                        <li className="mb-2 d-flex align-items-center">
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#4ecdc4',
                            borderRadius: '50%',
                            marginRight: '10px'
                          }}></div>
                          <span>വിശ്വാസത്തിലേക്ക് സമർപ്പിതർ <strong className="ms-2" style={{ fontSize: '1.1rem' }}>44</strong></span>
                        </li>
                        <li className="mb-2 d-flex align-items-center">
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#0666a3',
                            borderRadius: '50%',
                            marginRight: '10px'
                          }}></div>
                          <span>ജൂനിയർ സിമിനാരി വിദ്യാർത്ഥികൾ <strong className="ms-2" style={{ fontSize: '1.1rem' }}>117</strong></span>
                        </li>
                        <li className="d-flex align-items-center">
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#ff9800',
                            borderRadius: '50%',
                            marginRight: '10px'
                          }}></div>
                          <span>മൈനർ സിമിനാരി വിദ്യാർത്ഥികൾ <strong className="ms-2" style={{ fontSize: '1.1rem' }}>75</strong></span>
                        </li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="h-100 d-flex flex-column gap-4"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-sm h-100" style={{
                    borderRadius: '15px',
                    borderLeft: '5px solid #d32f2f'
                  }}>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="mb-1 fw-semibold text-dark" style={{ fontSize: '14px' }}>
                            ഒരു വൈദിക വിദ്യാർത്ഥിയെ ഒരുവർഷം  സ്‌പോൺസർ ചെലവ്
                          </p>
                          <h5 className="fw-bold text-danger mb-0">₹50,000</h5>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-sm h-100" style={{
                    borderRadius: '15px',
                    borderLeft: '5px solid #4ecdc4'
                  }}>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="mb-1 fw-semibold text-dark" style={{ fontSize: '14px' }}>
                            വിശ്വാസത്തിലേക്ക് സമർപ്പിതനായ ഒരു വൈദികനു മൊത്തം സ്‌പോൺസർ ചെലവ്
                          </p>
                          <h5 className="fw-bold text-success mb-0">₹5,00,000</h5>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Photo Gallery Placeholder */}
      <motion.section
        className="py-5 my-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="fw-bold mb-3" style={{ color: '#0666a3' }}>ഞങ്ങളുടെ ഗ്യാലറി</h2>
            <div className="mx-auto" style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #0666a3, #4ecdc4)',
              borderRadius: '2px'
            }}></div>
          </motion.div>

          <Row className="g-4">
            {images.map((img, index) => (
              <Col lg={3} md={6} xs={12} key={index}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  variants={fadeIn}
                  className="h-100"
                >
                  <Card className="h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card.Img
                        variant="top"
                        src={img.src}
                        alt={img.alt}
                        style={{
                          height: '220px',
                          objectFit: 'cover',
                          filter: 'brightness(0.95)'
                        }}
                      />
                    </motion.div>
                    <Card.Body className="text-center py-3">
                      <small className="text-muted">{img.alt}</small>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>
    </motion.div>
  );
}

export default Home;