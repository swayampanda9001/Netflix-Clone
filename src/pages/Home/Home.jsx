import React, { useEffect, useRef } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { FaPlay } from "react-icons/fa";
import { LuBadgeInfo } from "react-icons/lu";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`Home page rendered ${renderCount.current} times`);
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="Home">
      <Navbar />
      <div className="top-image">
        <div className="tiger">
          <img
            src="/the-protector.webp"
            alt="Hero Background"
          />
        </div>
        <div className="hero-section-content">
          <div className="protector">
            <h1>THE PROTECTOR</h1>
            <p className="lorem">
              An ordinary man becomes an extraordinary protector when ancient secrets
              and modern dangers collide. Experience the ultimate battle between good and evil
              in this thrilling adventure that will keep you on the edge of your seat.
            </p>
            <div className="buttons">
              <Link to={`/player/${1234}`} className="play btn">
                <FaPlay /> Play
              </Link>
              <div className="info btn">
                <LuBadgeInfo /> More Info
              </div>
            </div>
          </div>

          <div className="titlecards">
            <TitleCards key="popular" title="Popular on Netflix" />
          </div>
        </div>
      </div>

      <div className="more-cards">
        <div className="more-titlecards">
          <TitleCards key="top_rated" title={"Blockbuster Movies"} category={"top_rated"} />
        </div>
        <div className="more-titlecards">
          <TitleCards key="popular_netflix" title={"Only on Netflix"} category={"popular"} />
        </div>
        <div className="more-titlecards">
          <TitleCards key="upcoming" title={"Upcoming"} category={"upcoming"} />
        </div>
        <div className="more-titlecards">
          <TitleCards key="now_playing" title={"Top Picks for You"} category={"now_playing"} />
        </div>
      </div>

      <Footer />
    </div>
  );
};



export default React.memo(Home);
