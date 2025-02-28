import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { FaPlay } from "react-icons/fa";
import { LuBadgeInfo } from "react-icons/lu";
import TitleCards from "../../components/Titlecards/Titlecards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="Home">
      <Navbar />

      <div className="top-image">
        {/* movie image  */}
        <div className="tiger">
          <img
            src="https://interestingengineering.com/_next/image?url=https%3A%2F%2Fimages.interestingengineering.com%2Fimg%2Fiea%2FZKwJqkME6M%2Fturkishinnovation-netflix.jpg&w=1200&q=75"
            alt=""
          />
        </div>
        {/* movie title  */}
        <div className="protector">
          <h1>THE PROTECTOR</h1>
          <p className="lorem">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. At
            recusandae libero aliquid ex et tenetur suscipit quo ipsa expedita
            fugiat.
            <div className="buttons">
              <div className="play btn">
                {" "}
                <FaPlay /> Play
              </div>
              <div className="info btn">
                <LuBadgeInfo /> More Info
              </div>
            </div>
          </p>
        </div>
        {/* cards  */}
        <div className="titlecards">
          {/* <h2>Popular on Netflix</h2> */}
          <TitleCards />
        </div>
      </div>

      <div className="more-cards">
        <div className="more-titlecards">
          <TitleCards title={"Blocbuster Movies"} category={"top_rated"}/>
        </div>
        <div className="more-titlecards">
          <TitleCards title={"only on netflix"} category={"popular"} />
        </div>
        <div className="more-titlecards">
          <TitleCards title={"upcomming"} category={"upcoming"} />
        </div>
        <div className="more-titlecards">
          <TitleCards title={"top picks for you"} category={"now_playing"} />
        </div>
      </div>

      <Footer />

      
    </div>
  );
};



export default Home;
