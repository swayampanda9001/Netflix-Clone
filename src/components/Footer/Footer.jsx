import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <CiYoutube />
      </div>
      <ul>
        <li>AUDIO DESCRIPTION</li>
        <li>HELP CENTRE</li>
        <li>GIFTS FOR YOU</li>
        <li>MEDIA CENTRE</li>
        <li>INVESTOR REALATION</li>
        <li>JOBS </li>
        <li>TERMS OF USES</li>
        <li>PRIVACY</li>
        <li>LEGAL NOTICE</li>
        <li>COOKIE PREFERENCE</li>
        <li>CORPORATE INFORMATION</li>
        <li>CONTACT US</li>
      </ul>
      <p className="copyright-test">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis saepe
        dolorem distinctio quo temporibus, aliquid assumenda reprehenderit
        architecto sed, facere nostrum, accusamus doloribus eveniet deleniti
        sequi esse. Accusantium, velit sunt.
      </p>
    </div>
  );
};

export default Footer;
