import React from 'react';
import './AboutUs.css';

const TeamMemberCard = ({ name, rollNo, branch, image, linkedin }) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} className="team-image" />
      <div className="card-details">
        <h3>{name}</h3>
        <p>{rollNo}</p>
        <p>{branch}</p>
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
            Connect
          </a>
        )}
      </div>
    </div>
  );
};

const AboutUs = () => {
  const teamMembers = [
    { name: 'Abhinav Neema', rollNo: 'LCB2024042', branch: 'CSB', image: '/aboutus/abhinav.jpg', linkedin: 'https://www.linkedin.com/in/abhinav-neema-95a69931a' },
    { name: 'Gourav Kumar', rollNo: 'LCB2024046', branch: 'CSB', image: '/aboutus/gourav.jpg', linkedin: 'https://www.linkedin.com/in/gourav-kumar-65739a329' },
    { name: 'Prasoon Patel', rollNo: 'LCI2024051', branch: 'CSAI', image: '/aboutus/prasoon.jpg', linkedin: 'https://www.linkedin.com/in/prasoon-patel-580907327' },
    { name: 'Vennela Varshini', rollNo: 'LCB2024021', branch: 'CSB', image: '/aboutus/vvpic.png', linkedin: 'https://www.linkedin.com/in/vennela-varshini-anasoori-457765320' },
    { name: 'Parth Khunt', rollNo: 'LCB2024023', branch: 'CSB', image: '/aboutus/parth.jpg', linkedin: 'https://www.linkedin.com/in/parth-khunt-0069b6325' },
    { name: 'Sindhuja', rollNo: 'LCI2024013', branch: 'CSAI', image: '/aboutus/sindhu.jpg', linkedin: 'https://www.linkedin.com/in/sindhuja-pagadala-a5a290325' },
    { name: 'Pranav Panmand', rollNo: 'LCI2024025', branch: 'CSAI', image: '/aboutus/pranav.jpg', linkedin: 'https://www.linkedin.com/in/pranav-panmand-914b33333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Hansika Reddy', rollNo: 'LCI2024019', branch: 'CSAI', image: '/aboutus/hansika.jpeg', linkedin: 'https://www.linkedin.com/in/hansika-reddy-a32361325' },
    { name: 'Akash Thakur', rollNo: 'LCB2024037', branch: 'CSB', image: '/aboutus/akash.jpg', linkedin: 'https://www.linkedin.com/in/akash-thakur-96948532b' },
    { name: 'Hasini', rollNo: 'LCI2024018', branch: 'CSAI', image: '/aboutus/hasini.jpg', linkedin: 'https://www.linkedin.com/in/hasini-raja-a571a4325' },
  ];

  return (
    <>
      <header className="profile-header">
        <div className="header-title">EchoMix</div>
      </header>
    <div className="aboutus-container">
      <div className="aboutus-header">
        <h1>About Us</h1>
        <p className="subheading">One stop destination for all your music needs</p>
        <p className="description">
          Meet our team of <span className="highlight">Creators, Designers, and Problem Solvers</span>
        </p>
      </div>

      <div className="team-scroll-wrapper">
        <div className="team-scroll">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
          {}
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={`copy-${index}`} {...member} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
