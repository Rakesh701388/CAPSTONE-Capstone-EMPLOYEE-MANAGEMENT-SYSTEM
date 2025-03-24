// // src/components/Layout/Navbar.js
// import React from "react";
// import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { FaUser, FaSignOutAlt } from "react-icons/fa";
// import authService from "../../services/authService";
// import "../../styles/layout.css";

// const AppNavbar = () => {
//   const navigate = useNavigate();
//   const user = authService.getCurrentUser();

//   const handleLogout = () => {
//     authService.logout();
//     navigate("/login");
//   };

//   return (
//     <Navbar bg="primary" variant="dark" expand="lg" className="app-navbar">
//       <Container fluid>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Dropdown align="end">
//               <Dropdown.Toggle
//                 variant="transparent"
//                 id="dropdown-user"
//                 className="nav-dropdown-toggle"
//               >
//                 <FaUser className="me-2" />
//                 {user?.username}
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item as={Link} to="/profile">
//                   <FaUser className="me-2" /> My Profile
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item onClick={handleLogout}>
//                   <FaSignOutAlt className="me-2" /> Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default AppNavbar;

import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import authService from '../../services/authService';
import '../../styles/layout.css';

const AppNavbar = () => {
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    // This will clear auth data and redirect to login page
    authService.logout();
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="app-navbar">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle variant="transparent" id="dropdown-user" className="nav-dropdown-toggle">
                <FaUser className="me-2" />
                {user?.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  <FaUser className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;