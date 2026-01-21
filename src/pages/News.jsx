import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import SideNavDownloads from '../components/SideNavDownloads';
import axios from 'axios';
import { Link } from 'react-router-dom';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        setNewsItems(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getDateParts = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: 'short' };
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('en-US', options),
      year: date.getFullYear(),
    };
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNewsItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="py-4 px-3">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .news-item {
            transition: all 0.3s ease;
          }
          .news-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          .pagination-item {
            transition: all 0.2s ease;
          }
          .pagination-item:hover:not(.active) {
            transform: scale(1.1);
            background-color: #f8f9fa;
          }
        `}
      </style>

      <Row>
        {/* Sidebar */}
        <Col md={3} sm={12} className="mb-4" style={{ paddingLeft: 0 }}>
          <SideNavDownloads />
        </Col>

        {/* Main Content */}
        <Col md={9} sm={12}>
          <h4 
            className="fw-bold text-danger mb-4" 
            style={{ 
              animation: 'slideIn 0.5s ease-out',
              borderBottom: '2px solid #dc3545',
              paddingBottom: '8px',
              display: 'inline-block'
            }}
          >
            NEWS
          </h4>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {currentNewsItems.map((item, index) => {
                const { day, month, year } = getDateParts(item.publishedDate);
                const type = item.type?.toLowerCase();
                const animationDelay = `${index * 0.1}s`;

                return (
                  <div
                    key={item._id || index}
                    className="news-item"
                    style={{
                      background: '#fff',
                      marginBottom: '1.5rem',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      padding: '1.2rem',
                      animation: `fadeIn 0.5s ease-out ${animationDelay} both`,
                      opacity: 0
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      {/* Date box */}
                      <div
                        style={{
                          width: '70px',
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                          padding: '0.6rem 0.3rem',
                          marginRight: '1.2rem',
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '75px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div
                          className="fw-bold"
                          style={{ 
                            fontSize: '22px', 
                            color: '#dc3545', 
                            lineHeight: '1.1',
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          {day}
                        </div>
                        <div style={{ 
                          fontSize: '13px', 
                          color: '#495057',
                          fontWeight: '500',
                          textTransform: 'uppercase'
                        }}>
                          {month} {year}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div style={{ flex: 1 }}>
                        <h6 
                          className="fw-bold" 
                          style={{ 
                            color: '#212529', 
                            marginBottom: '0.5rem',
                            fontSize: '1.05rem'
                          }}
                        >
                          {item.title}
                        </h6>

                        <div 
                          style={{ 
                            fontSize: '13px', 
                            color: '#6c757d',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }} 
                        >
                          <span>📅</span>
                          <span>{day} {month}, {year}</span>
                        </div>

                        {/* PDF */}
                        {type === 'pdf' && item.file && (
                          <a
                            href={`http://localhost:5000/uploads/${item.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                              fontSize: '14px', 
                              color: '#0d6efd',
                              textDecoration: 'none',
                              fontWeight: '500',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.2s ease'
                            }}
                            className="hover-underline"
                          >
                            <span>View PDF</span>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                          </a>
                        )}

                        {/* IMAGE */}
                        {type === 'image' && item.image && (
                          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.5rem' }}>
                            <img
                              src={`http://localhost:5000/uploads/${item.image}`}
                              alt="news"
                              style={{
                                width: '180px',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '6px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              {item.description && (
                                <div style={{ position: 'relative' }}>
                                  <p
                                    style={{
                                      fontSize: '14px',
                                      color: '#495057',
                                      lineHeight: '1.5',
                                      marginBottom: '0.5rem'
                                    }}
                                  >
                                    {item.description.length > 160
                                      ? item.description.slice(0, 160) + '...'
                                      : item.description}
                                  </p>
                                  {item.description.length > 160 && (
                                    <Link
                                      to={`/news/${item._id}`}
                                      style={{ 
                                        color: '#0d6efd',
                                        fontWeight: '500',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'all 0.2s ease'
                                      }}
                                      className="hover-underline"
                                    >
                                      Read More
                                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                      </svg>
                                    </Link>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* FLASH */}
                        {type === 'flash' && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem',
                              marginTop: '0.5rem',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '14px',
                                color: '#495057',
                                lineHeight: '1.5'
                              }}
                            >
                              {item.description}
                            </span>

                            {item.file && (
                              <a
                                href={`http://localhost:5000/uploads/${item.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: '14px',
                                  color: '#dc3545',
                                  fontWeight: '500',
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.2s ease'
                                }}
                                className="hover-underline"
                              >
                                <span>Download PDF</span>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                  <Pagination.First 
                    onClick={() => handlePageChange(1)} 
                    disabled={currentPage === 1}
                    className="pagination-item"
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-item"
                  />
                  {[...Array(totalPages).keys()].map((num) => {
                    const page = num + 1;
                    return (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                        className="pagination-item"
                        style={{
                          margin: '0 3px',
                          borderRadius: '6px',
                          minWidth: '40px',
                          textAlign: 'center'
                        }}
                      >
                        {page}
                      </Pagination.Item>
                    );
                  })}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-item"
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="pagination-item"
                  />
                </Pagination>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default News;