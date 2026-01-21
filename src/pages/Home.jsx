
import './Home.css';
import React, { useEffect, useState } from 'react'; // ✅ add useEffect, useState
import axios from 'axios'; // ✅ import axios
import bannerVideo from '../assets/banner.mp4';
import radioLogo from '../assets/radio-blue.JPG';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bishop from '../assets/bishop.jpg';
import bishop2 from '../assets/bishop2.jpg';

import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow" onClick={onClick}>
    &#10094; Prev
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick}>
    Next &#10095;
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [youtubeKey, setYoutubeKey] = useState(null); // ✅ state for key
  const [homeVideoUrl, setHomeVideoUrl] = useState('');

  const [flashNews, setFlashNews] = useState([]);



  const gallerySliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  useEffect(() => {
    axios.get('http://localhost:5000/api/youtube')
      .then(res => {
        if (res.data && res.data.keyvalue) {
          setYoutubeKey(res.data.keyvalue);
        }
      })
      .catch(err => {
        console.error("Failed to fetch YouTube key:", err);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:5000/api/news/flash-news')
      .then(res => {
        setFlashNews([res.data]); // wrap in array for compatibility
      })
      .catch(err => console.error("❌ Flash news fetch error:", err));
  }, []);


  // Inside Home.jsx
  useEffect(() => {
    axios.get("http://localhost:5000/api/home-video")
      .then(res => {
        console.log("✅ API response:", res.data);
        if (res.data?.video?.url) {
          console.log("✅ Video URL received:", res.data.video.url);
          setHomeVideoUrl(res.data.video.url);
        } else {
          console.warn("⚠️ No video found in response.");
        }
      })
      .catch(err => {
        console.error("❌ Failed to fetch home video:", err);
      });
  }, []);

  return (
    <div className="home-container">
      {/* Banner */}
      <div className="home-header">
       <video className="banner-video" src={bannerVideo} autoPlay loop muted playsInline />


      </div>

      {/* News Ticker */}
      <div className="news-ticker-wrapper">
        <div className="news-ticker">
          <div className="news-label">Flash</div>
          <div className="news-marquee">
            <marquee scrollamount="8">
              {flashNews.length > 0 ? (
                flashNews.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      cursor: 'pointer',
                      marginRight: '2rem',
                      color: 'rgba(237, 246, 250, 1)',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                    onClick={() => navigate(`/news/${item._id}`)}
                  >
                    📢 <strong>{item.title}</strong>



                    {item.file && (
                      <a
                        href={`http://localhost:5000/uploads/${item.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '13px',
                          color: '#f8f4f4ff',
                          textDecoration: 'underline',
                        }}
                        onClick={(e) => e.stopPropagation()} // prevents nav on PDF click
                      >
                        📄 PDF
                      </a>
                    )}
                  </span>
                ))
              ) : (
                '📢 No flash news available at the moment.'
              )}
            </marquee>
          </div>
        </div>
      </div>


      <div className="yellow-line"></div>

      {/* Buttons */}
      <div className="link-section">
        <div className="link-grid">
          <button onClick={() => navigate('/downloads/websites')} className="link-btn">ARCHDIOCESAN <strong>WEBSITES</strong></button>
          <button onClick={() => navigate('/downloads/bulletins')} className="link-btn">ARCHDIOCESAN <strong>BULLETIN</strong></button>
          <button onClick={() => navigate('/liturgical-calendar')} className="link-btn">LITURGICAL <strong>CALENDAR</strong></button>
          <button onClick={() => navigate('/downloads/others')} className="link-btn">OTHER ECCLESIASTICAL <strong>WEBSITES</strong></button>
          <button onClick={() => navigate('/circulars')} className="link-btn"><strong>CIRCULARS</strong></button>
          <button
            onClick={() => window.open('https://www.familytly.com/mpcregistration', '_blank')}
            className="link-btn"
          >
            MPC <strong>REGISTRATIONS</strong>
          </button>

        </div>
      </div>

      <div className="yellow-line"></div>

      {/* Archbishop Slider */}
      <div className="bishop-slider">
        <Slider
          dots={true}
          infinite={true}
          autoplay={true}
          speed={500}
          autoplaySpeed={700}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={true}
        >
          <div onClick={() => navigate('/archbishop/mar-joseph-pamplany')} className="slide-img-container">
            <img src={bishop} alt="Archbishop 1" className="slide-img" />
          </div>
          <div onClick={() => navigate('/archbishop/mar-joseph-pamplany')} className="slide-img-container">
            <img src={bishop2} alt="Archbishop 2" className="slide-img" />
          </div>
        </Slider>
      </div>

      {/* Radio + YouTube */}
      <div className="media-section">
        <div className="radio-section">
          <img src={radioLogo} alt="Radio Logo" className="radio-logo" />
          <div className="audio-box">
            <div className="audio-info">
              <img src="https://cdn-icons-png.flaticon.com/128/3303/3303893.png" alt="audio-icon" className="audio-icon" />
              <span className="audio-title"><strong>EPHPHATHA</strong> RADIO</span>
            </div>
            <audio controls>
              <source src="https://your-audio-stream-link.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
        <div className="youtube-section">
          {youtubeKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Loading YouTube video...</p>
          )}

        </div>
      </div>

      {/* Gallery Carousel */}
      <div className="gallery-slider">
        <Slider {...gallerySliderSettings}>
          {[img1, img2, img3, img4, img5].map((img, index) => (
            <div key={index} className="gallery-slide" onClick={() => navigate('/downloads/photos')}>
              <img src={img} alt={`Gallery ${index + 1}`} className="gallery-img" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
