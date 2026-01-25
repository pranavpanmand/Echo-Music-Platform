import React, { useState } from 'react';
import { Navbar, Container, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import logo from './logo.jpeg';

const CustomNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search functionality here
  };

  return (
    <Navbar expand="lg" className="navbar-light bg-light m-2 mt-4" 
      style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.8)",  // Subtle white background
        backgroundSize: "cover",
        borderRadius: "10px",
        height: "auto",
        minHeight: "75px",
        padding: "0.5rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"  // Light shadow to pop out
      }}>
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex align-items-center me-3">
          <img 
            src={logo} 
            alt="Logo" 
            width="55" 
            height="55" 
            className="d-inline-block align-top" 
            style={{ borderRadius: "50%", minWidth: "55px" }}
          />
          <span className="d-inline-block align-center ms-2" style={{ 
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontStyle: "italic",
            fontWeight: "bold", 
            color: "#333",  // Dark text for contrast
            backdropFilter: "blur(2px)",
            whiteSpace: "nowrap"
          }}>
            ECHOMIX
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        
        <Navbar.Collapse id="navbar-content" className="justify-content-between">
          <Form onSubmit={handleSearch} className="d-flex my-2 my-lg-0" style={{ flex: 1, maxWidth: "500px", margin: "0 auto" }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search songs..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "2px solid #ddd",  // Lighter border color
                  borderRadius: "5px",
                  height: "40px",
                  padding: "0.5rem"
                }}
              />
              <Button 
                variant="light" 
                type="submit"
                style={{
                  border: "2px solid #ddd",  // Match the border color
                  borderRadius: "5px",
                  height: "40px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f8f9fa"  // Lighter button color
                }}
              >
                <FaSearch color="#333" /> {/* Icon color dark to contrast with light background */}
              </Button>
            </InputGroup>
          </Form>

          <Navbar.Text className="ms-lg-3">
            <a href="#profile">
              <img 
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1908571217.1697457883&semt=ais_hybrid" 
                alt="Profile" 
                style={{ 
                  height: "clamp(40px, 8vw, 55px)",
                  width: "clamp(40px, 8vw, 55px)",
                  borderRadius: "50%",
                  border: "2px solid #ddd",  // Light border to match
                }}
              />
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
