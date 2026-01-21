import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [newsArchive, setNewsArchive] = useState([]);

  useEffect(() => {
    // Fetch current news item
    const fetchNewsItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };

    // Fetch archive list
    const fetchArchive = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news`);
        const sortedNews = res.data.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
        setNewsArchive(sortedNews.slice(0, 10)); // Limit to 10 recent
      } catch (err) {
        console.error('Failed to fetch archive:', err);
      }
    };

    fetchNewsItem();
    fetchArchive();
  }, [id]);

  const getDateParts = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: 'short' };
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('en-US', options),
      year: date.getFullYear(),
    };
  };

  if (!news) return <p>Loading...</p>;
  const { day, month, year } = getDateParts(news.publishedDate || new Date());

  return (
    <Container fluid className="py-4 px-md-4 px-3">
      <Row>
        {/* Left Side News Archive - Hidden on small screens */}
        <Col md={3} className="d-none d-md-block">
          <div className="archive-header">
            News Archive
          </div>

          {newsArchive.map((item) => {
            const { day, month, year } = getDateParts(item.publishedDate);
            return (
              <div key={item._id} className="archive-item">
                <div className="archive-date-box">
                  <div className="archive-day">{day}</div>
                  <div className="archive-month">{month} {year}</div>
                </div>
                <div className="archive-content">
                  <Link to={`/news/${item._id}`} className="archive-link">
                    {item.title.length > 50 ? item.title.slice(0, 47) + '...' : item.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </Col>

        {/* Right Side - Selected News */}
        <Col md={9} xs={12}>
          <div className="news-header-container">
            <div className="news-date-box">
              <div className="news-day">{day}</div>
              <div className="news-month">
                {month} {year}
              </div>
            </div>

            <div className="news-title-container">
              <h5 className="news-title">{news.title}</h5>
              <p className="news-date-mobile">
                <i className="bi bi-calendar3"></i> {day} {month}, {year}
              </p>
            </div>
          </div>

          {news.type === 'Image' && (
            <div className="news-image-container">
              {news.image && (
                <img
                  src={`http://localhost:5000/uploads/${news.image}`}
                  alt="news"
                  className="news-image"
                />
              )}
              <div className="news-description">
                <p>{news.description}</p>
              </div>
            </div>
          )}

          {news.type === 'PDF' && news.file && (
            <div className="pdf-container">
              <a
                href={`http://localhost:5000/uploads/${news.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
              >
                View PDF
              </a>
            </div>
          )}

          {news.type === 'Flash' && (
            <p className="flash-description">
              {news.description}
            </p>
          )}

          <div className="back-button-container">
            <Link to="/downloads/news" className="back-button">
              ← Back to News
            </Link>
          </div>
        </Col>
      </Row>

      {/* Mobile Archive - Only visible on small screens */}
      <Row className="d-md-none mt-4">
        <Col xs={12}>
          <div className="archive-header">
            News Archive
          </div>
          <div className="mobile-archive-container">
            {newsArchive.map((item) => {
              const { day, month, year } = getDateParts(item.publishedDate);
              return (
                <div key={item._id} className="archive-item">
                  <div className="archive-date-box">
                    <div className="archive-day">{day}</div>
                    <div className="archive-month">{month} {year}</div>
                  </div>
                  <div className="archive-content">
                    <Link to={`/news/${item._id}`} className="archive-link">
                      {item.title.length > 50 ? item.title.slice(0, 47) + '...' : item.title}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .archive-header {
          font-weight: bold;
          font-size: 1.2rem;
          color: #b10000;
          margin-bottom: 1rem;
        }
        
        .archive-item {
          display: flex;
          margin-bottom: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .archive-date-box {
          background-color: #dc3545;
          color: #fff;
          width: 50px;
          text-align: center;
          padding: 4px 0;
        }
        
        .archive-day {
          font-weight: bold;
          font-size: 18px;
        }
        
        .archive-month {
          font-size: 11px;
        }
        
        .archive-content {
          padding: 4px 6px;
          flex: 1;
        }
        
        .archive-link {
          font-size: 13px;
          color: #b10000;
          font-weight: 500;
          text-decoration: none;
        }
        
        .archive-link:hover {
          text-decoration: underline;
        }
        
        .news-header-container {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        
        .news-date-box {
          width: 65px;
          text-align: center;
          background: #e9ecef;
          padding: 0.5rem 0.2rem;
          margin-right: 1rem;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 70px;
          flex-shrink: 0;
        }
        
        .news-day {
          font-weight: bold;
          font-size: 20px;
          color: rgba(236, 35, 35, 1);
        }
        
        .news-month {
          font-size: 12px;
          color: #dc3545;
        }
        
        .news-title {
          font-weight: bold;
          color: #dc3545;
          margin-bottom: 0.5rem;
        }
        
        .news-date-mobile {
          font-size: 14px;
          color: #666;
          margin-bottom: 0;
        }
        
        .news-image-container {
          display: flex;
          gap: 20px;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        
        .news-image {
          width: 100%;
          max-width: 350px;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
          margin: 0 auto;
        }
        
        .news-description p {
          font-size: 16px;
          color: #444;
          text-align: justify;
          margin-bottom: 0;
        }
        
        .pdf-container {
          margin-bottom: 1rem;
        }
        
        .pdf-link {
          font-size: 16px;
          color: #007bff;
          text-decoration: underline;
        }
        
        .flash-description {
          font-size: 16px;
          color: #444;
          text-align: justify;
          margin-bottom: 1rem;
        }
        
        .back-button-container {
          margin-top: 1.5rem;
        }
        
        .back-button {
          color: #dc3545;
          border-color: #dc3545;
          font-size: 0.875rem;
          padding: 0.25rem 0.5rem;
        }
        
        .back-button:hover {
          background-color: #dc3545;
          color: white;
        }
        
        .mobile-archive-container {
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 10px;
        }
        
        @media (min-width: 768px) {
          .news-image-container {
            flex-direction: row;
          }
          
          .news-image {
            margin: 0;
          }
        }
        
        @media (max-width: 576px) {
          .news-header-container {
            flex-direction: column;
          }
          
          .news-date-box {
            margin-right: 0;
            margin-bottom: 1rem;
          }
          
          .news-title-container {
            width: 100%;
          }
        }
      `}</style>
    </Container>
  );
};

export default NewsDetail;