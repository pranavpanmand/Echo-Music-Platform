import React from "react";
import "./ContactUsPage.css";
import Lottie from "lottie-react";
import contactAnimation from "../../assets/animations/contact-animation.json";
import emailIcon from './email.jpg';
import phoneIcon from './phone.jpg';
import clockIcon from './clock.jpg';
import mapIcon from './map.jpg';

const ContactUsPage = () => {
  return (
    <div className="contact-page">
      {/* Top Animation */}
      <div className="animation-wrapper">
        <Lottie animationData={contactAnimation} loop={true} />
      </div>

      {/* Contact Section */}
      <div className="contact-container">
        <div className="contact-box">
          {/* Left - Contact Form */}
          <div className="form-section">
            <h2>Contact Us</h2>
            <p>
              Feel free to contact us any time. We will get back to you as soon
              as we can!
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted!");
              }}
            >
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Please enter your name" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Please enter your email" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Your message" rows={5} required />

              <button type="submit">Submit</button>
            </form>
          </div>

          {/* Right - Info */}
          <div className="info-section">
            <h2>Info</h2>
            <div className="info-item">
              <img src={emailIcon} alt="email" />
              <span>echomixsupport@gmail.com</span>
            </div>
            <div className="info-item">
              <img src={phoneIcon} alt="phone" />
              <span>+24 56 72 289</span>
            </div>
            <div className="info-item">
              <img src={clockIcon} alt="clock" />
              <span>9:00 - 18:00</span>
            </div>
            <div className="info-item">
              <img src={mapIcon} alt="map" />
              <span>B 63, Bhd Gokhale Market, Tis Hazari Court, Delhi, India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
